import { Setter, Accessor } from "solid-js"
import { WebtoneItem, getWebtone } from "~/state/webtone"
import { addColorLS, rmColorLS } from "~/lib/ls"
import { chips } from "~/state/webtone"

export function handleKeys(
    setIsPortal: Setter<boolean>,
    active: Accessor<WebtoneItem>,
    setActive: Setter<WebtoneItem>
) {
    const addKeys = () => {
        addEventListener("keydown", handleEscKey)
        setTimeout(() => {
            addEventListener("click", handleClickOutside)
        }, 0)
    }

    const removeKeys = () => {
        removeEventListener("keydown", handleEscKey)
        removeEventListener("click", handleClickOutside)
    }

    const handleEscKey = (e: KeyboardEvent) => {
        e.preventDefault(); // preventes underlying page from scrolling

        if (e.key === "Escape" || e.key === "Enter" || e.key === "Backspace") {
            setIsPortal(false)
            return
        } 

        const keys = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"]
        if (!keys.includes(e.key)) return

        const hue = active()?.hueClass
        let index = Number(active()?.shadeClass - 1 + "" + active()?.chromaClass)

        if (!hue || isNaN(index)) return // neutrals
        
        switch (e.key) {
            case "ArrowRight":
                if (index % 10 === 9) return
                else index++
                break
            case "ArrowLeft":
                if (index % 10 === 0) return
                else index--
                break
            case "ArrowUp":
                if(index < 10) return
                index -= 10
                Math.abs(index) % 80
                break
            case "ArrowDown":
                if(index > 69) return // 
                index += 10
                index %= 80
                break
        }

        const newChip = chips()[hue].arr[index] as WebtoneItem
        newChip.index = hue
        setActive(newChip)
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

export function handleSelect(setActive: Setter<WebtoneItem>, setPortal: Setter<boolean>) {
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
        const obj = chips()[palette].arr.find((chip) => chip.code == code)

        if (!obj) return

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
