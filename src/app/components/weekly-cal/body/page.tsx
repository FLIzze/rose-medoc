import { UserInterface } from "@/app/model/user";
import { Dispatch, SetStateAction, MouseEvent } from "react";
import { EventInterface } from "@/app/model/event";
import hideEventDetails from "@/app/event/hideEventDetails";
import displayEventPopUp from "@/app/event/displayEventPopUp";
import WeeklyEvent from "../../event/weekly-event/page";
import setPopUpPosition from "@/app/event/setPopUpPosition";

interface BodyProps {
    hours: number[],
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

    return (
        <div className="grid grid-cols-9 w-full overflow-y-scroll" style={{ gridTemplateColumns: '4rem repeat(8, 1fr)' }}>
            <div className="bg-white">
                {hours.slice(0, -1).map((hour, hoursIndex) => (
                    <div key={hoursIndex} className="text-xs text-right text-dark-pink pr-3 h-24">
                        {hour}:00
                    </div>
                ))}
            </div>

            {Array.from({ length: 7 }).map((_, dayIndex) => {
                const date = new Date(startOfWeek);
                date.setDate(startOfWeek.getDate() + dayIndex);
                return (
                    <div key={dayIndex} className="bg-white">
                        {hours.slice(0, -1).map((hour, hoursIndex) => {
                            const eventsForHour = filteredEvents.filter(event =>
                                new Date(event.beginning).getHours() == hour - 2 &&
                                new Date(event.beginning).getMonth() == date.getMonth() &&
                                new Date(event.beginning).getDate() == date.getDate() &&
                                new Date(event.beginning).getFullYear() == date.getFullYear()
                            );
                            return (
                                <div key={hoursIndex}>
                                    <div>
                                        {eventsForHour.length > 0 ? (
                                            <div className="relative">
                                                {eventsForHour.map((event, eventIndex) => {
                                                    return (
                                                        <button
                                                            key={eventIndex}
                                                            className="text-left w-full"
                                                        >
                                                            <WeeklyEvent
                                                                event={event}
                                                                daily={false}
                                                                setPosition={setPosition}
                                                                setIsPopupVisible={setIsPopupVisible}
                                                                setIsDetailsVisible={setIsDetailsVisible}
                                                                isDetailsVisible={isDetailsVisible}
                                                                isPopupVisible={isPopupVisible}
                                                                setEvent={setEvent}
                                                            />
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        ) : (
                                            skip == 1 ? (
                                                <div
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
                                                            date,
                                                            setDate,
                                                        );
                                                        setPopUpPosition(e, setPosition);
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
                );
            })}
        </div>
    )
}