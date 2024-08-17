import { Dispatch, SetStateAction } from "react";
import { EventInterface } from "@/app/model/event";
import deleteEvent from "@/app/event/deleteEvent"
import Draggable from "../draggable/page";

interface EventDetailsProps {
    title: string,
    description: string,
    id: number,
    setEvents: Dispatch<SetStateAction<EventInterface[]>>,
    pos: {x: number, y: number}
}

export default function EventDetails({title, description, id, setEvents, pos}: EventDetailsProps) {
    return (
        <Draggable pos={pos} size={{width: 170, height: 120}}>
            <div 
                id="eventDetails" 
                className="absolute border h-fit bg-white rounded-lg shadow-2xl py-5 transition-all duration-150 pb-6 w-fit pr-8 pl-16 opacity-0 pointer-events-none"
            >
                <p className="font-semibold border-b border-gray-200 text-xl whitespace-nowrap">{title}</p>
                <p>{description}</p>
                <p>{id}</p>
                <button onClick={() => deleteEvent(id, setEvents)}>supprimer</button>
            </div>
        </Draggable>
    )
}