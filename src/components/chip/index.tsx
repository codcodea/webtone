
import { isSelectedState } from "~/lib/ls"

type WebtoneChipProps = {
    code: string
    rgb: string
    i: () => number
}

const WebtoneChip = (props: WebtoneChipProps) => {
    return (
        <div
            class={
                "relative chip mt-2 flex h-28 w-28 flex-col border transition-shadow duration-150 hover:border-2 hover:shadow-lg"
            }
            data-webtone={props.code}
            data-index={props.i()}
        >
            <div
                class={"w-full flex-1"}
                style={{
                    "background-color": props.rgb,
                }}
            ></div>
            <div class="flex h-1/3 flex-col items-start justify-center bg-white p-1">
                <p class="text-[10px]">WEBTONE</p>
                <p class="text-[10px]">{props.code}</p>
            </div>
            <input type="checkbox" class="absolute bottom-1 right-1 h-4 w-4 border-neutral-200 text-sm uppercase" checked={isSelectedState().has(props.code)}>
                <span class="z-30 select-none text-xs uppercase tracking-wide text-white opacity-100">+</span>
            </input>
        </div>
    )
}

export default WebtoneChip