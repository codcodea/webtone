import { createSignal, Index, createEffect } from "solid-js"
import setPattern from "~/components/pattern/setpattern"
import { clones } from "~/lib/ls"
import { WebtoneChip, Contrast } from "~/components/portal"
import { SelectSVGPattern } from "~/state/patterns"
import webtone from "../../assets/webtone.png"

const PDF = () => {
    const [localPatternEl, setLocalPatternEl] = createSignal<SVGPatternElement>(null)
    const [localPatternEl2, setLocalPatternEl2] = createSignal<SVGPatternElement>(null)
    const [localPatternEl3, setLocalPatternEl3] = createSignal<SVGPatternElement>(null)

    createEffect(() => {
        setPattern(localPatternEl(), clones())
        setPattern(localPatternEl2(), clones())
        setPattern(localPatternEl3(), clones())
    })

    return (
        <main class="container mx-auto p-12 font-serif">
            <div
                id="printPDF"
                style={{
                    "font-family": "Times New Roman, Times, serif",
                }}
            >
                <section class="relative h-[297mm] w-[210mm]">
                    <SelectSVGPattern setPatternEl={setLocalPatternEl} isAbsolute={true} />
                    <article class="absolute left-[70%] top-[75%] h-36 w-3/5 -translate-x-1/2 -translate-y-1/2 transform bg-white p-12 opacity-95">
                        <img src={webtone} alt="webtone" class="w-36 object-contain" />
                    </article>
                </section>
                <section class="grid h-[297mm] w-[210mm] grid-cols-12 border border-neutral-800">
                    <article class="col-span-2">
                        <SelectSVGPattern setPatternEl={setLocalPatternEl2} isAbsolute={false} />
                    </article>

                    <article
                        class="col-span-10 px-16 py-12"
                        style={{
                            "background-color": "white",
                        }}
                    >
                        <img src={webtone} alt="webtone" class="w-28 object-contain" />
                        <p class="mt-4 text-sm">
                            WEBTONE is a digital-first color system designed to provide a cohesive visual language
                            across digital displays, websites, graphic design, and print. Discover more at webtone.org.
                        </p>
                        <article class="mt-12 flex flex-col gap-4">
                            <Index each={clones()}>{(clone) => <WebtoneChip active={clone} isSmall={true} />}</Index>
                        </article>
                    </article>
                </section>
                <section class="grid h-[297mm] w-[210mm] grid-cols-12 border border-neutral-800">
                    <article class="col-span-2">
                        <SelectSVGPattern setPatternEl={setLocalPatternEl3} isAbsolute={false} />
                    </article>

                    <article
                        class="col-span-10 px-16 py-12"
                        style={{
                            "background-color": "white",
                        }}
                    >
                        <img src={webtone} alt="webtone" class="w-28 object-contain" />
                        <p class="mt-4 text-sm">
                            WEBTONE ACCESS ensures selected colors meet WCAG accessibility standards by testing them
                            against pure black and white for a 7:1 contrast ratio. A checkmark indicates compliance.
                            Learn more at webtone.org.
                        </p>
                        <article class="mt-12 flex flex-col gap-4">
                            <Index each={clones()}>
                                {(clone) => (
                                    <article class="">
                                        <p class="text-sm font-bold">{clone().code}</p>
                                        <p class="mb-2 text-xs text-neutral-600">{clone().hex}</p>
                                        <Contrast active={clone} isSmall={true} />
                                    </article>
                                )}
                            </Index>
                        </article>
                    </article>
                </section>
            </div>
        </main>
    )
}

export default PDF
