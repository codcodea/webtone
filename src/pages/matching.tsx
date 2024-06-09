import { chips } from "~/state/webtone"
import WebtoneChip from "~/components/chip"

import hueShift from "~/assets/hue-shift.png"
import starBucks from "~/assets/starbucks.png"
import spiral from "~/assets/spiral.png"

import green from "~/assets/greenhuechips.jpg"
import oranges from "~/assets/yellowhuechips.jpg"
import redShift from "~/assets/image.png"

const Match = () => {
    return (
        <main class="container mx-auto mb-28 min-h-screen max-w-5xl">
            <h1 class="mb-6 mt-12  text-3xl text-neutral-800">Common Recipes and Uses</h1>
            <p>
                This developing page showcases some common color palette techniques. WEBTONE, like any color system,
                aims to unify design and color practices across digital and physical media. By standardizing color
                communication WEBTONE aims to ensure reliable and precise color reproduction in professional design.
            </p>

            <h1 class="mb-6 mt-12  text-2xl text-neutral-800">WEBTONE Label System</h1>
            <p class="mb-2">WEBTONE uses a structured label system to identify colors:</p>

            <div class="my-8">
                <WebtoneChip chip={chips()[18].arr[62]} big={true} index={0} hasSelect={false} />
            </div>

            <ul class="space-y-4">
                <li>
                    <span class="font-bold">General Classification:</span> Each hue is categorized into one of Pale,
                    Light, Soft, Bright, or Vivid chromas. Deeper shades are labeled as Muted or Deep.
                </li>
                <li>
                    <span class="font-bold">Hue Family Name:</span> Each hue family is assigned a specific name, such as
                    "B-1" for the first blue hues.
                </li>
                <li>
                    <span class="font-bold">Color Code:</span> The color code consists of two digits. The first digit
                    (1-8) indicates the shade, with 1 being the lightest and 8 the darkest. The second digit (1-8)
                    indicates the saturation level, where 0 is least saturated and 8 is most saturated.
                </li>
            </ul>

            <h2 class="mb-4 mt-12 text-2xl text-neutral-800">Shades</h2>
            <p class="mb-2">
                Creating shades is maybe the most common color palette technique. It involves selecting a single hue and
                adjusting its lightness to create a range of colors. This technique is particularly useful for
                developing monochromatic color schemes.
            </p>
            <p class="">
                In WEBTONE, shades are selected from the same hue family, distinguished by their ending number, such as
                2 and 1 respectively.
            </p>
            <section class="my-8">
                <article class="mt-4 flex gap-3">
                    <WebtoneChip chip={chips()[18].arr[62]} big={true} index={0} hasSelect={false} />
                    <WebtoneChip chip={chips()[18].arr[52]} big={true} index={0} hasSelect={false} />
                    <WebtoneChip chip={chips()[18].arr[32]} big={true} index={0} hasSelect={false} />
                </article>
                <article class="mt-4  flex gap-3">
                    <WebtoneChip chip={chips()[27].arr[71]} big={true} index={0} hasSelect={false} />
                    <WebtoneChip chip={chips()[27].arr[51]} big={true} index={0} hasSelect={false} />
                    <WebtoneChip chip={chips()[27].arr[31]} big={true} index={0} hasSelect={false} />
                    <WebtoneChip chip={chips()[27].arr[11]} big={true} index={0} hasSelect={false} />
                </article>
            </section>
            <h2 class="mb-6 mt-12 text-2xl text-neutral-800">Natural progression</h2>
            <p>
                The natural progression technique mimics the subtle shifts of colors found in nature, creating
                harmonious and visually appealing color schemes. Unlike monochromatic schemes, this approach adds depth
                and dynamism to designs.
            </p>

            <h2 class="mb-1 mt-4 text-lg">Greens in nature</h2>
            <p>
                Greens in nature is a great example of a natural progression color scheme, but this technique can be
                applied to any hue family. Below the hues are expressed in the hue-component of HSL.
            </p>

            <img  src={green} class="w-[460px] object-cover border my-12" />

            <p class="my-2">
                In WEBTONE, natural progression is achived by selecting colors from adjacent hues and adjusting
                saturation (the first of the two ending numbers) as you move through the shades.
            </p>
            <section class="my-8  flex gap-3">
                <WebtoneChip chip={chips()[32].arr[78]} big={true} index={0} hasSelect={false} />
                <WebtoneChip chip={chips()[33].arr[69]} big={true} index={0} hasSelect={false} />
                <WebtoneChip chip={chips()[33].arr[48]} big={true} index={0} hasSelect={false} />
                <WebtoneChip chip={chips()[34].arr[39]} big={true} index={0} hasSelect={false} />
                <img src={hueShift} class="w-[160px]  object-cover" />
            </section>

            <h2 class="mb-1 mt-6 text-lg">Starbucks</h2>
            <p>The Starbbucks greens are a great example of a natural progression.</p>
            <section class="my-8  flex gap-3">
                <WebtoneChip chip={chips()[29].arr[76]} big={true} index={0} hasSelect={false} />
                <WebtoneChip chip={chips()[30].arr[68]} big={true} index={0} hasSelect={false} />
                <img src={starBucks} class="w-[160px]  object-cover" />
            </section>

            <h2 class="mb-1 mt-6 text-lg">Other examples</h2>
            <section class="my-8 flex gap-3">
                <WebtoneChip chip={chips()[4].arr[5]} big={true} index={0} hasSelect={false} />
                <WebtoneChip chip={chips()[6].arr[16]} big={true} index={0} hasSelect={false} />
                <WebtoneChip chip={chips()[8].arr[27]} big={true} index={0} hasSelect={false} />
                <img src={redShift} class="w-[160px]  object-cover" />
            </section>

            <h2 class="mb-1 mt-6 text-lg">Using WEBTONE Tools</h2>
            <p>
                By using the color picker we can find inspiration from every day objects to match colors into the
                system.
            </p>

            <img src={oranges} class="w-[460px] object-cover border my-12" />
            <section class="mt-4  flex gap-3">
                <WebtoneChip chip={chips()[2].arr[39]} big={true} index={0} hasSelect={false} />
                <WebtoneChip chip={chips()[4].arr[49]} big={true} index={0} hasSelect={false} />
                <WebtoneChip chip={chips()[5].arr[59]} big={true} index={0} hasSelect={false} />
                <WebtoneChip chip={chips()[6].arr[79]} big={true} index={0} hasSelect={false} />
                <img src={spiral} class="w-[160px]  object-cover" />
            </section>
        </main>
    )
}

export default Match
