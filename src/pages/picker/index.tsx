import { Show, createSignal, onCleanup, onMount, createEffect, Setter, lazy, Switch, Match } from "solid-js"
import { Portal } from "solid-js/web"

import PortalComponent from "~/components/portal"

//import { clearNotify, handleColor, initNotify, initTitleChrome } from "../../handlers"

import { cn } from "../../lib/merge"

import { handleColor } from "~/handlers/color"
import type { WebtoneItem } from "~/state/webtone"
import { addColorLS } from "~/lib/ls"

// --------------------------------------------------------

const api = "https://vildawebben.dev/cc/colors/"

const Chrome = () => {
    const [webtone, setWebtone] = createSignal<WebtoneItem>(null)
    const [color, setColor] = createSignal<string>("#e8e4da")
    const [isPortal, setPortal] = createSignal(false)

    let portal: HTMLDivElement
    let pickerEl: HTMLButtonElement
    let resultEl: HTMLDivElement
    let hiddenEl: HTMLInputElement
    let notifyEl: HTMLSpanElement

    const abortController = new AbortController()

    onMount(() => {
        initHtmx()
        hiddenEl.value = color()
        pickerEl.addEventListener("click", handleColorPicker)
    })

    onCleanup(() => {
        pickerEl.removeEventListener("click", handleColorPicker)
        cleanupHtmx()
    })

    createEffect(() => {
        isPortal() ? handleKeys() : removeKeys()
    })

    const { initHtmx, cleanupHtmx } = newHtmx()
    const { handleKeys, removeKeys } = newKeys(setPortal, portal)

    const handleColorPicker = async (e: Event) => {
        resultEl.style.opacity = "0.4"
        try {
            const eD = new EyeDropper()
            const result = await eD.open({ signal: abortController.signal })
            const color = result.sRGBHex
            hiddenEl.value = color
            setColor(color)
            window.htmx.trigger("#hidden-input", "send-color")
        } catch (e) {
            resultEl.style.opacity = "1"
        }
    }

    const handleClick = (e: MouseEvent) => {
        const t = e.target as HTMLElement
        const icon = t.closest(".add-icon")

        if (!icon) return

        icon.classList.add("animate")
        setTimeout(() => {
            icon.classList.remove("animate")
        }, 210)

        const color = icon.parentElement.dataset.color
        const name = icon.parentElement.dataset.name
        const isWebtone = Boolean(icon.parentElement.dataset.webtone)

        if (isWebtone) {
            addColorLS({ name, color, index: -1 })
        } else {
            addColorLS({ name, color, index: undefined })
        }
        return
    }

    return (
        <>
            <main class="container relative mx-auto flex min-h-[2200px] max-w-5xl flex-col items-center justify-start">
                <nav class={cn("mt-28 flex w-full justify-center")}>
                    <button
                        id="start-button"
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

                {/* <!-- Hidden input to handle color picker forwards to htmx--> */}
                <input
                    id="hidden-input"
                    ref={hiddenEl}
                    hx-get={api}
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

            //window.htmx.trigger("#hidden-input", "send-color")
        }

        const cleanupHtmx = () => {
            window.htmx.config.withCredentials = false
            removeEventListener("htmx:beforeRequest", beforeRequest)
            removeEventListener("htmx:configRequest", configRequest)
            removeEventListener("htmx:afterSwap", afterSwap)
        }

        const configRequest = (evt: CustomEvent) => {
            const c = evt.detail.parameters.colors
            const noHash = c.substring(1)

            if (api.includes("localhost")) {
                evt.detail.path = api + noHash
                return
            }
            evt.detail.path += noHash
        }

        const beforeRequest = (evt: CustomEvent) => {
            evt.detail.xhr.setRequestHeader("Authorization", import.meta.env.VITE_API_KEY)
        }

        const afterSwap = (evt: CustomEvent) => {
            resultEl.style.opacity = "1"

            setTimeout(() => {
                //setJsonData(window.jsonData)
            }, 100)

            
            handleColor(color(), true)
        }

        return { initHtmx, cleanupHtmx }
    }
}

export default Chrome

function newKeys(setIsPortal: Setter<boolean>, portal: HTMLDivElement) {
    const handleKeys = () => {
        addEventListener("keydown", handleEscKey)
        document.getElementById("root").style.filter = "blur(5px)"
        setTimeout(() => {
            addEventListener("click", handleClickOutside)
        }, 0)
    }

    const removeKeys = () => {
        removeEventListener("keydown", handleEscKey)
        removeEventListener("click", handleClickOutside)
        document.getElementById("root").style.filter = "none"
    }

    const handleEscKey = (e: KeyboardEvent) => {
        if (e.key === "Escape" || e.key === "Enter" || e.key === "Backspace") {
            setIsPortal(false)
        }
    }

    const handleClickOutside = (e: MouseEvent) => {
        if (e.target !== portal) {
            setIsPortal(false)
        }
    }
    return { handleKeys, removeKeys }
}
