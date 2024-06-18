/* @refresh reload */
import { render } from "solid-js/web"
import { Router, Route } from "@solidjs/router"
import { lazy } from "solid-js"

// import Home from './dev/home'
import Webtone from "./pages/webtone"
import Layout from "./pages/layout"
const User = lazy(() => import("./pages/user"))
const Spectra = lazy(() => import("./pages/spectra"))
const DownloadsPage = lazy(() => import("./pages/downloads"))
const Picker = lazy(() => import("./pages/picker"))
const Match = lazy(() => import("./pages/matching"))
import FAQ from "./pages/faq"

import "./lib/session"

const root = document.getElementById("root")
render(
    () => (
        <Router root={Layout}>
            <Route path="/" component={Webtone} />
            <Route path="/spectra" component={Spectra} />
            <Route path="/canvas" component={User} />
            <Route path="/picker" component={Picker} />
            <Route path="/downloads" component={DownloadsPage} />
            <Route path="/inspiration" component={Match} />
            <Route path="/faq" component={FAQ} />
            {/* <Route path="/pdf" component={PDF} /> */}
        </Router>
    ),
    root!
)
