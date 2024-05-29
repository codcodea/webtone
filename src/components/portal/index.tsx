import { Portal } from "solid-js/web"
import { checkContrast } from "~/lib/contrast"
import type { WebtoneItem } from "~/state/webtone"

import { isContrastAcceptable } from "~/lib/contrast"

import "./styles.css"

type PortalProps = {
    active: () => WebtoneItem
    setPortal: (value: boolean) => void
}

const PortalComponent = (props: PortalProps) => {
    const [fgb, fgw, bgb, bgw] = isContrastAcceptable(props.active().rgbString)

    return (
        <Portal>
            <section
                class="fixed left-[50%] top-[50%] z-50 flex h-3/5  min-w-[800px] min-h-[600px] w-3/5 -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center border border-neutral-500 bg-neutral-800 px-6 shadow-lg"
                id="portal"
            >
                <button
                    class="absolute bottom-6 right-6 z-20 h-6 w-16 border-neutral-200 text-sm uppercase shadow"
                    style={{ "background-color": "rgba(0,0,0,0.5)" }}
                    onClick={() => {
                        props.setPortal(false)
                    }}
                >
                    <span class="z-30 select-none text-xs uppercase tracking-wide text-white opacity-100">Close</span>
                </button>

                <div class={"flex items-center justify-center gap-12"}>
                    <div class="flex h-72 w-72 flex-col border border-neutral-500 shadow-lg">
                        <div
                            class="flex w-full flex-1  flex-col items-center justify-center p-2 text-neutral-900"
                            style={{
                                "background-color": props.active().rgbString,
                                color: checkContrast(props.active().hex),
                            }}
                        >
                        </div>
                        <div class="flex h-1/4 w-full flex-col justify-center bg-white px-6 py-3 text-neutral-900">
                            <p class="text-base tracking-wide">WEBTONE</p>
                            <p class="">{props.active().code}</p>
                        </div>
                    </div>
                    <div class="text-xl text-neutral-500">
                        <p class="">{props.active().hex} </p>
                        <p class="">{props.active().rgbString}</p>
                        <p class="">{props.active().oklch}</p>
                        <p class="">{props.active().cmyk}</p>
                        <p class="">{props.active().hsl}</p>
                        <p class="">lum: {props.active().lum}</p>
                    </div>
                </div>
                <div class="mt-20 flex items-center justify-center gap-4">
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
                        <input class="portal-checkbox"type="checkbox" checked={bgb} />
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
