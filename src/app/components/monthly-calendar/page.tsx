import displayEventDetails from "@/app/event/displayEventDetails";
import hideEventPopup from "@/app/event/hideEventPopup";
import setCurrentEventDetails from "@/app/event/setCurrentEventDetails";
import { EventInterface } from "@/app/model/event";
import { Dispatch, SetStateAction, useEffect } from "react";
import MonthlyEvent from "../event/monthly-event/page";
import hideEventDetails from "@/app/event/hideEventDetails";
import displayEventPopUp from "@/app/event/displayEventPopUp";
import { UserInterface } from "@/app/model/user";
import goToDailyCalendar from "@/app/date/goToDailyCalendar";
import nextWeek from "@/app/date/nextWeek";
import prevWeek from "@/app/date/prevWeek";

interface MainMonthlyCalProps {
    date: Date,
    filteredEvents: EventInterface[],
    setIsPopupVisible: Dispatch<SetStateAction<boolean>>,
    setIsDetailsVisible: Dispatch<SetStateAction<boolean>>,
    isDetailsVisible: boolean,
    isPopupVisible: boolean,
    setEvent: Dispatch<SetStateAction<EventInterface>>,
    setPosition: Dispatch<SetStateAction<{ x: number, y: number }>>,
    setTitle: Dispatch<SetStateAction<string>>,
    setDescription: Dispatch<SetStateAction<string>>,
    setParticipants: Dispatch<SetStateAction<UserInterface[]>>,
    setLocation: Dispatch<SetStateAction<string>>,
    setDate: Dispatch<SetStateAction<Date>>,
    setCalendarMode: Dispatch<SetStateAction<string>>,
    calendarMode: string
}

export default function MainMonthlyCal({
    date,
    filteredEvents,
    setIsDetailsVisible,
    setIsPopupVisible,
    isDetailsVisible,
    isPopupVisible,
    setEvent,
    setPosition,
    setTitle,
    setDescription,
    setParticipants,
    setLocation,
    setDate,
    setCalendarMode,
    calendarMode }: MainMonthlyCalProps) {

    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysArray = [];

    for (let i = 1; i <= daysInMonth; i++) {
        daysArray.push(new Date(currentYear, currentMonth, i));
    }

    function setPopUpPosition(e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>) {
        const { clientX, clientY } = e;
        setPosition({ x: clientX, y: clientY });
    }

    useEffect(() => {
        function handleWheel(event: WheelEvent) {
            if (event.deltaY < 0) {
                prevWeek(date, setDate, calendarMode);
            } else {
                nextWeek(date, setDate, calendarMode);
            }
        }

        window.addEventListener('wheel', handleWheel);
        return () => {
            window.removeEventListener('wheel', handleWheel);
        };
    }, [date, setDate, setCalendarMode]);

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
                        className={`flex items-start flex-col border-very-light-pink h-44 w-full 
                                    ${isFirstColumn ? 'border-l' : ''} 
                                    ${isLastColumn ? 'border-r' : ''} 
                                    ${isFirstRow ? 'border-t' : ''} 
                                    ${isLastRow ? 'border-b' : ''} 
                                    border-r border-b`}
                        key={index}
                        onClick={(e) => {
                            e.stopPropagation();
                            hideEventDetails(setIsDetailsVisible);
                            displayEventPopUp(setTitle,
                                setDescription,
                                setParticipants,
                                isPopupVisible,
                                setIsPopupVisible,
                                isDetailsVisible,
                                setLocation,
                                7,
                                day,
                                setDate,
                            );
                            setPopUpPosition(e);
                        }}
                    >
                        {index < 7 && (
                            <p
                                className="select-none flex justify-center items-center w-full text-xs mt-1"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {day.toLocaleDateString('fr-FR', { weekday: 'short' }).toUpperCase()}
                            </p>
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
                            {dayEvents.slice(0, 4).map((event, eventIndex) => (
                                <button
                                    key={eventIndex}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        hideEventPopup(setIsPopupVisible);
                                        displayEventDetails(setIsDetailsVisible, isDetailsVisible, isPopupVisible);
                                        setCurrentEventDetails(event, setEvent);
                                        setPopUpPosition(e);
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