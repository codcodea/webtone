import { onMount, Show } from "solid-js"
import Toolbar from "~/components/toolbar/index.tsx"
import { useLocation } from "@solidjs/router"
import { initColors } from "~/lib/ls/index.tsx"
import { cn } from "~/lib/merge"

// --------------------------------------------------------

type LayoutProps = {
    children?: any
}

const Layout = (props: LayoutProps) => {
    const location = useLocation()
    let toolbarRef: HTMLDivElement
    let header: HTMLDivElement

    onMount(() => {
        initColors()
    })

    return (
        <>
            <div
                ref={header}
                id="header"
                class={cn(
                    "opacity-1 invisible h-16 transition-all duration-200 lg:visible lg:block lg:shadow border-b border-neutral-300  bg-white",
                    location.pathname != "/user" ? "sticky top-0 z-10 " : ""
                )}
            >
                <header class="container mx-auto flex h-full max-w-5xl flex-col items-center justify-start ">
                    <Show when={location.pathname != "/tool"}>
                        <Toolbar ref={toolbarRef} />
                    </Show>
                </header>
            </div>
            {props.children}
        </>
    )
}

export default Layout
