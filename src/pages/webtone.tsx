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
        console.log(chips())
    })

    const h1 = "text-4xl font-bold mb-3"
    const h2 = "text-2xl font-bold mt-6"
    const p = "mt-2 text-lg"
    const li = "mt-2 text-lg"

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
            const b = a[0].lab.map((lab) => lab.toPrecision(4))
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
                        WEBTONE aims to provide a free-to-use color system optimized for digital displays.
                    </p>
                    <h2 class={h2}>Gaps and Objectives</h2>
                    <p class={p}>
                        Traditional color systems like Pantone, RAL, and NCS are primarily focused on physical media. A
                        digital-first color system such as WEBTONE could offer several potential benefits:
                    </p>
                    <ul class="mt-4 list-inside list-disc space-y-2">
                        <li class={li}>
                            <b>Digital-First Design: </b> WEBTONE is tailored specifically for digital media, addressing
                            the unique challenges of color representation on screens.
                        </li>
                        <li class={li}>
                            <b>Community Driven</b>: WEBTONE is a free, open-source and community-driven project.
                        </li>
                        <li class={li}>
                            <b>Curated Palettes:</b> Providing a curated selection of colors to complement basic CSS
                            names like "LightPink" and "AliceBlue," with a new naming convention.
                        </li>

                        <li class={li}>
                            <b>Meet Evolving Standards:</b> Compatibility with evolving digital design standards and
                            technologies like CSS 4-5.
                        </li>

                        <li class={li}>
                            <b>Accessibility by Design:</b> Ensuring colors meet accessibility standards (e.g., WCAG
                            compliance).
                        </li>
                        <li class={li}>
                            <b>Wide Gamut Support:</b> Designed to support a wide gamut of colors, WEBTONE is compatible
                            with both sRGB and P3 displays, making it future-proof and adaptable to the latest display
                            technologies.
                        </li>

                        <li class={li}>
                            <b>Software Integration:</b> Provide free swatches and plugins for popular design software
                            like Adobe Creative Suite, Figma, Sketch, and more.
                        </li>
                        <li class={li}>
                            <b>Conversion Guidance:</b> Detailed guidelines for converting WEBTONE colors to CMYK ensure
                            that digital designs maintain color fidelity when printed, bridging the gap between digital
                            and physical media.
                        </li>

                        <li class={li}>
                            <b>Free to Use:</b> WEBTONE is freely available for use in any project, facilitating
                            seamless integration into design workflows and codebases.
                        </li>
                    </ul>
                    <h2 class={h2}>Feedback and Contribution </h2>
                    <p class={p}>
                        At this time, WEBTONE is just an idea and draft, looking for input and collaborations. If you
                        have suggestions, feedback, or would like to contribute, please reach out to us at{" "}
                        <a
                            href="https://github.com/codcodea/webtone/discussions/2"
                            class="mt-6 block text-blue-600  underline"
                        >
                            GitHub Discussions
                        </a>
                        <a href="https://github.com/codcodea/webtone" class="block text-blue-600 underline">
                            GitHub Repo
                        </a>
                        <a href="mailto:info@webtone.org" class="block text-blue-600 underline">
                            info@webtone.org
                        </a>
                    </p>

                    <table class="mt-12 w-full text-left">
                        <thead>
                            <tr>
                                <th class=" py-2">Version</th>
                                <th class=" py-2">Date</th>
                                <th class=" py-2">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-t">
                                <td class=" py-2 italic">v0.811</td>
                                <td class=" py-2">May 17, 2024</td>
                                <td class=" py-2">Initial</td>
                            </tr>
                            <tr class="border-t">
                                <td class=" py-2 italic">v0.812</td>
                                <td class=" py-2">May 21, 2024</td>
                                <td class=" py-2">Prefix and color names.</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </section>

            <section onClick={handleClick} class="mt-16 flex w-full flex-col items-center justify-center">
                <For each={webtone}>
                    {(hue, index) => {
                        return (
                            <section class="block w-11/12" data-palette={Math.floor(index())}>
                                <h1 class="mt-6 text-left text-2xl">WEBTONE - {hue.name}</h1>
                                <article class="my-2 flex flex-row flex-wrap items-center gap-x-1">
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
                <Portal>
                    <section
                        ref={portal}
                        class="fixed left-[50%] top-[50%] z-50 flex h-3/5 w-4/5 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center border border-neutral-300 bg-white px-6 shadow-xl"
                    >
                        <button
                            class="absolute bottom-6 right-6 z-20 h-6 w-16 border-neutral-200 text-sm uppercase shadow"
                            style={{ "background-color": "rgba(0,0,0,0.5)" }}
                            onClick={() => {
                                setPortal(false)
                            }}
                        >
                            <span class="z-30 select-none text-xs uppercase tracking-wide text-white opacity-100">
                                Close
                            </span>
                        </button>

                        <div class={"flex items-center justify-center"}>
                            <div class="flex h-96 w-96 flex-col border border-neutral-500 shadow-lg">
                                <div
                                    class="flex w-full flex-1  flex-col items-center justify-center p-2 text-neutral-900"
                                    style={{ "background-color": chip()[0]?.rgbString }}
                                >
                                    <p class="text-lg">{chip()[0]?.rgbString}</p>
                                    <p class="text-lg">{chip()[0]?.oklch}</p>
                                    <p class="text-lg">{chip()[0]?.labString} </p>
                                </div>
                                <div class="flex h-1/4 w-full flex-col justify-center bg-white px-6 py-3 text-neutral-900">
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
    code: string
    rgb: string
    i: () => number
}

const WebtoneChip = (props: WebtoneChipProps) => {
    return (
        <div
            class={
                "chip mt-2 flex h-40 w-28 flex-col border transition-shadow duration-150 hover:scale-150 hover:border hover:shadow-lg"
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
            <div class="flex h-12 flex-col items-start justify-center bg-white p-1">
                <p class="text-[10px]">WEBTONE</p>
                <p class="text-[10px]">{props.code}</p>
            </div>
        </div>
    )
}
