import { Dispatch, SetStateAction } from "react";
import { EventInterface } from "@/app/model/event";
import deleteEvent from "@/app/event/deleteEvent"

interface EventDetailsProps {
    title: string,
    description: string,
    id: number,
    setEvents: Dispatch<SetStateAction<EventInterface[]>>
}

export default function EventDetails({title, description, id, setEvents}: EventDetailsProps) {
    return (
        <div 
            id="eventDetails" 
            className="absolute border h-fit bg-white rounded-lg shadow-2xl py-5 transition-all duration-150 pb-6 w-fit pr-8 pl-16"
        >
            <p className="font-semibold border-b border-gray-200 text-xl">{title}</p>
            <p>{description}</p>
            <p>{id}</p>
            <button onClick={() => deleteEvent(id, setEvents)}>supprimer</button>
        </div>
    )
}