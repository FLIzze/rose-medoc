import { Dispatch, SetStateAction } from "react";
import { EventInterface } from "@/app/model/event";
import deleteEvent from "@/app/event/deleteEvent"
import Draggable from "../draggable/page";
import { UserInterface } from "@/app/model/user";
import returnFormattedDate from "@/app/date/returnFormattedDate";

interface EventDetailsProps {
    event: EventInterface | undefined,
    setEvents: Dispatch<SetStateAction<EventInterface[]>>,
    pos: { x: number, y: number },
    currentUser: UserInterface | undefined,
    users: UserInterface[],
}

export default function EventDetails({ event, setEvents, pos, currentUser, users }: EventDetailsProps) {

    const end = new Date(event?.end ?? "");
    console.log(
        returnFormattedDate(end)
    );
    

    return (
        <Draggable pos={pos} size={{ width: 170, height: 120 }}>
            <div
                id="eventDetails"
                className="absolute border h-fit bg-white rounded-lg shadow-2xl py-5 transition-all duration-150 pb-6 pr-8 pl-16 opacity-0 pointer-events-none text-gray-600 w-96"
            >
                <h1 className="w-full whitespace-nowrap font-bold text-xl mb-3">{event?.title}</h1>

                <p className="mb-4">{event?.description}</p>

                <p className="mb-4">{event?.location}</p>

                {event?.participants.map((participantId, index) => {
                    const participant = users.find(user => user.id === participantId);
                    return (
                        <div key={index} className="text-sm">
                            {participant?.name}
                        </div>
                    );
                })}

                {event?.by == currentUser?.id && (
                    <div className="flex justify-end mt-4">
                        <button
                            className='rounded-sm h-10 border border-gray-200 transition-all hover:bg-gray-100 text-sm px-4'
                            onClick={() => deleteEvent(event?.id, setEvents)}>
                            Supprimer
                        </button>
                    </div>
                )}
            </div>
        </Draggable >
    )
}