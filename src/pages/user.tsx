import {
    DragDropProvider,
    DragDropSensors,
    DragOverlay,
    createDraggable,
    SortableProvider,
    createSortable,
    createDroppable,
    closestCenter,
    mostIntersecting,
    DragEventHandler,
    useDragDropContext,
} from "@thisbeyond/solid-dnd"

import interact from "interactjs"
import { cn } from "../lib/merge/index.ts"
import { handlePaletteKeys } from "./handlers/index.tsx"

import PatternPortal from "~/components/pattern/index.tsx"
import { tooltips } from "~/state/tooltips.tsx"

import {
    clearColorsLS,
    getColorsState,
    setColorsState,
    saveColorSortLS,
    addClonesLS,
    getClonesLS,
    isSelectedState,
    clones,
    setClones,
    handleClearUnused,
} from "../lib/ls/index.tsx"

import { createEffect, createSignal, For, onMount, untrack, Show } from "solid-js"
import type { WebtoneItemClone } from "../lib/ls/index.tsx"
import type { WebtoneItem } from "../state/webtone.tsx"
import { handleClearAll } from "../lib/ls/index.tsx"

import ContextMenuDemo from "../components/context/index.tsx"
import { isRightClick, setIsRightClick, showColor, showName, showHex, showLum } from "../state/contextmenu"

import { session } from "../lib/session/index.tsx"
import { textColor } from "~/handlers/color/index.tsx"

type Position = {
    x: number
    y: number
}

const sortableStyle =
    "text-black flex flex-col items-center justify-center w-20 h-20 border select-none cursor-pointer transition-scale transform duration-300 ease-in-out"

const cloneStyle = "absolute w-20 h-20 flex flex-col border-neutral-400 resizable border shadow-md text-black z-0"

// --------------------------------------------------------

