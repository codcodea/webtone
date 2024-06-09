import { WebtoneItem } from "~/state/webtone"

type CustomItem = {
    code: string
    hex: string
}

type SavedColor = {
    index: number | undefined
    name: string
    color: string
    hex: string
    lum: string
}

interface WebtoneItemClone extends WebtoneItem {
    id: string // clone-<random_id>
    dx: number
    dy: number
    width: string
    height: string
}

type Selected = Set<string>

import { createSignal } from "solid-js"
import { session } from "~/lib/session"

// States
const [getColorsState, setColorsState] = createSignal<WebtoneItem[]>([])
const [isSelectedState, setIsSelectedState] = createSignal<Selected>(new Set()) // for efficient lookup
const [clones, setClones] = createSignal<WebtoneItemClone[]>([])

// Local storage
// A color is an object with a name and a color
// A clone is an object with a name, color, width, height, dx, dy, and id, dragged to the canvas

const initColors = () => {
    let colors: WebtoneItem[] = JSON.parse(localStorage.getItem("colors") || "[]")
    setColorsState(colors)
    setIsSelectedState(new Set(colors.map((c) => c.code)))
}

const addColorLS = (obj: WebtoneItem) => {
    // TODO: Nowboth CustomItem and WebtoneItem
    let colors: WebtoneItem[] = JSON.parse(localStorage.getItem("colors") || "[]")

    // return if the color is already in the list
    if (colors.some((c) => c.code === obj.code)) {
        return
    }

    colors.push(obj)
    localStorage.setItem("colors", JSON.stringify(colors))

    // set state
    setColorsState(colors)

    // set isSelected state
    const isSelected = colors.filter((c) => c.cmyk != undefined).map((c) => c.code) // cmyk does not exist in CutomItem
    setIsSelectedState(new Set<string>(isSelected))
    session.addAction("add")
}

const clearColorsLS = () => {
    localStorage.removeItem("colors")
    setColorsState([])
    setIsSelectedState(new Set<string>())
    session.addAction("cl")
}

const rmColorLS = (code: string) => {
    let colors: WebtoneItem[] = JSON.parse(localStorage.getItem("colors") || "[]")
    colors = colors.filter((color) => color.code !== code)
    localStorage.setItem("colors", JSON.stringify(colors))

    setColorsState(colors)
    setIsSelectedState(new Set(colors.map((c) => c.code)))
    setClones((prev) => prev.filter((clone) => clone.code !== code))
    addClonesLS(clones())
    session.addAction("rm")
}

const saveColorSortLS = (colors: WebtoneItem[]) => {
    localStorage.setItem("colors", JSON.stringify(colors))
}

// Clones
const addClonesLS = (clones: WebtoneItemClone[]) => {
    localStorage.setItem("clones", JSON.stringify(clones))
}

const getClonesLS = (): WebtoneItemClone[] => {
    const colors = JSON.parse(localStorage.getItem("clones") || "[]")
    return colors
}

const handleClearAll = () => {
    clearColorsLS()
    setColorsState([])
    setClones([])
}

const handleClearUnused = () => {
    let colors: WebtoneItem[] = JSON.parse(localStorage.getItem("colors") || "[]")
    const used = new Set(clones().map((c) => c.code))
    colors = colors.filter((c) => used.has(c.code))
    saveColorSortLS(colors)
    setColorsState(colors)
    setIsSelectedState(new Set(colors.map((c) => c.code)))
}

export {
    addColorLS,
    rmColorLS,
    clearColorsLS,
    initColors,
    getColorsState,
    setColorsState,
    saveColorSortLS,
    addClonesLS,
    getClonesLS,
    isSelectedState,
    setIsSelectedState,
    clones,
    setClones,
    handleClearAll,
    handleClearUnused,
}
export type { SavedColor, WebtoneItemClone }
