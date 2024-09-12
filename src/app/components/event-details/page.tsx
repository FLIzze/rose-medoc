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
                className="absolute h-fit bg-white rounded-sm shadow-2xl py-5 transition-all duration-150 pr-8 pl-1 opacity-0 pointer-events-none text-gray-600 w-96 text-sm"
            >
                <h1 className="w-full font-bold text-xl ml-11">{event.title}</h1>
                <p className="ml-11">{formattedDate}</p>

                {event.description && (
                    <div className="flex items-center ml-4 mt-4">
                        <img
                            src="description.png"
                            alt="description"
                            className='w-4 h-4 mr-3'
                        />
                        <div>
                            <p>{event.description}</p>
                        </div>
                    </div>
                )}

                {event.participants && (
                    <div className="items-center mt-4 ml-4">
                        {event.participants.length > 0 && (
                            <div  className="items-center mt-4 ml-4">
                                <div className="flex items-center">
                                    <img
                                        src="person.png"
                                        alt="participants"
                                        className='w-4 h-4 mr-3'
                                    />
                                    <p>{event.participants.length + 1} participants</p>
                                </div>
                                <p className="font-bold ml-16">{eventCreator?.name} {eventCreator?.firstName}</p>
                                {event.participants.map((participantId, index) => {
                                    const participant = users.find(user => user.id === participantId);
                                    return (
                                        <div key={index}>
                                            <p className="ml-16">
                                                {participant?.name} {participant?.firstName}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}

                {event.location && (
                    <div className="flex items-center mt-4 ml-4">
                        <img
                            src="pin.png"
                            alt="location"
                            className='w-4 h-4 mr-3'
                        />
                        <p>{event.location}</p>
                    </div>
                )}

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