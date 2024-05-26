import { For, createSignal, Show, createEffect, onMount } from "solid-js"

import { getColorsState, clearColorsLS, setClones, setColorsState } from "../lib/ls"

import Oswald from "~/components/oswald"
import WebtoneChip from "~/components/chip"
import PortalComponent from "~/components/portal"

import { chips } from "~/state/webtone"
import type { WebtoneItem } from "~/state/webtone"
import { activeDotIndex, setActiveDotIndex } from "~/state/spectra"

import { handleBlur, handleNormal, handleKeys, handleSelect } from "./handlers"

import { session } from "~/lib/session"
import { dot } from "node:test/reporters"

const Spectra = () => {
    let portal: HTMLDivElement

    const [active, setActive] = createSignal<WebtoneItem>(null)
    const [isPortal, setPortal] = createSignal(false)

    const handleClick = handleSelect(setActive, setPortal)

    onMount(() => {
        session.addPage("ps")
    })

    createEffect(() => {
        isPortal() ? (handleBlur(), addKeys()) : (handleNormal(), removeKeys())

        if (activeDotIndex() || getColorsState()) {
            clearDots()
            setActiveDotCSS(activeDotIndex())
        }
    })

    const { addKeys, removeKeys } = handleKeys(setPortal, portal)

    const clearDots = () => {
        const dots = document.querySelectorAll(".dot")
        dots.forEach((dot) => {
            dot.classList.remove("active")
        })
    }

    const setActiveDotCSS = (i: number) => {
        const dots = document.querySelectorAll(".dot")
        dots[i].classList.add("active")

        getColorsState().forEach((color) => {
            if (color.index != i) {
                dots[color.index]?.classList.add("has-selected")
            } else {
                dots[color.index]?.classList.remove("has-selected")
            }
        })
    }

    const handleOswaldClick = (e: MouseEvent) => {
        const t = e.target as HTMLElement
        clearDots()
        t.classList.add("active")
        const i = Number(t.getAttribute("data-index"))
        setActiveDotIndex(i)
    }

    const handleTrash = () => {
        clearColorsLS()
        setColorsState([])
        setClones([])

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

    return (
        <>
            <main class="container mx-auto mb-28 min-h-screen max-w-7xl">
                <section class="mt-28 flex flex-col items-center justify-center">
                    <Oswald handleOswaldClick={handleOswaldClick} />
                    <div class="mt-10 flex items-center justify-center ">
                        <button class="border border-neutral-700 uppercase hover:shadow px-3 py-1 text-xs" onClick={handleTrash}>
                            Clear
                        </button>
                    </div>
                </section>

                <section class="mt-12 flex w-full flex-col items-center justify-center">
                    <section class="w-11/12" data-palette={activeDotIndex()}>
                        <h1 class="mb-6 mt-12 text-center text-2xl text-neutral-800">{chips()[activeDotIndex()].name}</h1>
                        <article
                            onClick={handleClick}
                            class="my-2 flex flex-row flex-wrap items-center justify-center gap-x-1"
                        >
                            <For each={chips()[activeDotIndex()].arr}>
                                {(chip, i) => <WebtoneChip code={chip.code} rgb={chip.rgbString} i={activeDotIndex} />}
                            </For>
                        </article>
                    </section>
                </section>
                <Show when={isPortal()}>
                    <PortalComponent portal={portal} active={active} setPortal={setPortal} />
                </Show>
            </main>
            <footer class="h-96 w-full bg-white"></footer>
        </>
    )
}

export default Spectra
