import { A } from "@solidjs/router"
import { testBrowerCompability, isMobile } from "../../handlers/device"
import { Show } from "solid-js"
import { getColorsState } from "~/lib/ls"

const Toolbar = () => {
    return (
        <div class="z-50 flex h-full w-full items-center justify-center gap-6  text-neutral-800">
            <div class="w-24 text-base">WEBTONE</div>

            <div class="flex flex-1 items-center justify-center gap-6 text-base tracking-wide">
                <A href="/">Home</A>
                <A href="/spectra">Spectra</A>
                <Show when={testBrowerCompability() && !isMobile()}>
                    <A href="/picker">Picker</A>
                </Show>
                <div class="relative">
                    <A href="/canvas">Canvas</A>
                    <Show when={getColorsState()?.length > 0}>
                        <span class="absolute -right-[25px] top-[2px] flex h-5 w-5 items-center justify-center rounded-full border border-neutral-500 bg-neutral-300 text-[10px] font-bold opacity-80">
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
