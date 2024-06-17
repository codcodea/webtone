import { createSignal } from "solid-js"

const [tooltips, setTooltips] = createSignal<boolean>(true)
export { tooltips, setTooltips }
