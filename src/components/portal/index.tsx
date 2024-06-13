import { Portal } from "solid-js/web"
import { checkContrast } from "~/lib/contrast"
import type { WebtoneItem } from "~/state/webtone"
import { isContrastAcceptable } from "~/lib/contrast"
import { addColorLS, hasColor, rmColorLS } from "~/lib/ls"
import { getWebtone } from "~/state/webtone"

import "./styles.css"
import { onMount, onCleanup } from "solid-js"

type PortalProps = {
    active: () => WebtoneItem
    setPortal: (value: boolean) => void
}

const PortalComponent = (props: PortalProps) => {
    const [fgb, fgw, bgb, bgw] = isContrastAcceptable(props.active().rgbString)

    const Content = () => {
        return (
            <div class="ml-16">
                <p class="">{props.active().hex} </p>
                <p class="">{props.active().rgbString}</p>
                <p class="">{props.active().oklch}</p>
                <p class="">{props.active().cmyk}</p>
                <p class="">{props.active().hsl}</p>
                <p class="">lum: {props.active().lum}</p>
            </div>
        )
    }

    onMount(() => {
        const bg = document.getElementById("root")
        bg.style.filter = "blur(1.5px) grayscale(90%)"
    })

    onCleanup(() => {
        const bg = document.getElementById("root")
        bg.style.filter = "none"
    })

    return (
        <Portal>
            <section
                class="
                    fixed left-[50%] top-[50%] z-50 flex h-full w-full -translate-x-1/2 -translate-y-1/2 transform 
                    flex-col items-center justify-center 
                     bg-neutral-900 px-6 lg:h-3/5 
                    lg:min-h-[600px] lg:w-3/5 lg:min-w-[900px]"
                id="portal"
            >
                <button
                    class="absolute bottom-6 right-6 z-20 h-6 w-16 border border-neutral-500 text-sm uppercase shadow outline-none hover:scale-[1.03]"
                    onClick={() => {
                        props.setPortal(false)
                    }}
                >
                    <span class="z-30 select-none px-2 py-1 text-xs uppercase tracking-wide text-neutral-200 opacity-100">
                        Close
                    </span>
                </button>

                <button
                    class="absolute bottom-6 right-24 z-20 h-6 border border-neutral-500 text-sm uppercase shadow w-16 outline-none hover:scale-[1.03]"
                    onClick={(e) => {
                        const t = e.target.closest("button")
                        t.classList.add("button-add")
                        t.addEventListener("animationend", () => {
                            t.classList.remove("button-add")
                        })

                        if(!hasColor(props.active().code))
                            addColorLS(getWebtone(props.active().code))
                        else 
                            rmColorLS(props.active().code)
                    }}
                >
                    <span class="z-30 select-none px-1 py-1 text-xs uppercase tracking-wide text-neutral-200 opacity-100">
                        {hasColor(props.active().code) ? "Remove" : "Add"}
                    </span>
                </button>

                <div class="flex items-center justify-center  border-neutral-700">
                    <div class="flex h-72 w-72 flex-col">
                        <div
                            class="flex w-full flex-1 flex-col items-center justify-center p-1 text-neutral-900 lg:p-2"
                            style={{
                                "background-color": props.active().rgbString,
                                color: checkContrast(props.active().hex),
                            }}
                        >
                            <div
                                class="text-center text-sm lg:hidden"
                                style={{
                                    color: checkContrast(props.active().hex),
                                }}
                            >
                                <Content />
                            </div>
                        </div>
                        <div class="flex h-1/4 w-full flex-col justify-center bg-white px-6 py-3 text-neutral-900">
                            <p class="text-base tracking-wide">WEBTONE</p>
                            <p class="">{props.active().code}</p>
                        </div>
                    </div>
                    <div class="hidden text-xl text-neutral-500 lg:block w-[370px]">
                        <Content />
                    </div>
                </div>
                <div class="mt-20 flex w-3/4 flex-wrap items-center justify-center gap-4">
                    <div
                        class="flex h-12 w-24 items-center justify-center"
                        style={{
                            "background-color": props.active().rgbString,
                            color: "black",
                        }}
                    >
                        Text
                        <input class="portal-checkbox" type="checkbox" checked={fgb} />
                    </div>
                    <div
                        class="flex h-12 w-24 items-center justify-center"
                        style={{
                            "background-color": props.active().rgbString,
                            color: "white",
                        }}
                    >
                        Text
                        <input class="portal-checkbox" type="checkbox" checked={fgw} />
                    </div>

                    <div
                        class="flex h-12 w-24 items-center justify-center"
                        style={{
                            "background-color": "black",
                            color: props.active().rgbString,
                        }}
                    >
                        Text
                        <input class="portal-checkbox" type="checkbox" checked={bgb} />
                    </div>
                    <div
                        class="flex h-12 w-24 items-center justify-center"
                        style={{
                            "background-color": "white",
                            color: props.active().rgbString,
                        }}
                    >
                        Text
                        <input class="portal-checkbox" type="checkbox" checked={bgw} />
                    </div>
                </div>
            </section>
        </Portal>
    )
}

export default PortalComponent
