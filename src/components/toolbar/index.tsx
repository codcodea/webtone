import { A, useLocation } from "@solidjs/router"

const Toolbar = () => {
    return (
        <div class="flex justify-center items-center gap-6 h-full w-full z-50">
            <A href="/">Home</A>
            <A href="/spectra">Spectra</A>
            <A href="/user">Canvas</A>
        </div>
    )
}

export default Toolbar
