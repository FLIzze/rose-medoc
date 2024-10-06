import Image from "next/image"
import { Dispatch, SetStateAction } from "react"

interface DescriptionProps {
    description: string
    setDescription: Dispatch<SetStateAction<string>>
}

export default function Description({ description, setDescription }: Readonly<DescriptionProps>) {
    return (
        <>
            <div className="bg-light-pink flex items-center justify-center p-4">
                <Image
                    src="/description.png"
                    alt="description"
                    className='mx-3'
                    height={18}
                    width={18}
                />
            </div>
            <input
                placeholder='Ajouter une description'
                className='outline-none pl-2 mt-2 w-full resize-none h-9 focus:border-b-2 border-medium-pink transition-all text-medium-pink'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
        </>
    )
}