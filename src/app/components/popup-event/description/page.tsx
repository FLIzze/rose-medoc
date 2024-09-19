import { Dispatch, SetStateAction } from "react"

interface DescriptionProps {
    description: string,
    setDescription: Dispatch<SetStateAction<string>>
}

export default function Description({ description, setDescription }: DescriptionProps) {
    return (
        <div className="flex items-center">
            <img
                src="description.png"
                alt="description"
                className='w-4 h-4 mr-5'
            />
            <textarea
                placeholder='Ajouter une description'
                className='rounded-sm outline-none pl-2 pt-2 w-full resize-none hover:bg-gray-100 transition-all h-9 focus:h-40 focus:bg-gray-100'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
        </div>
    )
}