const User = () => {
    const [isPortal, setPortal] = createSignal(false)

    let leftColumn: HTMLDivElement
    let workarea: HTMLDivElement

    // Sortable and clone states
    const cIds = () => getColorsState().map((c) => c.code)

    // Overlay temp position
    const [overlayPos, setOverlayPos] = createSignal<Position>({ x: 0, y: 0 })
    untrack(overlayPos)

    // Get initial state from local storage
    onMount(() => {
        setClones(getClonesLS())
        session.addPage("pu")
    })

    // Save state to local storage
    createEffect(() => {
        addClonesLS(clones())
        saveColorSortLS(getColorsState())
        isPortal() ? addKeys() : removeKeys()
    })

    const { addKeys, removeKeys } = handlePaletteKeys(setPortal)

    // onDragEnd
    // - Clone the Sortable if over Droppable
    // - Swap Sortables if over Sortable
    const onDragEnd = ({ draggable, droppable, overlay }) => {
        if (droppable.id === 99) {
            const clone = draggable.node.cloneNode(true)
            if (clone) {
                const id = (Math.random() * 10000).toFixed(0)

                const clone = {
                    id: "clone-" + id,
                    dx: overlayPos().x,
                    dy: overlayPos().y,
                    width: 220 + "px",
                    height: 220 + "px",
                    isBackground: false,
                    ...draggable.data,
                } as WebtoneItemClone

                if (clones().length == 0) {
                    clone.isBackground = true
                }

                setClones([...clones(), clone])
                session.addAction("dr")
            }
        } else if (draggable && droppable) {
            const cSort = getColorsState()
            const fIndex = cSort.findIndex((c) => c.code === draggable.data.code)
            const tIndex = cSort.findIndex((c) => c.code === droppable.data.code)

            if (fIndex !== tIndex) {
                const updatedSort = cSort.slice()
                updatedSort.splice(tIndex, 0, ...updatedSort.splice(fIndex, 1))
                setColorsState(updatedSort)
                session.addAction("so")
            }
        }
    }

    // onDragMoce
    // - stores the overlay position
    const onDragMove = ({ draggable, droppable, overlay }) => {
        if (!overlay) return

        // Right click context is in the middle of workarea
        // Drop the overlay in the middle of the workarea + offset
        const overlayRect = overlay.node.getBoundingClientRect()
        const overlayWidth = overlayRect.width

        setOverlayPos({
            x: overlayRect.x - leftColumn.getBoundingClientRect().width - overlayWidth / 2,
            y: overlayRect.y - 100,
        })
    }

    const handleTrash = (e) => {
        const isShift = e.shiftKey
        if (isShift) {
            handleClearUnused()
        } else {
            handleClearAll()
        }
    }

    const handleDelete = (e) => {
        const id = isRightClick() // rgbString
        if (id.includes("clone-")) {
            setClones((prev) => prev.filter((clone) => clone.id !== id))
            session.addAction("dl")
        } else if (id) {
            setClones((prev) => prev.filter((clone) => clone.code !== id))
            isSelectedState().delete(getColorsState().find((c) => c.code === id).code)
            setColorsState((prev) => prev.filter((color) => color.code !== id))
            session.addAction("dl")
        }
    }

    const handleCloneSort = (id: string, dir: string) => {
        setClones((prev: WebtoneItemClone[]) => {
            const index = prev.findIndex((c) => c.id === id)
            const clone = prev[index]
            const newIndex = dir === "up" ? index + 1 : index - 1
            const newClones = prev.slice()
            newClones.splice(index, 1)
            newClones.splice(newIndex, 0, clone)
            return newClones
        })
    }

    return (
        <>
            <AltMain />
            <main class="scrollbar-hide content-area hidden grid-cols-12 overflow-hidden lg:visible lg:grid">
                <DragDropProvider onDragEnd={onDragEnd} onDragMove={onDragMove} collisionDetector={mostIntersecting}>
                    <DragDropSensors />

                    <section
                        ref={leftColumn}
                        class="scrollbar-hide col-span-2 mx-auto flex h-full w-full flex-col items-center justify-start overflow-auto border-none py-12 outline-none"
                    >
                        <ContextMenuDemo handleDelete={handleDelete} handleCloneSort={handleCloneSort} showZ={false}>
                            <div class="space-y-3 ">
                                <SortableProvider ids={cIds()}>
                                    <For each={getColorsState()}>{(chip) => <WebtoneSortDraggable chip={chip} />}</For>
                                </SortableProvider>
                            </div>
                        </ContextMenuDemo>
                        <DragOverlay>
                            {(draggable) => (
                                <div
                                    id="overlay"
                                    class={cloneStyle}
                                    style={{ "background-color": draggable?.data.rgbString }}
                                >
                                    <div class="flex flex-1 items-center justify-center"></div>
                                    {/* <div class="hidden z-50 flex h-1/4 w-full flex-col items-center justify-center bg-white px-2.5 text-base">
                                        <p class="text-xs uppercase">{draggable?.data.color}</p>
                                    </div> */}
                                </div>
                            )}
                        </DragOverlay>
                        <div
                            class={cn(
                                "absolute bottom-12 left-[5.5%] flex h-12 w-16 items-center justify-center transition-opacity duration-1000 ease-in-out",
                                clones().length > 1 && clones().length < 6 ? "opacity-100" : "opacity-0"
                            )}
                        >
                            <button
                                class="z-20 h-6 w-24 border border-neutral-800 text-sm uppercase shadow"
                                onClick={setPortal}
                                disabled={clones().length < 2}
                            >
                                <span
                                    title="drop at least two colors"
                                    class="z-30 select-none text-xs uppercase tracking-wide text-neutral-800 opacity-100 hover:shadow"
                                >
                                    Pattern
                                </span>
                            </button>
                        </div>
                        <div class="absolute bottom-4 left-[5.5%] flex h-12 w-16 items-center justify-center ">
                            <button
                                class="z-20 h-6 w-24 border border-neutral-800 text-sm uppercase shadow"
                                onClick={handleTrash}
                            >
                                <span
                                    title="shift-click remove unused"
                                    class="z-30 select-none text-xs uppercase tracking-wide text-neutral-800 opacity-100 hover:shadow"
                                >
                                    Clear
                                </span>
                            </button>
                        </div>
                    </section>

                    <section class="col-span-10 h-full w-full">
                        <DropZone ref={workarea}>
                            <ContextMenuDemo handleDelete={handleDelete} handleCloneSort={handleCloneSort} showZ>
                                <Workarea clones={clones()} setClones={setClones} />
                            </ContextMenuDemo>
                            <Show when={cIds().length == 0 && clones().length == 0}>
                                <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center text-2xl">
                                    <p class="text-xl text-neutral-600">Your saved colors will appear here!</p>
                                </div>
                            </Show>

                            <Show when={clones().length == 0 && cIds().length > 0 && tooltips()}>
                                <section class="absolute left-1/2 top-1/2 mt-12 flex h-1/2 w-full -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center">
                                    <article class="w-3/5 bg-neutral-50 px-10 py-8 text-neutral-800 shadow-md">
                                        <p class="my-2 text-base">
                                            The Canvas is a workspace for color matching and palette creation. Utilize
                                            the Palette button for quick palette referencing when it appears.
                                        </p>
                                        <ul class="list-inside list-disc">
                                            <li class="">
                                                <strong>Add colors:</strong> Drag and drop colors onto the canvas.
                                            </li>
                                            <li class="">
                                                <strong>Adjust:</strong> Drag and resize color chips as needed.
                                            </li>
                                            <li class="">
                                                <strong>Options:</strong> Right-click a color for more options.
                                            </li>
                                            <li class="">
                                                <strong>Clear Canvas:</strong> Click CLEAR to reset the canvas.
                                                Shift-click to remove only unused colors.
                                            </li>
                                            <li class="">
                                                <strong>Palette Button:</strong> Add 2-6 colors to enable the Palette
                                                button.
                                            </li>
                                            <li class="">
                                                <strong>Background Color:</strong> Right-click to select a palette
                                                background color.
                                            </li>
                                        </ul>
                                    </article>
                                </section>
                            </Show>
                        </DropZone>
                    </section>
                </DragDropProvider>

                <Show when={isPortal()}>
                    <PatternPortal setPortal={setPortal} />
                </Show>
            </main>
        </>
    )
}

