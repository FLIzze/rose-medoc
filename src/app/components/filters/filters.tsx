import { othersAtom, ownAtom, taggedAtom } from "@/app/atom";
import { useAtom } from "jotai";

export default function Filters() {
    const [own, setOwn] = useAtom(ownAtom);
    const [tagged, setTagged] = useAtom(taggedAtom);
    const [others, setOthers] = useAtom(othersAtom);

    return (
        <div className="text-sm text-dark-pink">
            <div className="flex gap-2">
                <input
                    type="checkbox"
                    id="own"
                    onClick={() => setOwn(!own)}
                    className="accent-dark-pink"
                    checked={own}
                />
                <label htmlFor="own" className="select-none">Personnel</label>
            </div>
            <div className="flex gap-2">
                <input
                    type="checkbox"
                    id="tagged"
                    onClick={() => setTagged(!tagged)}
                    className="accent-dark-pink"
                    checked={tagged}
                />
                <label htmlFor="tagged" className="select-none">Participante</label>
            </div>
            <div className="flex gap-2">
                <input
                    type="checkbox"
                    id="others"
                    className="accent-dark-pink"
                    onClick={() => setOthers(!others)}
                    checked={others}
                />
                <label htmlFor="others" className="select-none">Autre</label>
            </div>
        </div>
    );
}