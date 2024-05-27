import { SessionMetrics } from './lib/session'

declare global {
    interface Window {
        session: SessionMetrics
        EyeDropper: () => void
        htmx: any
        dataLayer: any[]
        jsonData: any
    }
    type ColorHSL = { h: number; s: number; l: number }

    type RandomHSL = {
        min: number
        max: number
    }[]
}
