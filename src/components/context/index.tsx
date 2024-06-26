import { createEffect, Show } from "solid-js"

import {
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuGroup,
    ContextMenuGroupLabel,
    ContextMenuItem,
    ContextMenuPortal,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from "~/components/ui/context-menu"

import {
    showColor,
    showName,
    setShowColor,
    setShowName,
    showHex,
    setShowHex,
    showLum,
    setShowLum,
} from "~/state/contextmenu"

import { isRightClick } from "~/state/contextmenu"
import { session } from "~/lib/session"

import { setClonePatternBackground, isClonePatternBackground } from "~/lib/ls"
import { setLuminance } from "colorjs.io/fn"

function ContextMenuDemo(props) {
    const handleZup = () => {
        const id = isRightClick()
        props.handleCloneSort(id, "up")
    }

    const handleZDown = () => {
        const id = isRightClick()
        props.handleCloneSort(id, "down")
    }

    createEffect(() => {
        isRightClick() && session.addAction("cx")
    })

    return (
        <ContextMenu>
            <ContextMenuTrigger class="">{props.children}</ContextMenuTrigger>
            <ContextMenuPortal>
                <ContextMenuContent class="w-48">
                    <ContextMenuItem onClick={props.handleDelete}>
                        <span>Delete</span>
                    </ContextMenuItem>

                    <Show when={props.showZ}>
                        <ContextMenuSeparator />
                        <ContextMenuItem onClick={handleZup}>
                            <span>Bring Forward</span>
                        </ContextMenuItem>

                        <ContextMenuItem onClick={handleZDown}>
                            <span>Send Backward</span>
                        </ContextMenuItem>
                    </Show>

                    <ContextMenuSeparator />

                    <ContextMenuCheckboxItem checked={showColor()} onChange={setShowColor}>
                        Show Color Code
                    </ContextMenuCheckboxItem>
                    <ContextMenuCheckboxItem checked={showName()} onChange={setShowName}>
                        Show Color Name
                    </ContextMenuCheckboxItem>
                    <ContextMenuCheckboxItem checked={showHex()} onChange={setShowHex}>
                        Show Hex
                    </ContextMenuCheckboxItem>
                    <ContextMenuCheckboxItem checked={showLum()} onChange={setShowLum}>
                        Show Luminocity
                    </ContextMenuCheckboxItem>
                    <ContextMenuCheckboxItem checked={isClonePatternBackground(isRightClick())} onChange={() => setClonePatternBackground(isRightClick())}>
                       Pattern Background
                    </ContextMenuCheckboxItem>
                </ContextMenuContent>
            </ContextMenuPortal>
        </ContextMenu>
    )
}

export default ContextMenuDemo
