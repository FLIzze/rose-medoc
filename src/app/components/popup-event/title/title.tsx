import { SetStateAction } from "jotai"
import Image from "next/image"
import { Dispatch } from "react"

interface TitleProps {
    title: string
    setTitle: Dispatch<SetStateAction<string>>
}

export default function Title({ title, setTitle }: Readonly<TitleProps>) {
    return (
        <>
            <div className="bg-light-pink flex items-center justify-center p-2">
                <label htmlFor="title">
                    <Image
                        src="/title.png"
                        alt="title"
                        className='mx-3'
                        width={20}
                        height={20}
                    />
                </label>
            </div>
            <div>
                <input
                    type="text"
                    placeholder='Ajouter un titre'
                    className='h-9 outline-none p-2 mt-2 w-full transition-all text-medium-pink text-xl border-very-light-pink focus:border-medium-pink font-bold border-b-2 focus:border-b-4'
                    value={title}
                    id="title"
                    autoComplete="off"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <p className="text-xs text-red hidden" id="required-title">Titre obligatoire.</p>
            </div>
        </>
    )
}