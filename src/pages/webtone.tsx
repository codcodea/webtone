import webtone from "../assets/webtones.json"
import { For, createSignal, onMount, Show, createEffect } from "solid-js"
import { Portal } from "solid-js/web"

import { addColorLS, rmColorLS, isSelectedState } from "../lib/ls"

import Welcome from "../components/welcome"

type Webtone = {
    name: string
    arr: {
        code: string
        rgbString: string
        hex: string
        oklch: string
        hsl: string
    }[]
}[]

const Webtone = () => {
    let portal: HTMLDivElement
    const [chips, setChips] = createSignal<Webtone>(webtone)
    const [active, setActive] = createSignal<Webtone>(null)
    const [isPortal, setPortal] = createSignal(false)

    onMount(async () => {
        //console.log(chips())
        
    })

    createEffect(() => {
        isPortal() ? handleBlur() : handleNormal()
    })

    const handleBlur = () => {
        const root = document.getElementById("root")
        root.style.filter = "blur(3px) brightness(1) grayscale(1)"
    }

    const handleNormal = () => {
        const root = document.getElementById("root")
        root.style.filter = "none"
    }

    const handleClick = (e) => {

        const isCheckbox = e.target.tagName === "INPUT"
        const isChecked = e.target.checked

        // Find chip
        const grid = e.target.closest("section[data-palette]")
        const palette = grid.getAttribute("data-palette")

        const chip = e.target.closest("div[data-webtone]")
        const code = chip.getAttribute("data-webtone")

        const obj = chips()[palette].arr.find((chip) => chip.code == code)
   
        // Portal
        setActive(obj)
        !isCheckbox && setPortal(true)

        // Local Storage
        if (isChecked) {
            addColorLS({ name : obj.code, color: obj.rgbString })
        } else {
            rmColorLS({ name : obj.code, color: obj.rgbString })
            // TODO: remove clone from canvas

        }
    }
    return (
        <main class="container mx-auto mb-28 min-h-screen max-w-7xl">
            <Welcome />
            <section onClick={handleClick} class="mt-16 flex w-full flex-col items-center justify-center">
                <For each={webtone}>
                    {(hue, index) => {
                        return (
                            <section class="block w-11/12" data-palette={Math.floor(index())}>
                                <h1 class="mt-6 text-left text-2xl">WEBTONE - {hue.name}</h1>
                                <article class="my-2 flex flex-row flex-wrap items-center gap-x-1">
                                    <For each={hue.arr}>
                                        {(chip, i) => <WebtoneChip code={chip.code} rgb={chip.rgbString} i={index} isChecked={chip.isChecked}/>}
                                    </For>
                                </article>
                            </section>
                        )
                    }}
                </For>
            </section>

            <Show when={isPortal()}>
                <Portal>
                    <section
                        ref={portal}
                        class="fixed left-[50%] top-[50%] z-50 flex h-3/5 w-3/5 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center border border-neutral-500 bg-neutral-800 px-6 shadow-lg"
                    >
                        <button
                            class="absolute bottom-6 right-6 z-20 h-6 w-16 border-neutral-200 text-sm uppercase shadow"
                            style={{ "background-color": "rgba(0,0,0,0.5)" }}
                            onClick={() => {
                                setPortal(false)
                            }}
                        >
                            <span class="z-30 select-none text-xs uppercase tracking-wide text-white opacity-100">
                                Close
                            </span>
                        </button>

                        <button
                            class="absolute bottom-6 right-24 z-20 h-6 w-16 border-neutral-200 text-sm uppercase shadow"
                            style={{ "background-color": "rgba(0,0,0,0.5)" }}
                            onClick={(e) => {
                                e.target.closest("button").classList.add("opacity-0", "transition-opacity", "duration-200")   
                                addColorLS({ name : active().code, color: active().rgbString })
                            }}
                        >
                            <span class="z-30 select-none text-xs uppercase tracking-wide text-white opacity-100">
                                Add
                            </span>
                        </button>

                        <div class={"flex items-center justify-center"}>
                            <div class="flex h-72 w-72 flex-col border border-neutral-500 shadow-lg">
                                <div
                                    class="flex w-full flex-1  flex-col items-center justify-center p-2 text-neutral-900"
                                    style={{ "background-color": active().rgbString, color: checkContrast(active().hex)}}
                                >
                                    <p class="text-sm">{active().hex} </p>
                                    <p class="text-sm">{active().rgbString}</p>
                                    <p class="text-sm">{active().oklch}</p>
                                </div>
                                <div class="flex h-1/4 w-full flex-col justify-center bg-white px-6 py-3 text-neutral-900">
                                    <p class="">WEBTONE</p>
                                    <p class="">{active().code}</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </Portal>
            </Show>
        </main>
    )
}

export default Webtone

type WebtoneChipProps = {
    code: string
    rgb: string
    isChecked: boolean
    i: () => number
}

const WebtoneChip = (props: WebtoneChipProps) => {
    return (
        <div
            class={
                "relative chip mt-2 flex h-28 w-28 flex-col border transition-shadow duration-150 hover:outline hover:border hover:shadow-lg"
            }
            data-webtone={props.code}
        >
            <div
                class={"w-full flex-1"}
                style={{
                    "background-color": props.rgb,
                }}
            ></div>
            <div class="flex h-1/3 flex-col items-start justify-center bg-white p-1">
                <p class="text-[10px]">WEBTONE</p>
                <p class="text-[10px]">{props.code}</p>
            </div>
            <input type="checkbox" class="absolute bottom-1 right-1 h-4 w-4 border-neutral-200 text-sm uppercase" checked={isSelectedState().has(props.code)}>
                <span class="z-30 select-none text-xs uppercase tracking-wide text-white opacity-100">+</span>
            </input>
        </div>
    )
}

const checkContrast = (color: string) => {
    const hex = color.replace("#", "")
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)
    const yiq = (r * 299 + g * 587 + b * 114) / 1000
    return yiq >= 128 ? "black" : "white"
}
