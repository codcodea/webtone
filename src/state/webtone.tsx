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
};


const [chips, setChips] = createSignal<Webtone>(webtone)

export { chips, setChips }
export type { Webtone, WebtoneItem }
