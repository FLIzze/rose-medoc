import { UserInterface } from "@/app/model/user";
import { Dispatch, SetStateAction, MouseEvent } from "react";
import { EventInterface } from "@/app/model/event";
import hideEventDetails from "@/app/event/hideEventDetails";
import displayEventPopUp from "@/app/event/displayEventPopUp";
import setPopUpPosition from "@/app/event/setPopUpPosition";
import WeeklyEvent from "../event/weekly-event/page";

interface DailyCalProps {
    date: Date,
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

export default function DailyCal({
    date,
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
    setDate }: DailyCalProps) {

    const hours = Array.from({ length: 12 }, (_, i) => i + 7);
    let skip = 0;

    const decrementSkip = () => {
        skip--;
    }

    return (
        <div>
            <div className="ml-20">
                <p className="text-light-pink text-xs">{date.toLocaleDateString('fr-FR', { weekday: 'short' }).toUpperCase()}</p>
                <p className="text-2xl font-semibold text-dark-pink">{date.getDate()}</p>
            </div>

            <div className="grid grid-cols-2 w-full overflow-y-scroll h-screen pb-20" style={{ gridTemplateColumns: '4rem 1fr' }}>
                <div className="bg-white">
                    {hours.map((hour, hoursIndex) => (
                        <div className="text-xs text-right text-dark-pink pr-3 h-24" key={hoursIndex}>
                            {hour}:00
                        </div>
                    ))}
                    <div className="text-xs text-right text-dark-pink pr-3 h-24">
                        19:00
                    </div>
                </div>

                <div className="bg-white">
                    {hours.map((hour, hoursIndex) => {
                        const eventsForHour = filteredEvents.filter(event =>
                            new Date(event.beginning).getHours() == hour - 2 &&
                            new Date(event.beginning).getMonth() == date.getMonth() &&
                            new Date(event.beginning).getDate() == date.getDate() &&
                            new Date(event.beginning).getFullYear() == date.getFullYear()
                        );

                        if (skip > 0) {
                            decrementSkip();
                        }

                        return (
                            <div key={hoursIndex}>
                                {eventsForHour.length > 0 ? (
                                    <div className="relative">
                                        {eventsForHour.map((event, eventIndex) => {
                                            const eventDuration = (new Date(event.end).getHours() - new Date(event.beginning).getHours());
                                            skip = eventDuration;
                                            return (
                                                <button
                                                    key={eventIndex}
                                                    className="text-left w-full"
                                                >
                                                    <WeeklyEvent
                                                        event={event}
                                                        daily={true}
                                                        setPosition={setPosition}
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
                                    skip == 0 && (
                                        <button
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
                                        </button>
                                    )
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}