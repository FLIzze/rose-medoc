import { Dispatch, SetStateAction } from "react"

interface TitleProps {
    title: string,
    setTitle: Dispatch<SetStateAction<string>>
}

export default function Title({ title, setTitle }: TitleProps) {
    return (
        <div>
            <div className="pl-10">
                <input
                    type="text"
                    placeholder='Ajouter un titre'
                    className='border-b border-light-pink outline-none text-xl h-9 transition-all w-80 mb-2 placeholder:text-dark-pink focus:border-medium-pink focus:border-b-2'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <p className="text-xs text-red-500 hidden" id="required-title">Titre obligatoire.</p>
        </div>
    )
}