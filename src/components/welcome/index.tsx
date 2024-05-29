const Welcome = () => {
    const h1 = "text-3xl font-bold mb-4"
    const h2 = "text-2xl font-bold mt-8"
    const h3 = "mt-12 text-lg italic"
    const p = "mt-2 text-lg"
    const li = "mt-2 text-lg"
    const span = "underline underline-offset-2"
    const a = "text-blue-600 underline text-xs"

    return (
        <section class="flex w-full flex-col items-center justify-center text-white">
            <section class="my-20 w-2/3  text-neutral-800">
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

                <ul class="mt-4 space-y-3">
                    <li class={li}>
                        <span class={span}>Digital-First Design:</span> Tailored for digital media, addressing screen
                        color representation challenges.
                    </li>
                    <li class={li}>
                        <span class={span}>Community Driven:</span> Free, open-source, and community-driven.
                    </li>
                    <li class={li}>
                        <span class={span}>Curated Palettes:</span> Offers colors curated to complement basic CSS
                        names with a new naming convention.
                    </li>
                    <li class={li}>
                        <span class={span}>Compatibility:</span> Designed for CSS 4-5 and evolving digital design
                        standards.
                    </li>
                    <li class={li}>
                        <span class={span}>Accessibility:</span> Ensures WCAG compliance for accessibility standards.
                    </li>
                    <li class={li}>
                        <span class={span}>Wide Gamut Support:</span> Supports a wide gamut of colors, adaptable to
                        sRGB and P3 displays.
                    </li>
                    <li class={li}>
                        <span class={span}>Software Integration:</span> Includes free swatches and plugins for Adobe
                        Creative Suite, Figma, and Sketch.
                    </li>
                    <li class={li}>
                        <span class={span}>Conversion Guidance:</span> Provides guidelines for converting WEBTONE
                        colors to CMYK for color fidelity in print (examples include, sRGB ICC v4 to PSO Coated v3).
                    </li>
                    <li class={li}>
                        <span class={span}>Free to Use:</span> Freely available for seamless integration into design
                        workflows and codebases.
                    </li>
                </ul>
                <h2 class={h2}>Feedback and Contribution </h2>
                <p class={p}>
                    At this time, WEBTONE is just an idea and draft, looking for input and collaborations. If you have
                    suggestions, feedback, or would like to contribute, please reach out to us at{" "}
                    <a
                        href="https://github.com/codcodea/webtone/discussions/2"
                        class="mt-6 block text-base text-blue-600 underline"
                    >
                        GitHub Discussions
                    </a>
                    <a href="https://github.com/codcodea/webtone" class="block text-base text-blue-600 underline">
                        GitHub Repo
                    </a>
                    <a href="mailto:info@webtone.org" class="block text-base text-blue-600 underline">
                        info@webtone.org
                    </a>
                </p>

                <h2 class={h2}>Development tests</h2>
                <p class={p}>
                    <a href="https://mycolorpicker.com" class="block text-base text-blue-600 underline">
                        Color matching tool
                    </a>
                </p>

                <table class="mt-12 w-full text-left text-base">
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
                            <td class=" py-2">System of 14 neutrals and 2880 colors, of which 61 overlap in sRGB </td>
                        </tr>
                        <tr class="border-t">
                            <td class=" py-2 italic">v0.813</td>
                            <td class=" py-2">May 26, 2024</td>
                            <td class=" py-2">Color wheel and Canvas</td>
                        </tr>
                        <tr class="border-t">
                            <td class=" py-2 italic"></td>
                            <td class=" py-2"></td>
                            <td class=" py-2">
                                Standard CMYK conversion:{" "}
                                <a class={a} href="https://www.color.org/srgbprofiles.xalter">
                                    sRGB ICC v4
                                </a>
                                ,{" "}
                                <a class={a} href="http://www.eci.org/doku.php?id=en:downloads">
                                    PSO Coated v3
                                </a>
                            </td>
                        </tr>
                        <tr class="border-t">
                            <td class=" py-2 italic"></td>
                            <td class=" py-2"></td>
                            <td class=" py-2">Assets incl Adobe Swatches</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </section>
    )
}

export default Welcome
