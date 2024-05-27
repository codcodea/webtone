const TEXT_BRIGHT = "#fefefe"
const TEXT_DARK = "#353535"

// Get colors from API
const handleColor = (pickedColor: string, isFirst: boolean = false): void => {
    const elt = document.querySelector("#idMessage") as HTMLElement
    const hue = extractHue(elt.dataset.color)
    setEffects(pickedColor, hue, isFirst)
}

const setEffects = (pickedColor: string, currentHue: string, isFirst: boolean): void => {
    if (pickedColor.startsWith("#")) pickedColor = pickedColor.substring(1)

    const text = textColor(pickedColor)
    const baseColor = document.querySelector(".base-color") as HTMLElement
    const webtoneColor = document.querySelector(".webtone-color") as HTMLElement
    //const palette = document.querySelectorAll(".palette") as NodeListOf<HTMLElement>
    const addIcon = document.querySelectorAll(".add-icon") as NodeListOf<HTMLElement>
    //const welcomecard = isFirst ? [] : (document.querySelectorAll('.welcomecard') as NodeListOf<HTMLElement>)

    baseColor.style.color = text
    webtoneColor.style.color = text

    //addIcon.forEach((e) => (e.firstElementChild.style.color = text))

    const colorPicker = document.querySelector("#color-picker") as HTMLElement
    if (colorPicker) colorPicker.style.color = text

    if (currentHue) setHoverColor(text, currentHue)
    else setHoverColor(text, "0")
}

const textColor = (pickedColor: string): string => {
    
    const luminance = (hex: string) => {
        const rgb = hexToRgb(hex);
        const r = rgb.r / 255;
        const g = rgb.g / 255;
        const b = rgb.b / 255;
        return (r * 0.299 + g * 0.587 + b * 0.114);
    }

    const hexToRgb = (hex: string) => {
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return { r, g, b };
    }

    if (pickedColor.startsWith('#')) {
        pickedColor = pickedColor.slice(1);
    }
    return luminance(pickedColor) > 0.5 ? TEXT_DARK : TEXT_BRIGHT; 
}

function setHoverColor(textColor: string, currentHue: string) {
    let sheet = null

    //find the stylesheet with the hover rule (as pseudo clasees cannot be targeted with JS and vite minimizes the CSS)
    for (const s of document.styleSheets) {
        if (s?.href?.includes("tailwind")) {
            sheet = s
            break
        }
        if (s?.href?.includes("typekit") || s?.href?.includes("google")) continue //
        if (s?.cssRules?.length < 30) continue // a-color-picker is 27 rules long and htmx is 3 rules long
        sheet = s
    }

    let hoverRule = [...sheet.cssRules].filter((rule) => rule.selectorText === "abbr:hover:not(#wiki)")[0]

    if (!hoverRule) return

    if (textColor === TEXT_BRIGHT) {
        hoverRule.style.color = `hsl(${currentHue}, 42%, 60%)`
    } else {
        hoverRule.style.color = `hsl(${currentHue}, 32%, 33%)`
    }
}

// hsl(238, 56%, 31%) -> 238
function extractHue(hslString: string) {
    if (!hslString) {
        return "#252525"
    }
    const regex = /hsl\(([\d.]+),\s*([\d.]+)%,\s*([\d.]+)%\)/
    const matches = hslString.match(regex)

    if (matches && matches.length === 4) {
        const hue = parseFloat(matches[1])
        const roundedHue = Math.round(hue)
        return roundedHue.toString() // Convert to string
    }
    return undefined
}

export { handleColor }
