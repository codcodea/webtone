import { A } from "@solidjs/router"
import { testBrowerCompability, isMobile } from "../../handlers/device"
import { Show } from "solid-js"
import { getColorsState } from "~/lib/ls"

import { tooltips, setTooltips } from "~/state/tooltips"


import Logotype from "../common/logotype"

const Toolbar = () => {
    return (
        <div class="z-50 flex h-full w-full items-center  text-neutral-800">
            <Logotype/>

            <div class="flex flex-1 items-center justify-center gap-6 text-sm uppercase tracking-wide">
                <A href="/">Home</A>
                <A href="/faq">FAQ</A>
                {/* <A href="/pdf">PDF</A> */}
                <A href="/spectra">Spectra</A>
                <Show when={testBrowerCompability() && !isMobile()}>
                    <A href="/picker">Picker</A>
                </Show>
                <div class="">
                    <A href="/inspiration">Inspiration</A>
                </div>
                <div class="relative">
                    <A href="/canvas">Canvas</A>
                    <Show when={getColorsState()?.length > 0}>
                        <span class="absolute -right-[23px] top-[3px] flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#151515ee] text-[10px] font-bold text-white opacity-80">
                            {getColorsState().length}
                        </span>
                    </Show>
                </div>
            </div>
            <div class="">
                <button class="border border-neutral-500 px-3 py-1 text-xs uppercase tracking-wider text-neutral-800 hover:shadow">
                    <A href="/downloads">Assets</A>
                </button>
            </div>
            <div class="">
                <button
                    class="ml-2 border border-neutral-500 px-3 py-1 text-xs uppercase tracking-wider text-neutral-800 hover:shadow"
                    onClick={() => setTooltips(!tooltips())}
                >
                    Tooltips <span>{tooltips() ? "ON" : "OFF"}</span>
                </button>
            </div>
        </div>
    )
}

export default Toolbar
