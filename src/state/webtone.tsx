import webtone from "~/assets/webtones.json"
import { createSignal } from "solid-js"



// Redefine `Webtone` using `WebtoneItem`
type Webtone = {
    name: string;
    arr: WebtoneItem[];
}[];

// Define a type for the `arr` field
type WebtoneItem = {
    code: string;
    rgbString: string;
    hex: string;
    oklch: string;
    hsl: string;
    cmyk: string;
    lum: string;
};


const [chips, setChips] = createSignal<Webtone>(webtone)

const lookupWebtoneIndex = (code: string) => {
    return chips().findIndex((chip) => chip.arr.some((item) => item.code === code.trim()))
}

export { chips, setChips, lookupWebtoneIndex }
export type { Webtone, WebtoneItem }
