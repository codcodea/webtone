import { For, createSignal, Show, createEffect, onMount } from "solid-js"
import { getColorsState, handleClearAll } from "../lib/ls"

import Oswald from "~/components/oswald"
import WebtoneChip from "~/components/chip"
import PortalComponent from "~/components/portal"

import { chips } from "~/state/webtone"
import type { WebtoneItem } from "~/state/webtone"
import { activeDotIndex, setActiveDotIndex } from "~/state/spectra"

import { handleKeys, handleSelect } from "./handlers"
import { session } from "~/lib/session"

import { tooltips } from "~/state/tooltips"

const Spectra = () => {
    let portal: HTMLDivElement

    const [active, setActive] = createSignal<WebtoneItem>(null)
    const [isPortal, setPortal] = createSignal(false)

    const handleClick = handleSelect(setActive, setPortal)
    const { addKeys, removeKeys } = handleKeys(setPortal, active, setActive)

    onMount(() => {
        initWheel()
        session.addPage("ps")
    })

    createEffect(() => {
        isPortal() ? addKeys() : removeKeys()

        if (activeDotIndex() || getColorsState()) {
            handleCssClearDots()
            handleCssActiveDots(activeDotIndex())
        }

        isPortal() && session.addAction("po")
    })

    const initWheel = () => {
        const colors = getColorsState()
            .map((c) => c.index)
            .sort((a, b) => a - b)

        const firstNonNeutral = colors.filter((c) => c > 40)

        if (firstNonNeutral.length) {
            setActiveDotIndex(firstNonNeutral[0])
        } else {
            setActiveDotIndex(0)
        }
    }

    const handleOswaldClick = (e: MouseEvent) => {
        const t = e.target as HTMLElement
        handleCssClearDots()
        t.classList.add("active")
        const i = Number(t.getAttribute("data-index"))
        setActiveDotIndex(i)
        session.addAction("os" + i)
    }

    const handleTrash = () => {
        handleClearAll()
        handleCssAnimation()
        session.addAction("cl")
    }

    const handleCssAnimation = () => {
        const dots = document.querySelectorAll(".dot")
        const currentIndex = activeDotIndex()

        const dotsArray = Array.from(dots)
        const rearrangedDots = [...dotsArray.slice(currentIndex + 1), ...dotsArray.slice(0, currentIndex + 1)]

        rearrangedDots.forEach((dot, index) => {
            setTimeout(() => {
                dot.classList.add("effect")
                dot.classList.remove("has-selected")
            }, 7 * index)

            setTimeout(
                () => {
                    dot.classList.remove("effect")
                },
                7 * index + 70
            )
        })
    }

    const handleCssActiveDots = (i: number) => {
        const dots = document.querySelectorAll(".dot")
        dots[i].classList.add("active")

        getColorsState().forEach((color) => {
            const j = Number(color.index)
            if (j != i) {
                dots[j]?.classList.add("has-selected")
            } else {
                dots[j]?.classList.remove("has-selected")
            }
        })
    }

    const handleCssClearDots = () => {
        const dots = document.querySelectorAll(".dot")
        dots.forEach((dot) => {
            dot.classList.remove("active")
        })
    }

    return (
        <>
            <main class="container mx-auto mb-28 min-h-screen max-w-7xl">
                <section class="mt-28 flex flex-col items-center justify-center">
                    <Oswald handleOswaldClick={handleOswaldClick} />
                    <div class="mt-10 flex items-center justify-center ">
                        <button
                            class="border border-neutral-700 px-3 py-1 text-xs uppercase hover:shadow"
                            onClick={handleTrash}
                        >
                            Clear
                        </button>
                    </div>
                </section>
                <Show when={tooltips()}>
                    <section class="mt-20 flex flex-col items-center justify-center">
                        <article class="w-3/5 bg-neutral-100 px-10 py-6 text-neutral-800 shadow-md">
                            <p class="my-2 text-base">The Spectra is used to filter and select colors.</p>
                            <ul class="list-inside list-disc">
                                <li class="">
                                    <strong>Filter Hue:</strong> Select a dot on the wheel to filter by hue-family.
                                </li>
                                <li class="">
                                    <strong>View Details:</strong> Click on a color to view conversion and contrast metrics.
                                </li>
                                <li class="">
                                    <strong>Refine Selection:</strong> Use arrow keys in the details view to refine your
                                    choice.
                                </li>
                                <li class="">
                                    <strong>Save Color:</strong> Click the checkbox or ADD-button to save a color to the
                                    canvas.
                                </li>
                                <li class="">
                                    <strong>Reset Canvas:</strong> Click CLEAR to reset the Canvas.
                                </li>
                            </ul>
                        </article>
                    </section>
                </Show>

                <section class="mt-12 flex w-full flex-col items-center justify-center">
                    <section class="w-11/12" data-palette={activeDotIndex()}>
                        <h1 class="mb-6 mt-12 text-center text-2xl text-neutral-800">
                            {chips()[activeDotIndex()].name}
                        </h1>
                        <article
                            onClick={handleClick}
                            class="my-2 flex flex-row flex-wrap items-center justify-center gap-x-1"
                        >
                            <For each={chips()[activeDotIndex()].arr}>
                                {(chip, i) => <WebtoneChip chip={chip} index={i()} hasSelect={true} />}
                            </For>
                        </article>
                    </section>
                </section>

                <section class="mt-12 flex w-full flex-col items-center justify-center">
                    <section class="w-11/12" data-palette={40}>
                        <h1 class="mb-6 mt-12 text-center text-2xl text-neutral-800">{chips()[40].name}</h1>
                        <article
                            onClick={handleClick}
                            class="my-2 flex flex-row flex-wrap items-center justify-center gap-x-1"
                        >
                            <For each={chips()[40].arr}>
                                {(chip, i) => <WebtoneChip chip={chip} index={i()} hasSelect={true} />}
                            </For>
                        </article>
                    </section>
                </section>

                <Show when={isPortal()}>
                    <PortalComponent ref={portal} active={active} setPortal={setPortal} />
                </Show>
            </main>
            <footer class="h-96 w-full bg-white"></footer>
        </>
    )
}

export default Spectra
