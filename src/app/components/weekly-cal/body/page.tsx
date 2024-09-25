import { UserInterface } from "@/app/model/user";
import { Dispatch, SetStateAction } from "react";
import { EventInterface } from "@/app/model/event";
import displayEventPopUp from "@/app/event/displayEventPopUp";
import setPopUpPosition from "@/app/event/setPopUpPosition";
import WeeklyEvent from "../../event/weekly-event/page";

interface BodyProps {
    hours: number[],
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
    setPopupDate: Dispatch<SetStateAction<Date>>,
    viewMode: 'daily' | 'weekly',
    popupDate: Date
}

export default function Body({
    hours,
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
    setPopupDate,
    viewMode,
    popupDate }: Readonly<BodyProps>) {

    let skip = 0;

    const decrementSkip = () => {
        skip--;
    }

    const renderEventsForHour = (hour: number, date: Date) => {
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
            <div>
                {eventsForHour.length > 0 ? (
                    <div className="relative">
                        {eventsForHour.map((event, eventIndex) => {
                            const eventDuration = (new Date(event.end).getHours() - new Date(event.beginning).getHours());
                            skip = eventDuration;
                            return (
                                <button
                                    className="text-left w-full"
                                    key={eventIndex}
                                >
                                    <WeeklyEvent
                                        event={event}
                                        daily={viewMode === 'daily'}
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
                        <div
                            className="bg-white border-very-light-pink border-l border-t h-24"
                            onClick={(e) => {
                                displayEventPopUp(setTitle,
                                    setDescription,
                                    setParticipants,
                                    isPopupVisible,
                                    setIsPopupVisible,
                                    isDetailsVisible,
                                    setLocation,
                                    hour,
                                    date,
                                    setPopupDate
                                );
                                setPopUpPosition(e, setPosition);
                            }}
                        >
                        </div>
                    )
                )}
            </div>
        );
    }

    const renderGrid = () => {
        if (viewMode === "weekly") {
            return Array.from({ length: 7 }).map((_, dayIndex) => {
                const currentDate = new Date(date);
                currentDate.setDate(date.getDate() + dayIndex);
                return (
                    <div className="bg-white" key={dayIndex}>
                        {hours.slice(0, -1).map((hour, hoursIndex) => (
                            <div key={hoursIndex}>
                                {renderEventsForHour(hour, currentDate)}
                            </div>
                        ))}
                    </div>
                );
            });
        } else if (viewMode === "daily") {
            return (
                <div className="bg-white">
                    {hours.slice(0, -1).map((hour, hoursIndex) => (
                        <div key={hoursIndex}>
                            {renderEventsForHour(hour, date)}
                        </div>
                    ))}
                </div>
            );
        }
    }

    return (
        <div
            className={`grid ${viewMode === 'weekly' ? 'grid-cols-9' : 'grid-cols-2'} w-full overflow-y-scroll`}
            style={{ gridTemplateColumns: viewMode === 'weekly' ? '4rem repeat(8, 1fr)' : '4rem 1fr' }}
        >
            <div className="bg-white">
                {hours.slice(0, -1).map((hour, hoursIndex) => (
                    <div className="text-xs text-right text-dark-pink pr-3 h-24" key={hoursIndex}>
                        {hour}:00
                    </div>
                ))}
                <div className="text-xs text-right text-dark-pink pr-3 h-24">
                    19:00
                </div>
            </div>

            {renderGrid()}
        </div>
    )
}