// DropZone is the area where the Sortables can be dropped
type DropZoneProps = {
    ref: any
    children: any
}

const DropZone = (props: DropZoneProps) => {
    const droppable = createDroppable(99)
    return (
        <article
            ref={props.ref}
            use:droppable
            class={cn("relative h-full w-full border-l", droppable.isActiveDroppable && "!droppable-accept")}
        >
            {props.children}
        </article>
    )
}

// ColorCard is the draggable (sortable) item
type DrProps = {
    chip: WebtoneItem
}

const WebtoneSortDraggable = (props: DrProps) => {
    const sortable = createSortable(props.chip.code, props.chip)
    const [state] = useDragDropContext()
    return (
        <div
            use:sortable
            class={cn(
                sortableStyle,
                sortable.isActiveDraggable && "opacity-25",
                !!state.active.draggable && "transition-transform"
            )}
            onContextMenu={() => setIsRightClick(props.chip.code)}
            style={{ "background-color": props.chip.rgbString }}
        ></div>
    )
}

// Workarea is the area where the Sortables are dropped
type WorkareaProps = {
    setClones: any
    clones: any
}

const Workarea = (props: WorkareaProps) => {
    // A clone is made instead of moving the Sortable
    // The clone is then draggable and resizable
    // And stored in state and local storage
    const DraggableClone = (props: WebtoneItemClone) => {
        const style = { color: textColor(props.hex) }
        return (
            <div
                id={props.id}
                data-dx={props.dx}
                data-dy={props.dy}
                class={cloneStyle}
                style={{
                    "background-color": props.rgbString,
                    transform: `translate(${props.dx}px, ${props.dy}px)`,
                    width: props.width,
                    height: props.height,
                }}
                onContextMenu={() => setIsRightClick(props.id)}
            >
                <div class="flex flex-1 flex-col items-center justify-center">
                    <Show when={showHex()}>
                        <p style={style}>{props.hex}</p>
                    </Show>
                    <Show when={showLum()}>
                        <p style={style}>{props.lum}</p>
                    </Show>
                </div>
                <div
                    class={cn(
                        "flex w-full flex-col items-start justify-center bg-white px-2.5 text-base",
                        showColor() || showName() ? "py-1.5" : "py-0"
                    )}
                >
                    <Show when={showName()}>
                        <p class="text-base uppercase">WEBTONE</p>
                    </Show>
                    <Show when={showColor()}>
                        <p class="truncate text-sm">{props.code}</p>
                    </Show>
                </div>
            </div>
        )
    }

    // Set up the draggable and resizable instances
    onMount(() => {
        interact(".resizable")
            .draggable({
                listeners: {
                    start(event) {
                        //console.log(event.type, event.target)
                    },
                    move(event) {
                        let x = parseFloat(event.target.dataset.dx) || 0
                        let y = parseFloat(event.target.dataset.dy) || 0

                        x += event.dx
                        y += event.dy

                        event.target.style.transform = `translate(${x}px, ${y}px)`

                        event.target.dataset.dx = x
                        event.target.dataset.dy = y
                    },
                    end(event) {
                        const translate = event.target.style.transform
                        const x = parseFloat(translate.split(",")[0].split("(")[1])
                        const y = parseFloat(translate.split(",")[1].split(")")[0])

                        props.setClones((prev: WebtoneItemClone[]) => {
                            return prev.map((c) => {
                                if (c.id == event.target.id) {
                                    c.dx = x
                                    c.dy = y
                                }
                                return c
                            })
                        })
                    },
                },
            })
            .resizable({
                edges: { left: false, right: true, bottom: true, top: false },
                listeners: {
                    move(event) {
                        let x = event.target.dataset.x
                        let y = event.target.dataset.y

                        x = (parseFloat(x) || 0) + event.deltaRect.left
                        y = (parseFloat(y) || 0) + event.deltaRect.top

                        Object.assign(event.target.style, {
                            width: `${event.rect.width}px`,
                            height: `${event.rect.height}px`,
                        })
                        Object.assign(event.target.dataset, { x, y })
                    },
                    end(event) {
                        props.setClones((prev: WebtoneItemClone[]) => {
                            return prev.map((c) => {
                                if (c.id == event.target.id) {
                                    c.width = event.target.style.width
                                    c.height = event.target.style.height
                                }
                                return c
                            })
                        })
                    },
                },
            })
    })

    return (
        <>
            <For each={props.clones}>{(c) => <DraggableClone {...c} />}</For>
        </>
    )
}

const AltMain = () => {
    return (
        <main class="content-area flex flex-col items-center justify-center lg:hidden">
            <img
                class="w-1/2 object-contain"
                src="https://playbackonline.ca/wp/wp-content/uploads/2016/05/Cracke.jpg"
                alt="Cracke"
            />
            <p class="mt-2"> Chips needs space, like me! </p>
        </main>
    )
}

export default User
