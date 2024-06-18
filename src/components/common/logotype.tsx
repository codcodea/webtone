
import { A } from "@solidjs/router"

const Logotype = () => {
    return (
        <div class="text-md relative w-28">
            <A class="ml-4 text-neutral-800 font-bold" href="/">
                WEBTONE
            </A>
            <div class="absolute -top-[4px] left-0 h-8 w-2 overflow-hidden">
                <span class="absolute top-1 h-[24px] w-2 bg-[#181818]" />
            </div>
        </div>
    )
}

export default Logotype