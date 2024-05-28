import webtone from "~/assets/webtones.json"
import { createSignal } from "solid-js"

// Redefine `Webtone` using `WebtoneItem`
type Webtone = {
    name: string
    arr: WebtoneChip[]
}[]

// Define a type for the `arr` field
interface WebtoneChip {
    code: string
    rgbString: string
    hex: string
    oklch: string
    hsl: string
    cmyk: string
    lum: string
}

interface WebtoneItem extends WebtoneChip {
    index: string
}

const [chips, setChips] = createSignal<Webtone>(webtone)

const lookupWebtoneIndex = (code: string) => {
    return chips().findIndex((chip) => chip.arr.some((item) => item.code === code.trim()))
}

const getWebtone = (code: string): WebtoneItem => {
    const index = chips().findIndex((chip) => chip.arr.some((item) => item.code === code.trim()))
    const chip = chips()[index].arr.find((item) => item.code === code.trim()) as WebtoneItem
    chip.index = index.toString()
    return chip
}

export { chips, setChips, lookupWebtoneIndex, getWebtone }
export type { Webtone, WebtoneItem, WebtoneChip }
