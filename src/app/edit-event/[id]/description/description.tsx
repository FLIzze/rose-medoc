import { EventInterface } from "@/app/model/event"
import { Dispatch, SetStateAction } from "react"

interface DescriptionProps {
    setDescription: Dispatch<SetStateAction<string>>,
    event: EventInterface
}

export default function Description({ setDescription, event }: DescriptionProps) {
    return (
        <>
            {event.description !== "" ? (
                <div className="flex flex-col">
                    <label htmlFor="description" className="font-bold">Description</label>
                    <input
                        type="text"
                        onChange={(e) => setDescription(e.target.value)}
                        id="description"
                        placeholder={event.description}
                        className="border border-medium-pink rounded-md p-2 focus:ring-2 focus:ring-medium-pink outline-none transition-all"
                    />
                </div>
            ) : (
                <div className="flex flex-col">
                    <label htmlFor="description" className="font-bold">Description</label>
                    <input
                        type="text"
                        onChange={(e) => setDescription(e.target.value)}
                        id="description"
                        placeholder='Ajouter une description'
                        className="border border-medium-pink rounded-md p-2 focus:ring-2 focus:ring-medium-pink outline-none transition-all"
                    />
                </div>
            )}
        </>
    )
}