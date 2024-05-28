import { Setter } from "solid-js"
import { WebtoneItem, getWebtone } from "~/state/webtone"
import { addColorLS, rmColorLS } from "~/lib/ls"
import { chips } from "~/state/webtone"


export function handleKeys(setIsPortal: Setter<boolean>) {
    const addKeys = () => {
        addEventListener("keydown", handleEscKey)
        const root = document.getElementById("root")
        root.style.filter = "blur(5px) grayscale(90%)"
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
        
        const target = e.target as HTMLElement
        const portal = document.getElementById("portal") 
        if (target.closest("section") != portal) {
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
            addColorLS(getWebtone(code))
        } else if (isCheckbox) {
            rmColorLS(code)
        }
    }
}