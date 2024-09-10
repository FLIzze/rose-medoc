import { Dispatch, SetStateAction } from "react";
import { EventInterface } from "@/app/model/event";
import deleteEvent from "@/app/event/deleteEvent";
import Draggable from "../draggable/page";
import { UserInterface } from "@/app/model/user";
import returnFormattedDate from "@/app/date/returnFormattedDate";

interface EventDetailsProps {
    event: EventInterface,
    setEvents: Dispatch<SetStateAction<EventInterface[]>>,
    pos: { x: number, y: number },
    currentUser: UserInterface,
    users: UserInterface[],
}

export default function EventDetails({ event, setEvents, pos, currentUser, users }: EventDetailsProps) {

    let beginningDate = new Date(event.beginning);
    let endDate = new Date(event.end);

    const formattedDate = returnFormattedDate(beginningDate, endDate);

    const eventCreator = users.find(user => user.id === event!.by);

    return (
        <Draggable pos={pos} size={{ width: 170, height: 120 }}>
            <div
                id="eventDetails"
                className="absolute border h-fit bg-white rounded-sm shadow-2xl py-5 transition-all duration-150 pb-6 pr-8 pl-16 opacity-0 pointer-events-none text-gray-600 w-96"
            >
                <h1 className="w-full font-bold text-xl mb-3">{event.title}</h1>
                <hr />

                {event.beginning && (
                    <p className="my-3">{formattedDate}</p>
                )}
                <hr />

                {event.description && (
                    <div>
                        <div className="my-3">
                            <p>{event.description}</p>
                        </div>
                        <hr />
                    </div>
                )}

                {event.participants ? (
                    <div>
                        {event.participants.length > 0 && (
                            <div>
                                <div className="py-3">
                                    <p className="font-bold">{eventCreator?.name} {eventCreator?.firstName}</p>
                                    {event.participants.map((participantId, index) => {
                                        const participant = users.find(user => user.id === participantId);
                                        return (
                                            <div key={index}>
                                                {participant?.name} {participant?.firstName}
                                            </div>
                                        );
                                    })}
                                </div>
                                <hr />
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="py-3">
                        <p className="font-bold">{eventCreator?.name} {eventCreator?.firstName}</p>
                    </div>
                )}

                <p className="my-3">{event.location}</p>

                {event!.by == currentUser.id && (
                    <div className="flex justify-end mt-4">
                        <button
                            className='rounded-sm h-10 transition-all hover:bg-red-400 text-sm px-4 bg-red-300'
                            onClick={() => deleteEvent(event.id, setEvents)}>
                            Supprimer
                        </button>
                    </div>
                )}
            </div>
        </Draggable>
    )
}