import lifecycle from "page-lifecycle"
import { env } from "~/lib/api"

class SessionMetrics {
    start = Date.now()
    isDestroyed = false
    pages: string[] = []
    actions: string[] = []
    isDev: boolean

    constructor() {
        this.start = Date.now()
        this.init()
    }

    init() {
        lifecycle.addEventListener("statechange", this.handleLifeCycle)
        //addEventListener("popstate", this.handleLifeCycle)
        addEventListener("beforeunload", this.handleLifeCycle)
        this.isDev = window.location.hostname === "localhost"
    }

    handleLifeCycle = (event: any) => {
        if (this.isDestroyed) return

        if (event?.type === "beforeunload") {
            // used for the page back button as popstate is not triggered
            if (this.isDestroyed) return
            this.isDestroyed = true
            this.sendBeacon()
        } else if (event?.newState === "terminated" || event?.newState === "discarded") {
            if (this.isDestroyed) return
            this.sendBeacon()
            this.isDestroyed = true
        }
    }

    sendBeacon() {
        const obj = {
            lang: navigator.language,
            pages: this.pages,
            actions: this.actions,
        }
        const blob = new Blob([btoa(JSON.stringify(obj))], { type: "application/json" })
        navigator.sendBeacon(env.metrics, blob)
    }

    addPage(page: string) {
        this.pages.push(page)
    }

    addAction(action: string) {
        this.actions.push(action)
    }

    reset() {
        this.pages = []
        this.actions = []
    }
}

const session = new SessionMetrics()
export { session, SessionMetrics }
