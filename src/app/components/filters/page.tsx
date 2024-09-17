import { Dispatch, SetStateAction } from "react"

interface FiltersProps {
    own: boolean,
    tagged: boolean,
    setOwn: Dispatch<SetStateAction<boolean>>,
    setTagged: Dispatch<SetStateAction<boolean>>,
    others: boolean,
    setOthers: Dispatch<SetStateAction<boolean>>
}

export default function Filters({ own, tagged, setOwn, setTagged, others, setOthers }: FiltersProps) {
    return (
        <div className="ml-4 text-sm">
            <hr className="mb-5" />

            <div className="flex gap-2">
                <input
                    type="checkbox"
                    id="own"
                    onClick={() => setOwn(!own)}
                    defaultChecked
                />
                <label htmlFor="own" className="select-none">Personnel</label>
            </div>
            <div className="flex gap-2">
                <input
                    type="checkbox"
                    id="tagged"
                    onClick={() => setTagged(!tagged)}
                    defaultChecked
                />
                <label htmlFor="tagged" className="select-none">Tagged</label>
            </div>
            <div className="flex gap-2">
                <input
                    type="checkbox"
                    id="others"
                    onClick={() => setOthers(!others)}
                />
                <label htmlFor="others" className="select-none">Others</label>
            </div>
        </div>
    )
}