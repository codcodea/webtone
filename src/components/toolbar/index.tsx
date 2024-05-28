import { A } from "@solidjs/router"
import { testBrowerCompability, isMobile } from "../../handlers/device"
import { Show } from "solid-js"
import { getColorsState } from "~/lib/ls"

const Toolbar = () => {
    return (
        <div class="z-50 flex h-full w-full items-center justify-center gap-6  text-neutral-800">
            <div class="relative w-24 text-base">
                <A href="/">WEBTONE</A>
                <div class="absolute -left-4 -top-[4px] h-8 w-2 overflow-hidden">
                    {/* <span class="absolute top-1 h-3 w-3 bg-[#ff7830] " />
                            <span class="absolute top-4 h-3 w-3 bg-[#1f1f1f] " /> */}
                    <span class="absolute top-1 h-[24px] w-3 bg-[#222222]" />
                </div>
            </div>

            <div class="flex flex-1 items-center justify-center gap-6 text-sm uppercase tracking-wide">
                <A href="/">Home</A>
                <A href="/spectra">Spectra</A>
                <Show when={testBrowerCompability() && !isMobile()}>
                    <A href="/picker">Picker</A>
                </Show>
                <div class="relative">
                    <A href="/canvas">Canvas</A>
                    <Show when={getColorsState()?.length > 0}>
                        <span class="absolute -right-[23px] top-[3px] flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#151515ee] text-[10px] font-bold text-white opacity-80">
                            {getColorsState().length}
                        </span>
                    </Show>
                </div>
            </div>
            <div class="w-24">
                <button class="border border-neutral-500 px-3 py-1 text-xs uppercase tracking-wider text-neutral-800 hover:shadow">
                    <A href="/downloads">Assets</A>
                </button>
            </div>
        </div>
    )
}

export default Toolbar
