
import webtone from "../assets/webtones.json"
import { For, createSignal, onMount, Show } from "solid-js"
import { Portal } from "solid-js/web"

const Webtone = () => {

    let portal: HTMLDivElement
    const [chips, setChips] = createSignal(webtone)
    const [chip, setChip] = createSignal({})
    const [isPortal, setPortal] = createSignal(false)

    onMount(async () => {
        setChips(webtone)
    })

    const h1 = "text-4xl font-bold mb-4"
    const h2 = "text-2xl font-bold mt-6"
    const p = "mt-2 text-base"
    const li = "mt-2 text-base"

    const handleClick = (e) => {
        const wrapper = e.target.closest(".chip")

        if (wrapper) {
            const palette = wrapper.getAttribute("data-palette")
            const webtone = wrapper.getAttribute("data-webtone")
            console.log(palette)
            console.log(webtone)

            const pal = chips()[Number(palette)]
            const a = pal.filter((chip) => {
                if (chip.name == webtone) {
                    return chip
                }
            })

            console.log(a)  
            const b =  a[0].lab.map((lab) => lab.toPrecision(4))
            a[0].labString = `L: ${b[0]}, a: ${b[1]}, b: ${b[2]}`

            setChip(a)
            setPortal(true)
        }
    }
    return (
        <main class="container mx-auto mb-28 min-h-screen max-w-6xl">
            <section class="flex w-full flex-col items-center justify-center">
                <section class="m-12 w-2/3  text-neutral-800">
                    <h1 class={h1}>WEBTONE</h1>
                    <p class={p}>
                        WEBTONE is a digital first color system with 2880 curated colors for digital displays. Currently
                        in development, it is published for feedback and reference purposes.
                    </p>
                    <h2 class={h2}>Purpose</h2>
                    <p class={p}>
                        While Pantone, NCS, and RAL dominate color systems for physical materials, WEBTONE aims to
                        pioneer as a digital-first color system meticulously optimized for digital displays.
                    </p>

                    <h2 class={h2}>Goals</h2>
                    <ul class="mt-4 list-inside list-disc space-y-2">
                        <li class={li}>
                            <b>Extensive Curated Palette:</b> Offering a curated selection of colors that go beyond
                            basic CSS names like "LightPink" and "AliceBlue", ensuring versatility and aesthetic harmony
                            in digital design.
                        </li>
                        <li class={li}>
                            <b>Open Source and Community Driven</b>: Embracing open-source principles, WEBTONE invites
                            community contributions and feedback to evolve and refine its color palette continuously.
                        </li>
                        <li class={li}>
                            <b>Modern Naming Convention:</b> Implementing a contemporary naming convention that
                            resonates with digital design trends and usability.
                        </li>
                        <li class={li}>
                            <b>Optimized for Digital Displays and Future CSS Standards:</b> Prioritizing colors
                            optimized for digital displays, with an eye towards evolving CSS standards like CSS 4-5 for
                            enhanced color representation.
                        </li>

                        <li class={li}>
                            <b>Accessibility by Design:</b> Ensuring colors meet accessibility standards (e.g., WCAG
                            compliance), facilitating inclusive design practices and enhancing readability and usability
                            for all users.
                        </li>
                        <li class={li}>
                            <b>Wide Gamut Support:</b> Encompassing a wide gamut of colors at its core, with
                            compatibility extending to sRGB and future-ready P3-display support.
                        </li>

                        <li>
                            <b>Integration with Design Software:</b> Provide free swatches and plugins for popular
                            design software like Adobe Creative Suite, Figma, Sketch, and more.
                        </li>
                        <li class={li}>
                            <b>CMYK Conversion Guidance:</b> Providing guidance on converting WEBTONE colors to CMYK for
                            print, ensuring color consistency across digital and physical media.
                        </li>
                        <li class={li}>
                            <b>Free to Use:</b> WEBTONE is freely available for use in any project, facilitating
                            seamless integration into design workflows and codebases.{" "}
                        </li>
                    </ul>

                    <h2 class={h2}>Feedback</h2>
                    <p class={p}>
                        WEBTONE is a dynamic project actively seeking input from the design community. Your feedback is
                        invaluable in shaping and enhancing the system. Please share your thoughts and suggestions to
                        help us refine and improve WEBTONE.
                    </p>
                </section>
            </section>

            <section onClick={handleClick} class="flex w-full flex-col items-center justify-center">
                <For each={webtone}>
                    {(hue, index) => {
                        return (
                            <section class="block w-11/12" data-palette={Math.floor(index())}>
                                <h1 class="mt-6 text-left text-2xl">WEBTONE: {index()}</h1>
                                <article class="my-2 flex flex-row flex-wrap items-center gap-x-1">
                                    <For each={hue}>
                                        {(chip, i) => <WebtoneChip name={chip.name} rgb={chip.rgbString} i={index} />}
                                    </For>
                                </article>
                            </section>
                        )
                    }}
                </For>
            </section>

            <Show when={isPortal()}>
                <Portal>
                    <section
                        ref={portal}
                        class="fixed left-[50%] top-[50%] z-50 -translate-x-1/2 -translate-y-1/2 transform px-6 shadow-xl w-4/5 h-3/5 flex justify-center items-center bg-white border border-neutral-300"
                    >
                        <button
                            class="absolute bottom-6 right-6 z-20 h-6 w-16 border-neutral-200 text-sm uppercase shadow"
                            style={{ "background-color": "rgba(0,0,0,0.5)" }}
                            onClick={() => {setPortal(false)}}
                        >
                            <span class="z-30 select-none text-xs uppercase tracking-wide text-white opacity-100">
                                Close
                            </span>
                        </button>

                        <div class={"flex items-center justify-center"}>
                            <div class="h-96 w-96 border border-neutral-500 shadow-lg flex flex-col">
                                <div
                                    class="flex-1 w-full p-2  text-neutral-900 flex flex-col items-center justify-center"
                                    style={{ "background-color": chip()[0]?.rgbString}}
                                >
                                    <p class="text-lg">{chip()[0]?.rgbString}</p>
                                    <p class="text-lg">{chip()[0]?.oklch}</p>
                                    <p class="text-lg">{chip()[0]?.labString} </p>
                                </div>
                                <div class="h-1/4 w-full bg-white py-3 px-6 text-neutral-900 flex flex-col justify-center">
                                    <p class="text-lg">WEBTONE</p>
                                    <p class="text-lg">{chip()[0]?.name}</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </Portal>
            </Show>
        </main>
    )
}

export default Webtone

type WebtoneChipProps = {
    name: string
    rgb: string
    i: () => number
}

const WebtoneChip = (props: WebtoneChipProps) => {
    return (
        <div
            class={
                "chip mt-2 flex h-28 w-28 flex-col border transition-shadow duration-150 hover:scale-150 hover:border hover:shadow-lg"
            }
            data-webtone={props.name}
            data-palette={Math.floor(props.i())}
        >
            <div
                class={"w-full flex-1"}
                style={{
                    "background-color": props.rgb,
                }}
            ></div>
            <div class="flex h-1/3 flex-col items-start justify-center bg-white p-1">
                <p class="text-[10px]">WEBTONE</p>
                <p class="text-[10px]">{props.name}</p>
            </div>
        </div>
    )
}
