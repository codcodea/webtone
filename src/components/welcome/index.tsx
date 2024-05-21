const Welcome = () => {
    const h1 = "text-4xl font-bold mb-3"
    const h2 = "text-2xl font-bold mt-6"
    const h3 = "mt-4 text-lg font-bold italic"
    const p = "mt-3 text-lg"
    const li = "mt-2 text-lg"
    const span = "font-bold"


    return (
        <section class="flex w-full flex-col items-center justify-center">
            <section class="m-12 w-2/3  text-neutral-800">
                <h1 class={h1}>WEBTONE</h1>
                <p class={p}>
                    WEBTONE is a digital-first color system featuring 2880 curated colors specifically tailored for
                    digital displays. Currently in development, it is published for feedback and reference purposes.
                </p>
                <h2 class={h2}>Purpose</h2>
                <p class={p}>WEBTONE aims to provide a free-to-use color system optimized for digital displays.</p>
                <h2 class={h2}>Objectives</h2>
                <p class={p}>
                    Unlike traditional color systems such as Pantone, RAL, and NCS, which primarily serve physical
                    media, a digital-first approach offers several advantages:
                </p>

                <ul class="mt-4 list-inside list-disc space-y-2">
                    <li class={li}>
                        <span class={span}>Digital-First Design:</span> WEBTONE is tailored for digital media,
                        addressing the unique challenges of color representation on screens.
                    </li>
                    <li class={li}>
                        <span class={span}>Community Driven:</span> WEBTONE is a free, open-source, and community-driven
                        project.
                    </li>
                    <li class={li}>
                        <span class={span}>Curated Palettes:</span> WEBTONE offers a selection of colors curated to
                        complement basic CSS names like "LightPink" and "AliceBlue," using a new naming convention.
                    </li>
                    <li class={li}>
                        <span class={span}>Compatibility:</span> Designed to meet evolving digital design standards and
                        technologies such as CSS 4-5.
                    </li>
                    <li class={li}>
                        <span class={span}>Accessibility:</span> Ensures colors meet accessibility standards, such as
                        WCAG compliance.
                    </li>
                    <li class={li}>
                        <span class={span}>Wide Gamut Support:</span> Designed to support a wide gamut of colors, making
                        it future-proof and adaptable to the latest display technologies like sRGB and P3 displays.
                    </li>
                    <li class={li}>
                        <span class={span}>Software Integration:</span> Includes free swatches and plugins for popular
                        design software like Adobe Creative Suite, Figma, and Sketch.
                    </li>
                    <li class={li}>
                        <span class={span}>Conversion Guidance:</span> Provides detailed guidelines for converting
                        WEBTONE colors to CMYK, ensuring color fidelity in digital designs when printed.
                    </li>
                    <li class={li}>
                        <span class={span}>Free to Use:</span> WEBTONE is freely available for use in any project,
                        facilitating seamless integration into design workflows and codebases.
                    </li>
                </ul>
                <h2 class={h2}>Feedback and Contribution </h2>
                <p class={p}>
                    At this time, WEBTONE is just an idea and draft, looking for input and collaborations. If you have
                    suggestions, feedback, or would like to contribute, please reach out to us at{" "}
                    <a
                        href="https://github.com/codcodea/webtone/discussions/2"
                        class="mt-6 block text-blue-600 underline"
                    >
                        GitHub Discussions
                    </a>
                    <a href="https://github.com/codcodea/webtone" class="block text-blue-600 underline ">
                        GitHub Repo
                    </a>
                    <a href="mailto:info@webtone.org" class="block text-blue-600 underline ">
                        info@webtone.org
                    </a>
                </p>

                <h2 class={h2}>Development tests</h2>
                <p class={p}>
                    <a href="https://mycolorpicker.com" class="block text-blue-600 underline ">
                        Color matching tool
                    </a>
                </p>

                <h2 class={h2}>Changelog</h2>
                <table class="m-2 w-full text-left ">
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
    )
}

export default Welcome
