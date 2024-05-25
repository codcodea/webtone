import "./oswald.css"

type OswaldProps = {
    handleOswaldClick: (e: MouseEvent) => void
}

const Oswald = (props: OswaldProps) => {
    return (
        <div class="oswald-spectrum" onClick={props.handleOswaldClick}>
            <div data-index="0" class="dot dot-1"></div>
            <div data-index="1" class="dot dot-1-1"></div>
            <div data-index="2" class="dot dot-1-2"></div>
            <div data-index="3" class="dot dot-1-3"></div>
            <div data-index="4" class="dot dot-1-4"></div>

            <div data-index="5" class="dot dot-2"></div>
            <div data-index="6" class="dot dot-2-1"></div>
            <div data-index="7" class="dot dot-2-2"></div>
            <div data-index="8" class="dot dot-2-3"></div>
            <div data-index="9" class="dot dot-2-4"></div>

            <div data-index="10" class="dot dot-3"></div>
            <div data-index="11" class="dot dot-3-1"></div>
            <div data-index="12" class="dot dot-3-2"></div>
            <div data-index="13" class="dot dot-3-3"></div>
            <div data-index="14" class="dot dot-3-4"></div>

            <div data-index="15" class="dot dot-4"></div>
            <div data-index="16" class="dot dot-4-1"></div>
            <div data-index="17" class="dot dot-4-2"></div>
            <div data-index="18" class="dot dot-4-3"></div>
            <div data-index="19" class="dot dot-4-4"></div>

            <div data-index="20" class="dot dot-5"></div>
            <div data-index="21" class="dot dot-5-1"></div>
            <div data-index="22" class="dot dot-5-2"></div>
            <div data-index="23" class="dot dot-5-3"></div>
            <div data-index="24" class="dot dot-5-4"></div>

            <div data-index="25" class="dot dot-6"></div>
            <div data-index="26" class="dot dot-6-1"></div>
            <div data-index="27" class="dot dot-6-2"></div>
            <div data-index="28" class="dot dot-6-3"></div>
            <div data-index="29" class="dot dot-6-4"></div>

            <div data-index="30" class="dot dot-7"></div>
            <div data-index="31" class="dot dot-7-1"></div>
            <div data-index="32" class="dot dot-7-2"></div>
            <div data-index="33" class="dot dot-7-3"></div>
            <div data-index="34" class="dot dot-7-4"></div>

            <div data-index="35" class="dot dot-8"></div>
            <div data-index="36" class="dot dot-8-1"></div>
            <div data-index="37" class="dot dot-8-2"></div>
            <div data-index="38" class="dot dot-8-3"></div>
            <div data-index="39" class="dot dot-8-4"></div>
        </div>
    )
}

export default Oswald
