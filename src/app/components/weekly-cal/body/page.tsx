import displayEventDetails from "@/app/event/displayEventDetails";
import hideEventPopup from "@/app/event/hideEventPopup";
import setCurrentEventDetails from "@/app/event/setCurrentEventDetails";
import { UserInterface } from "@/app/model/user";
import { Dispatch, SetStateAction, MouseEvent } from "react";
import CalEvent from "../../event/page";
import { EventInterface } from "@/app/model/event";
import hideEventDetails from "@/app/event/hideEventDetails";
import displayEventPopUp from "@/app/event/displayEventPopUp";

interface BodyProps {
    hours: number[],
    days: string[],
    startOfWeek: Date,
    filteredEvents: EventInterface[],
    setIsPopupVisible: Dispatch<SetStateAction<boolean>>,
    setIsDetailsVisible: Dispatch<SetStateAction<boolean>>,
    isDetailsVisible: boolean,
    isPopupVisible: boolean,
    setEvent: Dispatch<SetStateAction<EventInterface>>,
    setTitle: Dispatch<SetStateAction<string>>,
    setDescription: Dispatch<SetStateAction<string>>,
    setParticipants: Dispatch<SetStateAction<UserInterface[]>>,
    setLocation: Dispatch<SetStateAction<string>>,
    setPosition: Dispatch<SetStateAction<{ x: number, y: number }>>,
    setDate: Dispatch<SetStateAction<Date>>
}

export default function Body({
    hours,
    days,
    startOfWeek,
    filteredEvents,
    setIsPopupVisible,
    setIsDetailsVisible,
    isDetailsVisible,
    isPopupVisible,
    setEvent,
    setTitle,
    setDescription,
    setParticipants,
    setLocation,
    setPosition,
    setDate }: BodyProps) {

    let skip = 1;

    const decrementSkip = () => {
        skip--;
    }

    function setPopUpPosition(e: React.MouseEvent<HTMLDivElement>) {
        const { clientX, clientY } = e;
        setPosition({ x: clientX, y: clientY });
    }

    return (
        <div className="flex-grow overflow-y-scroll">
            <div className="grid grid-cols-9 w-full" style={{ gridTemplateColumns: '4rem repeat(8, 1fr)' }}>
                <div className="bg-white">
                    {hours.slice(0, -1).map((hour, hoursIndex) => (
                        <div key={hoursIndex} className="text-xs text-right text-dark-pink pr-3 h-24">
                            {hour}:00
                        </div>
                    ))}
                </div>

                {days.map((_, dayIndex) => (
                    <div key={dayIndex} className="bg-white">
                        {hours.slice(0, -1).map((hour, hoursIndex) => {
                            const currentDate = new Date(startOfWeek);
                            currentDate.setDate(startOfWeek.getDate() + dayIndex);
                            const eventsForHour = filteredEvents.filter(event =>
                                new Date(event.beginning).getHours() == hour - 2 &&
                                new Date(event.beginning).getMonth() == currentDate.getMonth() &&
                                new Date(event.beginning).getDate() == currentDate.getDate() &&
                                new Date(event.beginning).getFullYear() == currentDate.getFullYear()
                            );
                            return (
                                <div key={hoursIndex}>
                                    <div>
                                        {eventsForHour.length > 0 ? (
                                            <div className="relative">
                                                {eventsForHour.map((event, eventIndex) => {
                                                    const eventDuration = (new Date(event.end).getTime() - new Date(event.beginning).getTime()) / (1000 * 60 * 60);
                                                    skip = eventDuration;
                                                    return (
                                                        <div
                                                            key={eventIndex}
                                                            onClick={(e) => {
                                                                hideEventPopup(setIsPopupVisible);
                                                                displayEventDetails(setIsDetailsVisible, isDetailsVisible, isPopupVisible);
                                                                setCurrentEventDetails(event, setEvent);
                                                                setPopUpPosition(e);
                                                            }}
                                                        >
                                                            <CalEvent
                                                                beginningHour={new Date(event.beginning).getHours() + 2}
                                                                endHour={new Date(event.end).getHours() + 2}
                                                                title={event.title}
                                                                duration={eventDuration}
                                                                id={event.by}
                                                                location={event.location}
                                                            />
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ) : (
                                            skip == 1 ? (
                                                <div
                                                    id={`${dayIndex}-${hoursIndex}`}
                                                    className="bg-white border-very-light-pink border-l border-t h-24"
                                                    onClick={(e) => {
                                                        hideEventDetails(setIsDetailsVisible);
                                                        displayEventPopUp(setTitle,
                                                            setDescription,
                                                            setParticipants,
                                                            isPopupVisible,
                                                            setIsPopupVisible,
                                                            isDetailsVisible,
                                                            setLocation,
                                                            hour,
                                                            currentDate,
                                                            setDate,
                                                            currentDate.getDate()
                                                        );
                                                        setPopUpPosition(e);
                                                    }}
                                                >
                                                </div>
                                            ) : (
                                                <>{decrementSkip()}</>
                                            )
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    )
}