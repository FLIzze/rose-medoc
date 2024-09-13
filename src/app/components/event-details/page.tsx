import { Dispatch, SetStateAction } from "react";
import { EventInterface } from "@/app/model/event";
import deleteEvent from "@/app/event/deleteEvent";
import Draggable from "../draggable/page";
import { UserInterface } from "@/app/model/user";
import returnFormattedDate from "@/app/date/returnFormattedDate";
import hideEventDetails from "@/app/event/hideEventDetails";

interface EventDetailsProps {
    event: EventInterface,
    setEvents: Dispatch<SetStateAction<EventInterface[]>>,
    pos: { x: number, y: number },
    currentUser: UserInterface,
    users: UserInterface[],
    setIsDetailsVisible: Dispatch<SetStateAction<boolean>>
}

export default function EventDetails({ event, setEvents, pos, currentUser, users, setIsDetailsVisible }: EventDetailsProps) {

    let beginningDate = new Date(event.beginning);
    let endDate = new Date(event.end);

    const formattedDate = returnFormattedDate(beginningDate, endDate);

    const eventCreator = users.find(user => user.id === event!.by);

    return (
        <Draggable pos={pos} size={{ width: 170, height: 120 }}>
            <div
                id="eventDetails"
                className="absolute opacity-0 h-fit bg-white shadow-2xl transition-all duration-150 w-fit pointer-events-none"
            >
                <div className="flex justify-end pr-5 h-9 w-full bg-gray-100">
                    {event!.by == currentUser.id && (
                        <button onClick={() => deleteEvent(event.id, setEvents)}>
                            <img src="/bin.png" alt="supprimer" className="w-8 h-8 p-2 hover:bg-gray-200 rounded-full" />
                        </button>
                    )}
                    <button onClick={() => hideEventDetails(setIsDetailsVisible)}>
                        <img src="/cross.svg" alt="cross" className="w-8 h-8 p-2 hover:bg-gray-200 rounded-full" />
                    </button>
                </div>

                <div className="flex flex-col text-sm mt-3 text-gray-600 pl-9 pr-11 pb-5">
                    <h1 className="w-full font-bold text-xl">{event.title}</h1>
                    <p className="whitespace-nowrap mb-4">{formattedDate}</p>

                    {event.description && (
                        <div className="flex items-center mt-2">
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
                        <div className="items-center mt-2">
                            {event.participants.length > 0 && (
                                <div className="items-center mt-2">
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
                        <div className="flex items-center mt-2">
                            <img
                                src="pin.png"
                                alt="location"
                                className='w-4 h-4 mr-3'
                            />
                            {event.location == 'Rose Medoc' ? (
                                <p>{event.location}</p>
                            ) : (
                                <a
                                    href={`https://www.google.fr/maps/place/${event.location}`}
                                    target="blank"
                                    className="text-blue-500"
                                >
                                    {event.location}
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Draggable>
    )
}