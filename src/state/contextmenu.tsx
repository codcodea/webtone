
import { createSignal } from 'solid-js'

const [showColor, setShowColor] = createSignal(true)
const [showName, setShowName] = createSignal(true)

const [isRightClick, setIsRightClick] = createSignal<string | null>(null)

export { showColor, showName, setShowColor, setShowName }
export { isRightClick, setIsRightClick }
