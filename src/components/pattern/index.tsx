import { Setter, createEffect } from "solid-js"

import { onMount, onCleanup } from "solid-js"
import { Portal } from "solid-js/web"
import { clones } from "~/lib/ls"

import setPattern from "./setpattern"
import { patternsAll, setPatternsAll, patternNo, setPatternNo, patternEl, setPatternEl } from "~/state/patterns"
import { validSVGIndex } from "~/state/patterns"
import { SelectSVGPattern } from "~/state/patterns"

type PatternPortalProps = {
    setPortal: Setter<boolean>
    setExport: Setter<boolean>
}

const PatternPortal = (props: PatternPortalProps) => {
    onMount(() => {
        const bg = document.getElementById("root")
        bg.style.filter = "blur(1.5px) grayscale(90%)"
        setPattern(patternEl(), clones())
        console.log(clones())
    })

    onCleanup(() => {
        const bg = document.getElementById("root")
        bg.style.filter = "none"
    })

    createEffect(() => {
        setPatternsAll(validSVGIndex(clones().length))
    })

    return (
        <Portal>
            <section
                class="
                    fixed left-[50%] top-[50%] z-50 flex h-full w-full flex-1 -translate-x-1/2 -translate-y-1/2 
                    transform flex-col items-center justify-center
                     bg-neutral-900 lg:h-3/5 
                    lg:min-h-[700px] lg:w-3/5 lg:min-w-[900px]"
                id="patternPortal"
            >
                <div class="canvas h-full w-full p-12">
                    <SelectSVGPattern setPatternEl={setPatternEl} />
                </div>

                <button
                    class="absolute bottom-4 right-52 z-20 h-6 w-16 border border-neutral-500 text-sm uppercase shadow outline-none hover:scale-[1.03]"
                    onClick={() => {
                        props.setExport(true)
                    }}
                >
                    <span class="z-30 select-none px-2 py-1 text-xs uppercase tracking-wide text-neutral-200 opacity-100">
                        Export
                    </span>
                </button>

                <button
                    class="absolute bottom-4 right-12 z-20 h-6 w-16 border border-neutral-500 text-sm uppercase shadow outline-none hover:scale-[1.03]"
                    onClick={() => {
                        props.setPortal(false)
                    }}
                >
                    <span class="z-30 select-none px-2 py-1 text-xs uppercase tracking-wide text-neutral-200 opacity-100">
                        Close
                    </span>
                </button>
                <button
                    class="absolute bottom-4 right-32 z-20 h-6 w-16 border border-neutral-500 text-sm uppercase shadow outline-none hover:scale-[1.03]"
                    onClick={() => {
                        const current = patternNo()
                        const nextIndex = patternsAll().findIndex((p) => p === current) + 1
                        const next = patternsAll()[nextIndex] || patternsAll()[0]
                        setPatternNo(next)
                        setPattern(patternEl(), clones())
                    }}
                >
                    <span class="z-30 select-none px-2 py-1 text-xs uppercase tracking-wide text-neutral-200 opacity-100">
                        Next
                    </span>
                </button>
            </section>
        </Portal>
    )
}

export default PatternPortal


