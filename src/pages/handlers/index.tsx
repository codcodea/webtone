import { Setter } from "solid-js"
import { WebtoneItem } from "~/state/webtone"
import { addColorLS, rmColorLS } from "~/lib/ls"
import { chips } from "~/state/webtone"

export const handleBlur = () => {
    const root = document.getElementById("root")
    root.style.filter = "blur(3px) brightness(1) grayscale(1)"
}

export const handleNormal = () => {
    const root = document.getElementById("root")
    root.style.filter = "none"
}

export function handleKeys(setIsPortal: Setter<boolean>, portal: HTMLDivElement) {
    const addKeys = () => {
        addEventListener("keydown", handleEscKey)
        document.getElementById("root").style.filter = "blur(5px)"
        setTimeout(() => {
            addEventListener("click", handleClickOutside)
        }, 0)
    }

    const removeKeys = () => {
        removeEventListener("keydown", handleEscKey)
        removeEventListener("click", handleClickOutside)
        document.getElementById("root").style.filter = "none"
    }

    const handleEscKey = (e: KeyboardEvent) => {
        if (e.key === "Escape" || e.key === "Enter" || e.key === "Backspace") {
            setIsPortal(false)
        }
    }

    const handleClickOutside = (e: MouseEvent) => {
        if (e.target !== portal) {
            setIsPortal(false)
        }
    }
    return { addKeys, removeKeys }
}


export function handleSelect(setActive : Setter<WebtoneItem>, setPortal : Setter<boolean>) {
    return (e: MouseEvent) => {

        const target = e.target as HTMLInputElement

        const isCheckbox = target.tagName === "INPUT"
        const isChecked = target.checked

        // Find chip
        const grid = target.closest("section[data-palette]")
        if (!grid) return
        const palette = grid.getAttribute("data-palette")
        const chip = target.closest("div[data-webtone]")

        if (!chip) return

        const code = chip.getAttribute("data-webtone")
        const index = chip.getAttribute("data-index")

        const obj = chips()[palette].arr.find((chip) => chip.code == code)

        // Portal
        setActive(obj)
        !isCheckbox && setPortal(true)

        // Local Storage
        if (isCheckbox && isChecked) {
            addColorLS({ name: obj.code, color: obj.rgbString, index })
        } else if (isCheckbox) {
            rmColorLS({ name: obj.code, color: obj.rgbString, index })
        }
    }
}