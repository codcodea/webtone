import webtoneJson from "~/assets/webtones.json"
import { createSignal } from "solid-js"

// Redefine `Webtone` using `WebtoneItem`
type Webtone = {
    name: string
    arr: WebtoneChip[]
}[]

// Define a type for the `arr` field
interface WebtoneChip {
    code: string
    hex: string
    rgbString: string
    oklch: string
    hsl: string
    cmyk: string
    lum: string
    descriptor?: string
    hueClass?: number
    shadeClass?: number
    chromaClass?: number
}

interface WebtoneItem extends WebtoneChip {
        index: number
}

const [chips, setChips] = createSignal<Webtone>(webtoneJson)

const lookupWebtoneIndex = (code: string) => {
        return chips().findIndex((chip) => chip.arr.some((item) => item.code === code.trim()))
}

const getWebtone = (code: string): WebtoneItem => {
    const index = chips().findIndex((chip) => chip.arr.some((item) => item.code === code.trim()))
    const chip = chips()[index].arr.find((item) => item.code === code.trim()) as WebtoneItem
    chip.index = index
    return chip
}

export { chips, setChips, lookupWebtoneIndex, getWebtone }
export type { Webtone, WebtoneItem, WebtoneChip }
