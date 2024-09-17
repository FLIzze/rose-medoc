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
                className="absolute opacity-0 h-fit bg-white shadow-2xl transition-all duration-150 w-96 pointer-events-none text-dark-pink text-base"
            >
                <div className="flex justify-end pr-5 h-9 w-full bg-medium-pink">
                    {event!.by == currentUser.id && (
                        <button onClick={() => {
                            hideEventDetails(setIsDetailsVisible)
                            deleteEvent(event.id, setEvents)
                        }}>
                            <img
                                src="/bin.png"
                                alt="supprimer"
                                className="w-8 h-8 p-2 hover:bg-dark-pink rounded-full"
                            />
                        </button>
                    )}
                    <button onClick={() => hideEventDetails(setIsDetailsVisible)}>
                        <img
                            src="/cross.png"
                            alt="cross"
                            className="w-7 h-7 p-1 hover:bg-dark-pink rounded-full"
                        />
                    </button>
                </div>

                <div className="grid grid-cols-[auto,2fr] gap-x-6 mr-6">
                    {event.title && (
                        <>
                            <div className="bg-light-pink flex items-center justify-center p-2 pb-4">
                                <img
                                    src="title.png"
                                    alt="titre"
                                    className='w-5 h-5 mx-3'
                                />
                            </div>
                            <div className="pb-4 p-2">
                                <h1 className="font-bold text-lg">{event.title}
                                    <p className="text-xs">{formattedDate}</p>
                                </h1>
                            </div>
                        </>
                    )}

                    {event.description && (
                        <>
                            <div className="bg-light-pink flex items-center justify-center p-2 pb-4">
                                <img
                                    src="description.png"
                                    alt="description"
                                    className='w-5 h-5 mx-3'
                                />
                            </div>
                            <div className="flex items-center pb-4 p-2">
                                <p className="text-justify">{event.description}</p>
                            </div>
                        </>
                    )}

                    {event.location && (
                        <>
                            <div className="bg-light-pink flex items-center justify-center p-2 pb-4">
                                <img
                                    src="pin.png"
                                    alt="location"
                                    className='w-5 h-5 mx-3'
                                />
                            </div>
                            <div className="flex items-center pb-4 p-2">
                                {event.location == 'Rose Medoc' ? (
                                    <p>Rose Medoc</p>
                                ) : (
                                    <a
                                        href={`https://www.google.fr/maps/place/${event.location}`}
                                        target="blank"
                                        className="text-light-pink"
                                    >
                                        {event.location}
                                    </a>
                                )}
                            </div>
                        </>
                    )}

                    {event.participants && event.participants.length > 0 && (
                        <>
                            <div className="bg-light-pink flex items-center justify-center p-2 pb-4">
                                <img
                                    src="person.png"
                                    alt="participants"
                                    className='w-5 h-5 mx-3'
                                />
                            </div>
                            <div className="flex flex-col pb-4 p-2">
                                <p>{event.participants.length + 1} participants</p>
                                <p className="font-bold">{eventCreator?.name} {eventCreator?.firstName}</p>
                                {event.participants.map((participantId, index) => {
                                    const participant = users.find(user => user.id === participantId);
                                    return (
                                        <p key={index}>
                                            {participant?.name} {participant?.firstName}
                                        </p>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Draggable>
    )
}