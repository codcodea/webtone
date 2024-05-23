import {
    DragDropProvider,
    DragDropSensors,
    DragOverlay,
    createDraggable,
    SortableProvider,
    createSortable,
    createDroppable,
    closestCenter,
    DragEventHandler,
    useDragDropContext,
} from "@thisbeyond/solid-dnd"

import interact from "interactjs"
import { cn } from "../lib/merge/index.ts"

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
} from "../lib/ls/index.tsx"

import { createEffect, createSignal, For, onMount, untrack, Show } from "solid-js"
import type { Clone } from "../lib/ls/index.tsx"

import ContextMenuDemo from "../components/context/index.tsx"
import { isRightClick, setIsRightClick, showColor, showName } from "../state/contextmenu"

type Position = {
    x: number
    y: number
}

const sortableStyle =
    "text-black flex flex-col items-center justify-center w-20 h-20 border select-none cursor-pointer transition-scale transform duration-300 ease-in-out"

const cloneStyle = "absolute w-20 h-20 flex flex-col border-neutral-400 resizable border shadow-md text-black z-0"

// --------------------------------------------------------

const User = () => {
    let leftColumn: HTMLDivElement
    let workarea: HTMLDivElement

    // Sortable and clone states
    const cIds = () => getColorsState().map((c) => c.name)

    // Overlay temp position
    const [overlayPos, setOverlayPos] = createSignal<Position>({ x: 0, y: 0 })
    untrack(overlayPos)

    // Get initial state from local storage
    onMount(() => {
        setClones(getClonesLS())
    })

    // Save state to local storage
    createEffect(() => {
        addClonesLS(clones())
        saveColorSortLS(getColorsState())
    })

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
                    color: draggable.data.color,
                    width: 220 + "px",
                    height: 220 + "px",
                    name: draggable.data.name,
                } as Clone

                setClones([...clones(), clone])
            }
        } else if (draggable && droppable) {
            const cSort = getColorsState()
            const fIndex = cSort.findIndex((c) => c.color === draggable.data.color)
            const tIndex = cSort.findIndex((c) => c.color === droppable.data.color)

            if (fIndex !== tIndex) {
                const updatedSort = cSort.slice()
                updatedSort.splice(tIndex, 0, ...updatedSort.splice(fIndex, 1))
                setColorsState(updatedSort)
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

    const handleTrash = () => {
        clearColorsLS()
        setColorsState([])
        setClones([])
    }

    const handleDelete = (e) => {
        const id = isRightClick() // rgbString
        if (id.includes("clone-")) {
            setClones((prev) => prev.filter((clone) => clone.id !== id))
        } else if (id) {
            setClones((prev) => prev.filter((clone) => clone.color !== id))
            isSelectedState().delete(getColorsState().find((c) => c.color === id).name)
            setColorsState((prev) => prev.filter((color) => color.color !== id))
        }
    }

    const handleCloneSort = (id: string, dir: string) => {
        setClones((prev: Clone[]) => {
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
                <DragDropProvider onDragEnd={onDragEnd} onDragMove={onDragMove} collisionDetector={closestCenter}>
                    <DragDropSensors />

                    <section
                        ref={leftColumn}
                        class="scrollbar-hide col-span-2 mx-auto h-full w-full overflow-auto border-none py-12 outline-none flex flex-col items-center justify-start"
                    >
                        <ContextMenuDemo handleDelete={handleDelete} handleCloneSort={handleCloneSort} showZ={false}>
                            <div class="space-y-3 ">
                                <SortableProvider ids={cIds()}>
                                    <For each={getColorsState()}>{(item) => <ColorCard {...item} />}</For>
                                </SortableProvider>
                            </div>
                        </ContextMenuDemo>
                        <DragOverlay>
                            {(draggable) => (
                                <div
                                    id="overlay"
                                    class={cloneStyle}
                                    style={{ "background-color": draggable?.data.color }}
                                >
                                    <div class="flex flex-1 items-center justify-center"></div>
                                    {/* <div class="hidden z-50 flex h-1/4 w-full flex-col items-center justify-center bg-white px-2.5 text-base">
                                        <p class="text-xs uppercase">{draggable?.data.color}</p>
                                    </div> */}
                                </div>
                            )}
                        </DragOverlay>
                        <div class="absolute bottom-4 left-[5.5%] flex h-12 w-16 items-center justify-center ">
                            <button
                                class="z-20 h-6 w-24 border border-neutral-400 text-sm uppercase shadow"
                                style={{ "background-color": "rgba(0,0,0,0.2)" }}
                                onClick={handleTrash}
                            >
                                <span class="z-30 select-none text-xs uppercase tracking-wide text-neutral-700 opacity-100">
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

                            <Show when={clones().length == 0 && cIds().length > 0}>
                                <div class="absolute left-1/2 top-1/2 flex h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center border border-dashed border-neutral-400 px-12 text-center text-2xl">
                                    <p class="mb-2 text-xl text-neutral-800">Drop Zone</p>
                                    <p class="text-lg text-neutral-600">Use handle ro resize and rearrange chips.</p>
                                    <p class="text-lg text-neutral-600">Right-click for options (delete).</p>
                                </div>
                            </Show>
                        </DropZone>
                    </section>
                </DragDropProvider>
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
type ColorCardProps = {
    name: string
    color: string
}

const ColorCard = (props: ColorCardProps) => {
    const sortable = createSortable(props.name, { color: props.color, name: props.name })
    const [state] = useDragDropContext()
    return (
        <div
            use:sortable
            class={cn(
                sortableStyle,
                sortable.isActiveDraggable && "opacity-25",
                !!state.active.draggable && "transition-transform"
            )}
            onContextMenu={() => setIsRightClick(props.color)}
            style={{ "background-color": props.color }}
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
    const DraggableClone = (props: Clone) => {
        return (
            <div
                id={props.id}
                data-dx={props.dx}
                data-dy={props.dy}
                class={cloneStyle}
                style={{
                    "background-color": props.color,
                    transform: `translate(${props.dx}px, ${props.dy}px)`,
                    width: props.width,
                    height: props.height,
                }}
                onContextMenu={() => setIsRightClick(props.id)}
            >
                <div class="flex flex-1 items-center justify-center"></div>
                <div
                    class={cn(
                        "flex w-full flex-col items-start justify-center bg-white px-2.5 text-base",
                        showColor() || showName() ? "py-1.5" : "py-0"
                    )}
                >
                    <Show when={showColor()}>
                        <p class="text-base uppercase">WEBTONE</p>
                    </Show>
                    <Show when={showName()}>
                        <p class="truncate text-sm">{props.name}</p>
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

                        props.setClones((prev: Clone[]) => {
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
                        props.setClones((prev: Clone[]) => {
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
