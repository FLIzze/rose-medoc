import { Dispatch, SetStateAction } from "react";

interface LocationProps {
    location: string,
    setLocation: Dispatch<SetStateAction<string>>,
}

export default function Location({ location, setLocation }: LocationProps) {
    return (
        <div className="flex items-center">
            <img
                src="pin.png"
                alt="location"
                className='w-5 h-5 mr-4'
            />

            <input
                type="text"
                id=""
                placeholder="Ajouter une adresse"
                className="py-2 text-left px-2 hover:bg-gray-100 w-full outline-none focus:border-gray-400 transition-all border-b border-white h-9 focus:bg-gray-100"
                onChange={(e) => setLocation(e.target.value)}
            />
        </div>
    )
}