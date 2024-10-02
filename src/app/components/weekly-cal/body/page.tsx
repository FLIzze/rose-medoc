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

    const normalizeDate = (date: Date) => {
        const normalizedDate = new Date(date);
        normalizedDate.setHours(0, 0, 0, 0);
        return normalizedDate;
    }

    // Calculate overlapping events and position them side by side
    const renderEventsForHour = (hour: number, date: Date) => {
        const normalizedDate = normalizeDate(date);

        const eventsForHour = filteredEvents.filter(event => {
            const eventStart = new Date(event.beginning);
            const eventDate = normalizeDate(eventStart);
            return eventStart.getHours() === hour - 2 && eventDate.getTime() === normalizedDate.getTime();
        });

        if (skip > 0) {
            decrementSkip();
        }

        if (eventsForHour.length > 0) {
            // Sort events by their start time to ensure proper rendering order
            const sortedEvents = eventsForHour.sort((a, b) => new Date(a.beginning).getTime() - new Date(b.beginning).getTime());

            // Calculate columns based on event overlaps
            const eventColumns: { event: EventInterface, columnIndex: number, totalColumns: number }[] = [];
            let maxColumns = 0;

            sortedEvents.forEach((event, index) => {
                const overlappingEvents = sortedEvents.filter((otherEvent) => {
                    return new Date(otherEvent.beginning) < new Date(event.end) && new Date(otherEvent.end) > new Date(event.beginning);
                });

                const columnIndex = overlappingEvents.findIndex(e => e === event);
                eventColumns.push({ event, columnIndex, totalColumns: overlappingEvents.length });
                maxColumns = Math.max(maxColumns, overlappingEvents.length);
            });

            return (
                <div className="static h-full">
                    {eventColumns.map(({ event, columnIndex, totalColumns }, eventIndex) => {
                        const eventDuration = (new Date(event.end).getHours() - new Date(event.beginning).getHours());
                        skip = eventDuration;
                        const columnWidth = 100 / totalColumns; // Divide width equally among overlapping events
                        const leftPosition = (columnWidth * columnIndex); // Position each event based on column index

                        return (
                            <button
                                className="absolute pl-1 overflow-hidden"
                                key={eventIndex}
                                style={{
                                    width: `${columnWidth}%`,
                                    left: `${leftPosition}%`,
                                    height: `${eventDuration * 100}%`
                                }}
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
            );
        }

        return (
            skip === 0 && (
                <button
                    className="bg-white border border-very-light-pink h-24 w-full"
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
                </button>
            )
        );
    }

    const renderGrid = () => {
        if (viewMode === "weekly") {
            const startOfWeek = new Date(date);
            startOfWeek.setDate(date.getDate() - date.getDay() + 1);

            return Array.from({ length: 7 }).map((_, dayIndex) => {
                const currentDate = new Date(startOfWeek);
                currentDate.setDate(startOfWeek.getDate() + dayIndex);
                return (
                    <div className="bg-white" key={dayIndex}>
                        {hours.slice(0, -1).map((hour, hoursIndex) => (
                            <div key={hoursIndex} className="h-24 relative">
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
                        <div key={hoursIndex} className="h-24 relative">
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
                    <div className="text-xs text-right text-dark-pink pr-3 h-24 flex items-center justify-end" key={hoursIndex}>
                        {hour}:00
                    </div>
                ))}
                <div className="text-xs text-right text-dark-pink pr-3 h-24 flex items-center justify-end">
                    19:00
                </div>
            </div>

            {renderGrid()}
        </div>
    );
}
