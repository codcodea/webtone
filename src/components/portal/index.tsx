import { Portal } from "solid-js/web"
import { checkContrast } from "~/lib/contrast"
import type { WebtoneItem } from "~/state/webtone"

type PortalProps = {
    portal: HTMLDivElement
    active: () => WebtoneItem
    setPortal: (value: boolean) => void
}

const PortalComponent = (props: PortalProps) => {
    return (
        <Portal>
            <section
                ref={props.portal}
                class="fixed left-[50%] top-[50%] z-50 flex h-3/5 w-3/5 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center border border-neutral-500 bg-neutral-800 px-6 shadow-lg"
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

                <div class={"flex items-center justify-center"}>
                    <div class="flex h-72 w-72 flex-col border border-neutral-500 shadow-lg">
                        <div
                            class="flex w-full flex-1  flex-col items-center justify-center p-2 text-neutral-900"
                            style={{
                                "background-color": props.active().rgbString,
                                color: checkContrast(props.active().hex),
                            }}
                        >
                            <p class="text-sm">{props.active().hex} </p>
                            <p class="text-sm">{props.active().rgbString}</p>
                            <p class="text-sm">{props.active().oklch}</p>
                            <p class="text-sm">{props.active().hsl}</p>
                            <p class="text-sm">{props.active().cmyk}</p>
                        </div>
                        <div class="flex h-1/4 w-full flex-col justify-center bg-white px-6 py-3 text-neutral-900">
                            <p class="">WEBTONE</p>
                            <p class="">{props.active().code}</p>
                        </div>
                    </div>
                </div>
            </section>
        </Portal>
    )
}

export default PortalComponent
