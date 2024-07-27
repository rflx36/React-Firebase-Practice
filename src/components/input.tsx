


export default function Input(props: { name: string, value: string | number, uponChange: (x: any) => void }) {

    return (
        <>
            <label>{props.name}: </label>
            <input
                type="text"
                value={props.value}
                className=" outline-1 outline-cyan-400 rounded-full pl-4  py-1 m-2 bg-neutral-200"
                onChange={(e) => { props.uponChange(e.currentTarget.value) }}
            />
        </>
    )
}