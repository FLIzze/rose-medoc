"use client";

import displayEventDetails from "@/app/event/displayEventDetails";
import { useEffect } from "react";
import MonthlyEvent from "../event/monthly-event/monthly-event";
import displayEventPopUp from "@/app/event/displayEventPopUp";
import goToDailyCalendar from "@/app/date/goToDailyCalendar";
import nextWeek from "@/app/date/nextWeek";
import prevWeek from "@/app/date/prevWeek";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { calendarModeAtom, dateAtom, descriptionAtom, eventAtom, filteredEventsAtom, isDetailsVisibleAtom, isPopupVisibleAtom, locationAtom, participantsAtom, popupDateAtom, positionAtom, titleAtom } from "@/app/atom";

export default function MainMonthlyCal() {
    const [date, setDate] = useAtom(dateAtom);

    const setPopupDate = useSetAtom(popupDateAtom);

    const [calendarMode, setCalendarMode] = useAtom(calendarModeAtom);

    const [isDetailsVisible, setIsDetailsVisible] = useAtom(isDetailsVisibleAtom);
    const [isPopupVisible, setIsPopupVisible] = useAtom(isPopupVisibleAtom);

    const setTitle = useSetAtom(titleAtom);
    const setDescription = useSetAtom(descriptionAtom);
    const setParticipants = useSetAtom(participantsAtom);
    const setLocation = useSetAtom(locationAtom);

    const setEvent = useSetAtom(eventAtom);

    const setPosition = useSetAtom(positionAtom);

    const filteredEvents = useAtomValue(filteredEventsAtom);

    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const daysArray = [];

    for (let i = 1; i <= daysInMonth; i++) {
        daysArray.push(new Date(date.getFullYear(), date.getMonth(), i));
    }

    useEffect(() => {
        const handleWheel = (event: WheelEvent) => {
            if (event.deltaY < 0) {
                prevWeek(date, setDate, calendarMode);
            } else {
                nextWeek(date, setDate, calendarMode);
            }
        };

        window.addEventListener('wheel', handleWheel);
        return () => {
            window.removeEventListener('wheel', handleWheel);
        };
    }, [date, calendarMode, setDate]);

    return (
        <div className="grid grid-cols-7 text-dark-pink text-sm gap-0">
            {daysArray.map((day, index) => {
                const dayEvents = filteredEvents.filter(event => {
                    const eventDate = new Date(event.beginning);
                    return eventDate.getDate() === day.getDate() &&
                        eventDate.getMonth() === day.getMonth() &&
                        eventDate.getFullYear() === day.getFullYear();
                });

                const isFirstColumn = index % 7 === 0;
                const isLastColumn = index % 7 === 6;
                const isFirstRow = index < 7;
                const isLastRow = index >= daysArray.length - 7;

                return (
                    <div
                        key={day.toLocaleDateString() + index}
                        className={`flex items-start flex-col border-very-light-pink h-44 w-full text-left
                                    ${isFirstColumn ? 'border-l' : ''} 
                                    ${isLastColumn ? 'border-r' : ''} 
                                    ${isFirstRow ? 'border-t' : ''} 
                                    ${isLastRow ? 'border-b' : ''} 
                                    border-r border-b`}
                        onClick={(e) => {
                            e.stopPropagation();
                            displayEventPopUp(setTitle,
                                setDescription,
                                setParticipants,
                                isPopupVisible,
                                setIsPopupVisible,
                                isDetailsVisible,
                                setLocation,
                                7,
                                day,
                                setPopupDate,
                            );
                            setPosition({ x: e.clientX, y: e.clientY });
                        }}
                    >
                        {index < 7 && (
                            <button
                                className="select-none flex justify-center items-center w-full text-xs mt-1"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {day.toLocaleDateString('fr-FR', { weekday: 'short' }).toUpperCase()}
                            </button>
                        )}

                        <div className={`w-full flex justify-center ${isFirstRow ? '' : 'mt-1'}`}>
                            <button
                                className="text-medium-pink hover:bg-very-light-pink px-2 transition-all rounded-full"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    goToDailyCalendar(day, setDate, setCalendarMode);
                                }}
                            >
                                {day.getDate()}
                            </button>
                        </div>

                        <div className="w-full">
                            {dayEvents.slice(0, 4).map((event, index) => (
                                <button
                                    key={event.title + index + event.beginning}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        displayEventDetails(setIsDetailsVisible, isDetailsVisible, isPopupVisible);
                                        setEvent(event);
                                        setPosition({ x: e.clientX, y: e.clientY });
                                    }}
                                    className="w-full pt-1 px-2"
                                >
                                    <MonthlyEvent
                                        event={event}
                                    />
                                </button>
                            ))}

                            {dayEvents.length > 4 && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        goToDailyCalendar(day, setDate, setCalendarMode);
                                    }}
                                    className="w-full pt-1 px-2"
                                >
                                    {dayEvents.length > 5 ? (
                                        <div className="hover:bg-very-light-pink transition-all w-full">
                                            {`${dayEvents.length - 4} autres événements`}
                                        </div>
                                    ) : (
                                        <MonthlyEvent
                                            event={dayEvents[4]}
                                        />
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}