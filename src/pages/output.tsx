import { chips } from "~/state/webtone"
import WebtoneChip from "~/components/chip"
import { Accessor, createEffect } from "solid-js"

type OutputProps = {
    palette: Accessor<number[][]>
}

const Output = (props : OutputProps) => {
 
    createEffect(() => {
        //console.log(props.palette())
    })

    return (
        <>
             <Tripple palette={props.palette} />
        </>
    )
}

export default Output

type TrippleProps = {
    palette: Accessor<number[][]>
}

const Tripple = (props: TrippleProps) => {
    if(props.palette() == null) return null

    return (
        <div class="mt-4 flex justify-center gap-2">
            <WebtoneChip
                chip={chips()[props.palette()[0][0]].arr[props.palette()[0][1]]}
                big={true}
                index={0}
                hasSelect={false}
            />
            <WebtoneChip
                chip={chips()[props.palette()[1][0]].arr[props.palette()[1][1]]}
                big={true}
                index={0}
                hasSelect={false}
            />
            <WebtoneChip
                chip={chips()[props.palette()[2][0]].arr[props.palette()[2][1]]}
                big={true}
                index={0}
                hasSelect={false}
            />
        </div>
    )
}
