import { For, createSignal, Show, createEffect } from "solid-js"

import { addColorLS, rmColorLS, getColorsState } from "../lib/ls"

import Oswald from "~/components/oswald"
import WebtoneChip from "~/components/chip"
import PortalComponent from "~/components/portal"

import { chips } from "~/state/webtone"
import type { WebtoneItem } from "~/state/webtone"
import { activeDotIndex, setActiveDotIndex } from "~/state/spectra"

import { handleBlur, handleNormal, handleKeys, handleSelect } from "./handlers"

const Spectra = () => {
    let portal: HTMLDivElement

    const [active, setActive] = createSignal<WebtoneItem>(null)
    const [isPortal, setPortal] = createSignal(false)

    const handleClick = handleSelect(setActive, setPortal)

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

    return (
        <main class="container mx-auto mb-28 min-h-screen max-w-7xl">
            <section class="mt-20 flex justify-center">
                <Oswald handleOswaldClick={handleOswaldClick} />
            </section>

            <section class="mt-16 flex w-full flex-col items-center justify-center">
                <section class="w-11/12" data-palette={activeDotIndex()}>
                    <h1 class="mt-12 mb-6 text-center text-2xl">WEBTONE - {chips()[activeDotIndex()].name}</h1>
                    <article onClick={handleClick} class="my-2 flex flex-row flex-wrap items-center justify-center gap-x-1">
                        <For each={chips()[activeDotIndex()].arr}>
                            {(chip, i) => (
                                <WebtoneChip
                                    code={chip.code}
                                    rgb={chip.rgbString}
                                    i={activeDotIndex}
                                />
                            )}
                        </For>
                    </article>
                </section>
            </section>
            <Show when={isPortal()}>
                <PortalComponent portal={portal} active={active} setPortal={setPortal} />
            </Show>
        </main>
    )
}

export default Spectra
