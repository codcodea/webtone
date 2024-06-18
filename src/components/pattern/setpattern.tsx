
import type { WebtoneItemClone } from "~/lib/ls"

const setPattern = (patternEl : SVGPatternElement, clones : WebtoneItemClone[]) => {
    const scale = (Math.random() * 4 + 5).toFixed(2)
    const rotate = Math.floor(Math.random() * 360)

    patternEl.setAttribute("patternTransform", `scale(${scale}) rotate(${rotate})`)

    let clonesCopy = clones
    const bgColor = clones.find((c) => c.isBackground)

    // Ground color
    if (bgColor) {
        const ground = patternEl.querySelector("rect")
        ground.setAttribute("fill", bgColor.hex)
        clonesCopy = clonesCopy.filter((c) => !c.isBackground)
    } else {
        const ground = patternEl.querySelector("rect")
        ground.setAttribute("fill", "#ffffff")
    }

    const paths = patternEl.querySelectorAll("path")

    let lastColor = clonesCopy[0].hex
    let cloneLen = clonesCopy.length

    paths.forEach((path, index) => {
        if (index >= cloneLen) {
            path.setAttribute("fill", lastColor)
        } else {
            lastColor = clonesCopy[index].hex
            path.setAttribute("fill", lastColor)
        }
    })
}

export default setPattern