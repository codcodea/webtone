import { chips } from "~/state/webtone"
import WebtoneChip from "~/components/chip"

import palette from "~/assets/palette.jpg"
import oswald from "~/assets/oswald.png"

const FAQ = () => {
    return (
        <main class="container mx-auto mb-28 min-h-screen max-w-3xl">
            <h1 class="mb-6 mt-12  text-3xl text-neutral-800">What is WEBTONE?</h1>
            <p>
                WEBTONE is a comprehensive set of colors, tools, and techniques designed for professional design and
                precise color reproduction.
            </p>
            <h1 class="mb-6 mt-12  text-2xl text-neutral-800">What does WEBTONE include?</h1>
            <p class="mt-4">WEBTONE include:</p>
            <ul class="my-4 list-inside list-disc">
                <li>A standard color and labeling system</li>
                <li>A color wheel</li>
                <li>A picker tool </li>
                <li>Software integration with swatches </li>
                <li>Print guidance</li>
                <li>Inspiration and common color palette techniques</li>
            </ul>

            <h1 class="mb-6 mt-12  text-2xl text-neutral-800">WEBTONE - The Label System</h1>
            <p class="mb-2">
                WEBTONE uses a structured labeling system to identify colors. The color wheel is divided into 40
                segments, each representing a standard hue.
            </p>

            <section class="my-12 flex justify-center shadow">
                <img class="my-6 w-96" src={oswald} alt="oswald color wheel" />
            </section>

            <p>Each hue is divided into 8 shades and 10 chromas.</p>

            <section class="my-12 flex justify-center shadow">
                <img src={palette} alt="palette" />
            </section>

            <p class="mt-4">Terminology:</p>

            <ul class="my-6 list-inside list-disc space-y-1">
                <li>
                    A hue-family is labled <i>a set</i>, <i>a card </i> or <i>a hue-familty</i>
                </li>
                <li>
                    A column is labeled <i>a strip</i> or <i>a shade </i>
                </li>
                <li>
                    A row is is labeled <i>a progression</i>{" "}
                </li>
                <li>
                    A WEBTONE color is labled <i>a color</i> or <i>a chip</i>
                </li>
                <li>
                    Each hue is divided into seven categories: <i>Pale, Light, Soft, Bright, Vivid, Muted and Deep</i>
                </li>
            </ul>

            <p class="mt-12">Examples:</p>

            <section class="my-8 flex justify-center gap-4 p-8 shadow">
                <WebtoneChip chip={chips()[30].arr[10]} big={true} index={0} hasSelect={false} />
                <WebtoneChip chip={chips()[3].arr[26]} big={true} index={0} hasSelect={false} />
                <WebtoneChip chip={chips()[18].arr[64]} big={true} index={0} hasSelect={false} />
                <WebtoneChip chip={chips()[25].arr[69]} big={true} index={0} hasSelect={false} />
                <WebtoneChip chip={chips()[12].arr[9]} big={true} index={0} hasSelect={false} />
            </section>
            <section class="my-6">
                <ul class="space-y-4">
                    <li>
                        <span class="font-bold">General Classification:</span> A WEBTONE color starts with the general
                        classification to help identify its characteristic, which can be <i>Pale</i>, <i>Light</i>,{" "}
                        <i>Soft</i>, <i>Bright</i>, or <i>Vivid</i> chromatics. Deeper shades are labeled {" "}
                        <i>Muted</i> or <i>Deep</i>.
                    </li>
                    <li>
                        <span class="font-bold">Hue Family:</span> Each hue family is assigned a specific name, such as
                        "B-1" for the first blue hue.
                    </li>
                    <li>
                        <span class="font-bold">Color Code:</span> The color code consists of two digits. The first
                        digit (1-8) indicates the shade, with 1 being the lightest and 8 the darkest. The second digit
                        (1-8) indicates the saturation level, where 1 is least saturated and 8 is most saturated.
                    </li>
                </ul>
            </section>
            <h1 class="mb-6 mt-12  text-3xl text-neutral-800">The Color Picker Tool</h1>
            <p class="mb-4">
                The color picker lets you referece any color one the screen. Click the plus symbol to add the
                corresponding WEBTONE color to the canvas.
            </p>
            <p>
                For qucik reference, the following keybord shortcuts are availible on the picker tab: <code class="border border-neutral-500 px-2 py-1">d</code> to open the picker.{" "}
                <code class="border border-neutral-500 px-2 py-1">s</code> to save and{" "}
                <code class="border border-neutral-500 px-2 py-1">esc</code> to abort.
            </p>

            <h1 class="mb-6 mt-12  text-3xl text-neutral-800">The Color Palette Tool</h1>
            <p class="mb-4">
                To quickly reference a color palette, add 2-6 colors to the canvas. Right-click to select the background
                color. Click the button <i>PALETTE</i> when it appears on the canvas.
            </p>
        </main>
    )
}

export default FAQ
