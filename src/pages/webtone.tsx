import { For, createSignal, onMount, Show, createEffect } from "solid-js"

import { chips } from "~/state/webtone"
import WebtoneChip from "~/components/chip"
import Welcome from "~/components/welcome"
import PortalComponent from "~/components/portal"

import type { Webtone, WebtoneItem } from "~/state/webtone"
import { handleKeys, handleSelect } from "./handlers"
import { session } from "~/lib/session"

const Webtone = () => {
    const [active, setActive] = createSignal<WebtoneItem>(null)
    const [isPortal, setPortal] = createSignal(false)

    onMount(async () => {
        session.addPage("pw")
    })

    createEffect(() => {
        isPortal() ? addKeys() : removeKeys()
        isPortal() && session.addAction("po")
    })

    const { addKeys, removeKeys } = handleKeys(setPortal)

    const handleClick = handleSelect(setActive, setPortal)

    return (
        <main class="container mx-auto mb-28 min-h-screen max-w-7xl">
            <Welcome />
            <section onClick={handleClick} class="mt-16 flex w-full flex-col items-center justify-center">
                <For each={chips()}>
                    {(hue, index) => {
                        return (
                            <section class="w-11/12" data-palette={Math.floor(index())}>
                                <h1 class="mb-6 mt-12 text-center text-2xl text-neutral-800">{hue.name}</h1>
                                <article class="my-2 flex flex-row flex-wrap items-center justify-center gap-x-1">
                                    <For each={hue.arr}>
                                        {(chip) => <WebtoneChip chip={chip} index={index()} hasSelect={false}/>}
                                    </For>
                                </article>
                            </section>
                        )
                    }}
                </For>
            </section>

            <Show when={isPortal()}>
                <PortalComponent active={active} setPortal={setPortal} />
            </Show>
        </main>
    )
}

export default Webtone
