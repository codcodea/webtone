
import { createSignal } from 'solid-js'

const [showColor, setShowColor] = createSignal(true)
const [showName, setShowName] = createSignal(true)
const [showHex, setShowHex] = createSignal(false)
const [showLum, setShowLum] = createSignal(false)

const [isRightClick, setIsRightClick] = createSignal<string | null>(null)

export { showColor, showName, setShowColor, setShowName, showHex, setShowHex, showLum, setShowLum }
export { isRightClick, setIsRightClick }
