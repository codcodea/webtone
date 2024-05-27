import { lookupWebtoneIndex } from "~/state/webtone"


type SavedColor = {
    index: number | undefined
    name: string
    color: string
}

type Clone = {
    id: string
    dx: number
    dy: number
    color: string
    width: string
    height: string
    name: string
}

type Selected = Set<string>

import { createSignal } from "solid-js"
import { session } from "~/lib/session"

// States
const [getColorsState, setColorsState] = createSignal<SavedColor[]>([])
const [isSelectedState, setIsSelectedState] = createSignal<Selected>(new Set()) // for efficient lookup
const [clones, setClones] = createSignal<Clone[]>([])

// Local storage
// A color is an object with a name and a color
// A clone is an object with a name, color, width, height, dx, dy, and id, dragged to the canvas

const initColors = () => {
    let colors: SavedColor[] = JSON.parse(localStorage.getItem("colors") || "[]")
    setColorsState(colors)
    setIsSelectedState(new Set(colors.map((c) => c.name)))
}

const addColorLS = (obj: SavedColor) => {

    if(obj.index === -1) {
        obj.index = lookupWebtoneIndex(obj.name)
    }

    const inColor = obj.color.trim()

    let colors: SavedColor[] = JSON.parse(localStorage.getItem("colors") || "[]")
    // check if hex is already in the array
    if (colors.some((c) => c.color === inColor)) {
        return
    }

    colors.push({ name: obj.name, color: inColor, index: obj.index})
    localStorage.setItem("colors", JSON.stringify(colors))

    setColorsState(colors)
    const isSelected = colors.filter(c => c.index != undefined).map((c) => c.name)
    setIsSelectedState(new Set<string>(isSelected))
    session.addAction("add")
}

const clearColorsLS = () => {
    localStorage.removeItem("colors")
    setColorsState([])
    setIsSelectedState(new Set<string>())
    session.addAction("cl")
}

const rmColorLS = (obj: SavedColor) => {
    let colors: SavedColor[] = JSON.parse(localStorage.getItem("colors") || "[]")
    colors = colors.filter((color) => color.color !== obj.color)

    localStorage.setItem("colors", JSON.stringify(colors))

    setColorsState(colors)
    setIsSelectedState(new Set(colors.map((c) => c.name)))
    setClones((prev) => prev.filter((clone) => clone.name !== obj.name))
    addClonesLS(clones())
    session.addAction("rm")
}

const saveColorSortLS = (colors: SavedColor[]) => {
    localStorage.setItem("colors", JSON.stringify(colors))
}

// Clones
const addClonesLS = (clones: Clone[]) => {
    localStorage.setItem("clones", JSON.stringify(clones))
}

const getClonesLS = (): Clone[] => {
    const colors = JSON.parse(localStorage.getItem("clones") || "[]")
    return colors
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
}
export type { SavedColor, Clone }
