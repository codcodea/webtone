import webtone from "../assets/webtones.json"
import { For, createSignal, onMount, Show, createEffect, Setter } from "solid-js"

import WebtoneChip from "~/components/chip"
import Welcome from "~/components/welcome"
import PortalComponent from "~/components/portal"

import type { Webtone, WebtoneItem } from "~/state/webtone"

import { handleBlur, handleNormal, handleKeys, handleSelect } from "./handlers"

import { session } from "~/lib/session"

const Webtone = () => {
    let portal: HTMLDivElement

    const [active, setActive] = createSignal<WebtoneItem>(null)
    const [isPortal, setPortal] = createSignal(false)

    onMount(() => {
        session.addPage("pw")
    })

    createEffect(() => {
        isPortal() ? (handleBlur(), addKeys()) : (handleNormal(), removeKeys())
        isPortal() && session.addAction("po")
    })

    const { addKeys, removeKeys } = handleKeys(setPortal, portal)

    const handleClick = handleSelect(setActive, setPortal)

    return (
        <main class="container mx-auto mb-28 min-h-screen max-w-7xl">
            <Welcome />
            <section onClick={handleClick} class="mt-16 flex w-full flex-col items-center justify-center ">
                <For each={webtone}>
                    {(hue, index) => {
                        return (
                            <section class="w-11/12" data-palette={Math.floor(index())}>
                                <h1 class="mb-6 mt-12 text-center text-2xl text-neutral-800">{hue.name}</h1>
                                <article class="my-2 flex flex-row flex-wrap items-center justify-center gap-x-1">
                                    <For each={hue.arr}>
                                        {(chip, i) => <WebtoneChip code={chip.code} rgb={chip.rgbString} i={index} />}
                                    </For>
                                </article>
                            </section>
                        )
                    }}
                </For>
            </section>

            <Show when={isPortal()}>
                <PortalComponent portal={portal} active={active} setPortal={setPortal} />
            </Show>
        </main>
    )
}

export default Webtone
