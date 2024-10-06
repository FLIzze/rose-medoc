import { EventInterface } from "@/app/model/event";
import displayEventPopUp from "@/app/event/displayEventPopUp";
import WeeklyEvent from "../../event/weekly-event/weekly-component";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { calendarModeAtom, dateAtom, descriptionAtom, eventAtom, filteredEventsAtom, hoursAtom, isDetailsVisibleAtom, isPopupVisibleAtom, locationAtom, participantsAtom, popupDateAtom, positionAtom, titleAtom } from "@/app/atom";

export default function Body() {
    const setTitle = useSetAtom(titleAtom);
    const setDescription = useSetAtom(descriptionAtom);
    const setParticipants = useSetAtom(participantsAtom);
    const setLocation = useSetAtom(locationAtom);

    const setPosition = useSetAtom(positionAtom);

    const isDetailsVisible = useAtomValue(isDetailsVisibleAtom);
    const setPopupDate = useSetAtom(popupDateAtom);
    const [isPopupVisible, setIsPopupVisible] = useAtom(isPopupVisibleAtom);

    const filteredEvents = useAtomValue(filteredEventsAtom);

    const calendarMode = useAtomValue(calendarModeAtom);

    const date = useAtomValue(dateAtom);

    const hours = useAtomValue(hoursAtom);

    const setEvent = useSetAtom(eventAtom);

    let skip = 0;

    const decrementSkip = () => {
        skip--;
    }

    const normalizeDate = (date: Date) => {
        const normalizedDate = new Date(date);
        normalizedDate.setHours(0, 0, 0, 0);
        return normalizedDate;
    }

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
                    {eventColumns.map(({ event, columnIndex, totalColumns }) => {
                        const eventDuration = (new Date(event.end).getHours() - new Date(event.beginning).getHours());
                        skip = eventDuration;
                        const columnWidth = 100 / totalColumns;
                        const leftPosition = (columnWidth * columnIndex);

                        return (
                            <button
                                className="absolute pl-1 overflow-hidden"
                                // key={event.title + columnIndex + totalColumns}
                                style={{
                                    width: `${columnWidth}%`,
                                    left: `${leftPosition}%`,
                                    height: `${eventDuration * 100}%`
                                }}
                                onClick={(e) => {
                                    setEvent(event);
                                    setPosition({ x: e.clientX, y: e.clientY });
                                }}
                            >
                                <WeeklyEvent
                                    event={event}
                                />
                            </button>
                        );
                    })}
                </div>
            );
        }

        return (
            skip === 0 && (
                <div
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
                            setPopupDate,
                        );
                        setPosition({ x: e.clientX, y: e.clientY });
                    }}
                >
                </div>
            )
        );
    }

    const renderGrid = () => {
        if (calendarMode === "Semaine") {
            const startOfWeek = new Date(date);
            startOfWeek.setDate(date.getDate() - date.getDay() + 1);

            return Array.from({ length: 7 }).map((day, dayIndex) => {
                const currentDate = new Date(startOfWeek);
                currentDate.setDate(startOfWeek.getDate() + dayIndex);
                return (
                    <div
                        className="bg-white"
                    // key={day as string + dayIndex}
                    >
                        {hours.slice(0, -1).map((hour) => (
                            <div
                                // key={hour + dayIndex + "week"} 
                                className="h-24 relative"
                            >
                                {renderEventsForHour(hour, currentDate)}
                            </div>
                        ))}
                    </div>
                );
            });
        } else if (calendarMode === "Jour") {
            return (
                <div className="bg-white">
                    {hours.slice(0, -1).map((hour, index) => (
                        <div
                            // key={hour + index + "day"} 
                            className="h-24 relative"
                        >
                            {renderEventsForHour(hour, date)}
                        </div>
                    ))}
                </div>
            );
        }
    }

    return (
        <div
            className={`grid ${calendarMode === 'Semaine' ? 'grid-cols-9' : 'grid-cols-2'} w-full overflow-y-scroll`}
            style={{ gridTemplateColumns: calendarMode === 'Semaine' ? '4rem repeat(8, 1fr)' : '4rem 1fr' }}
        >
            <div className="bg-white">
                {hours.slice(0, -1).map((hour, index) => (
                    <div
                        className="text-xs text-right text-dark-pink pr-3 h-24 flex items-center justify-end"
                    // key={hour + index + "gridBody"}
                    >
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
