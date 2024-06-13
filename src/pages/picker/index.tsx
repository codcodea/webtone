import { Show, createEffect, createSignal, onCleanup, onMount } from "solid-js"

import PortalComponent from "~/components/portal"
import { handleKeys } from "../handlers"

import { cn } from "../../lib/merge"

import { handleColor } from "~/handlers/color"
import { addColorLS } from "~/lib/ls"
import { env } from "~/lib/api"
import { WebtoneItem, getWebtone } from "~/state/webtone"
import { session } from "~/lib/session"

// --------------------------------------------------------

const Chrome = () => {
    const [hex, setHex] = createSignal<string>("#e8e4da")
    const [trainNum, setTrainNum] = createSignal<number>(0)
    const [tripple, setTripple] = createSignal<string>("")
    const [palette, setPalette] = createSignal<number[][]>([
        [0, 0],
        [0, 0],
        [0, 0],
    ])

    const [isPortal, setPortal] = createSignal(false)
    const [active, setActive] = createSignal<WebtoneItem>()
    const portal = createSignal<HTMLDivElement>()

    let pickerEl: HTMLButtonElement
    let resultEl: HTMLDivElement
    let hiddenEl: HTMLInputElement

    let trainEl: HTMLButtonElement
    let paletteEl: HTMLDivElement

    const abortController = new AbortController()

    const { addKeys, removeKeys } = handleKeys(setPortal, active, setActive)

    onMount(() => {
        initHtmx()
        hiddenEl.value = hex()
        pickerEl.addEventListener("click", handleColorPicker)
        // trainEl.addEventListener("click", handleTrainModel)

        addEventListener("keydown", handlePickKeys)
    
    })

    createEffect(() => {
        isPortal() ? addKeys() : removeKeys()
    })

    const handlePickKeys = (e: KeyboardEvent) => {
        if (e.key === "s") {
            const icon = document.querySelector(".add-icon") as HTMLElement
            if (!icon) return
            icon.click()
        } else if (e.key === "d") {
            pickerEl.click()
        }
    }

    onCleanup(() => {
        pickerEl.removeEventListener("click", handleColorPicker)
        cleanupHtmx()
    })

    const { initHtmx, cleanupHtmx } = newHtmx()

    const handleColorPicker = async () => {
        resultEl.style.opacity = "0.4"
        try {
            const picker = new EyeDropper()
            const result = await picker.open({ signal: abortController.signal })
            const color = result.sRGBHex
            hiddenEl.value = color
            setHex(color)
            window.htmx.trigger("#hidden-input", "send-color")
            session.addAction(color)
        } catch (e) {
            resultEl.style.opacity = "1"
        }
    }

    const handleTrainModel = async () => {
        await openColorPicker()
    }

    const openColorPicker = async () => {
        const picker = new EyeDropper()
        console.dir(picker)
        const result = await picker.open()
        const color = result.sRGBHex
        hiddenEl.value = color
        setHex(color)
        window.htmx.trigger("#hidden-input", "send-color")
    }

    const handleClick = (e: MouseEvent) => {
        const t = e.target as HTMLElement
        const icon = t.closest(".add-icon")

        if (!icon) {
            setPortal(true)
            return
        }

        icon.classList.add("animate")
        setTimeout(() => icon.classList.remove("animate"), 210)

        const name = icon.parentElement.dataset.name
        const isWebtone = Boolean(icon.parentElement.dataset.webtone)

        if (isWebtone) {
            addColorLS(getWebtone(name))
        } else {
            //addColorLS({ name, color })
        }
        return
    }

    return (
        <>
            <main class="container relative mx-auto flex min-h-[2200px] max-w-5xl flex-col items-center justify-start">
                <nav class={cn("mt-28 flex w-full justify-center")}>
                    <button
                        id="start-button"
                        title="Press 'd' to open, 's' to save, and escape to close."
                        ref={pickerEl}
                        class={cn(
                            "relative h-12 min-w-44 border border-neutral-500 bg-neutral-800 uppercase transition-transform duration-100 hover:scale-[1.01]"
                        )}
                    >
                        <span id="button-text" class="select-none text-base tracking-wide text-neutral-100">
                            Pick Color
                        </span>
                    </button>
                </nav>

                <Show when={false}>
                    <nav class={cn("mt-28 flex w-full justify-center")}>
                        <button
                            id="start-button"
                            ref={trainEl}
                            class={cn(
                                "relative h-12 min-w-44 border border-neutral-500 bg-neutral-800 uppercase transition-transform duration-100 hover:scale-[1.01]"
                            )}
                        >
                            <span id="button-text" class="select-none text-base tracking-wide text-neutral-100">
                                Train Model
                            </span>
                        </button>
                    </nav>
                </Show>
                {/* <!-- Hidden input to handle color picker forwards to htmx--> */}
                <input
                    id="hidden-input"
                    ref={hiddenEl}
                    hx-get={env.api}
                    hx-trigger="send-color"
                    hx-target="#output"
                    type="hidden"
                    name="colors"
                />

                <section class="mt-12 flex min-h-96 w-full justify-center">
                    <article
                        class="mb-28 mt-12 flex items-center justify-center"
                        id="output"
                        ref={resultEl}
                        onClick={handleClick}
                    >
                        {/* <!-- HTMx container --> */}
                    </article>
                </section>

                <Show when={isPortal()}>
                    <PortalComponent ref={portal} active={active} setPortal={setPortal} />
                </Show>
            </main>
        </>
    )

    function newHtmx() {
        const initHtmx = () => {
            window.htmx.process(document.body)
            window.htmx.config.withCredentials = true
            window.htmx.config.globalViewTransitions = true
            window.htmx.config.methodsThatUseUrlParams = []

            addEventListener("htmx:beforeRequest", beforeRequest)
            addEventListener("htmx:configRequest", configRequest)
            addEventListener("htmx:afterSwap", afterSwap)
            addEventListener("htmx:afterSettle", afterSettle)

            //window.htmx.trigger("#hidden-input", "send-color")
        }

        const cleanupHtmx = () => {
            window.htmx.config.withCredentials = false
            removeEventListener("htmx:beforeRequest", beforeRequest)
            removeEventListener("htmx:configRequest", configRequest)
            removeEventListener("htmx:afterSwap", afterSwap)
            removeEventListener("htmx:afterSettle", afterSettle)
        }

        const configRequest = (evt: CustomEvent) => {
            const c = evt.detail.parameters.colors
            const noHash = c.substring(1)

            if (env.api.includes("localhost")) {
                evt.detail.path = env.api + noHash
                return
            }
            evt.detail.path += noHash
        }

        const beforeRequest = (evt: CustomEvent) => {
            evt.detail.xhr.setRequestHeader("Authorization", import.meta.env.VITE_API_KEY)
        }

        const afterSwap = (evt: CustomEvent) => {
            resultEl.style.opacity = "1"
            handleColor(hex(), true)
        }

        const afterSettle = async (evt: CustomEvent) => {
            const p = window.jsonData.conversions.web

            const h = p.hueClass
            const s = p.shadeClass
            const c = p.chromaClass

            let neutral = null

            if (h === 0 && s === 0 && c === 0) {
                const numberRegex = /\d+/
                const numberMatch = p.code.match(numberRegex)

                if (numberMatch) {
                    const extractedNumber = numberMatch[0] // Assuming there's only one number in the string
                    const appendedNumber = `[-1,${extractedNumber},-1]`
                    neutral = appendedNumber
                } else {
                    //console.log("No number found in the input string.")
                }
            }

            if (trainNum() == 0) {
                setTrainNum((prev) => prev + 1)

                neutral ? setTripple(`[${neutral},`) : setTripple(`[[${p.hueClass},${p.shadeClass},${p.chromaClass}],`)
            } else if (trainNum() == 1) {
                setTrainNum((prev) => prev + 1)
                neutral
                    ? setTripple((prev) => prev + `${neutral},`)
                    : setTripple((prev) => prev + `[${p.hueClass},${p.shadeClass},${p.chromaClass}],`)
            } else {
                neutral
                    ? setTripple((prev) => prev + `${neutral}]`)
                    : setTripple((prev) => prev + `[${p.hueClass},${p.shadeClass},${p.chromaClass}]]`)
                setTrainNum(0)
                //console.log(tripple())
            }
            //setPalette(window.jsonData.palette)
            const webtone = getWebtone(p.code)
            setActive(webtone)
        }

        return { initHtmx, cleanupHtmx }
    }
}

export default Chrome
