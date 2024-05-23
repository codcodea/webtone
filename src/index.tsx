/* @refresh reload */
import { render } from "solid-js/web"
import { Router, Route } from "@solidjs/router"

// import Home from './dev/home'
import Webtone from "./pages/webtone"
import User from "./pages/user"
import Layout from "./pages/layout"

const root = document.getElementById("root")
render(
    () => (
        <Router root={Layout}>
            <Route path="/" component={Webtone} />
            <Route path="/user" component={User} />
        </Router>
    ),
    root!
)
