import lifecycle from "page-lifecycle"

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
        addEventListener("beforeunload", this.handleLifeCycle)
        this.isDev = window.location.hostname === "localhost"
    }

    handleLifeCycle = (event: any) => {
        if (this.isDestroyed) return

        if (event?.newState === "hidden") {
            this.sendBeacon()
            this.reset()
        }

        if (event?.newState === "terminated" || event?.newState === "discarded") {
            this.sendBeacon()
            this.isDestroyed = true
        } else if (event?.type === "beforeunload") {
            // used for the page back button as popstate is not triggered
            this.isDestroyed = true
            this.sendBeacon()
        }
    }

    url() : string {
        return this.isDev ? "http://localhost:4005/wt" : "https://api.vildawebben.dev/cc/wt"
    }
    sendBeacon() {
        const obj = {
            lang: navigator.language,
            pages: this.pages,
            actions : this.actions,
        }
        const blob = new Blob([btoa(JSON.stringify(obj))], { type: "application/json" })
        navigator.sendBeacon(this.url(), blob)
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
