import displayEventDetails from "@/app/event/displayEventDetails";
import hideEventPopup from "@/app/event/hideEventPopup";
import setCurrentEventDetails from "@/app/event/setCurrentEventDetails";
import { EventInterface } from "@/app/model/event";
import { Dispatch, SetStateAction } from "react";
import MonthlyEvent from "../event/monthly-event/page";
import hideEventDetails from "@/app/event/hideEventDetails";
import displayEventPopUp from "@/app/event/displayEventPopUp";
import { UserInterface } from "@/app/model/user";
import goToDailyCalendar from "@/app/date/goToDailyCalendar";

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
    setCalendarMode }: MainMonthlyCalProps) {

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

    return (
        <div className="grid grid-cols-7 text-dark-pink text-sm gap-0">
            {daysArray.map((day, index) => {
                const dayEvents = filteredEvents.filter(event => {
                    const eventDate = new Date(event.beginning);
                    return eventDate.getDate() === day.getDate() &&
                        eventDate.getMonth() === day.getMonth() &&
                        eventDate.getFullYear() === day.getFullYear();
                });

                return (
                    <div
                        className={`flex items-center flex-col border-r border-b border-dark-pink h-44 w-full ${index % 7 == 6 ? 'border-r-0' : ''} ${index >= daysArray.length - 7 ? 'border-b-0' : ''}`}
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
                                9,
                                date,
                                setDate,
                            );
                            setPopUpPosition(e);
                        }}
                    >
                        {index < 7 && (
                            <p
                                className="font-bold select-none"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {day.toLocaleDateString('fr-FR', { weekday: 'short' }).toUpperCase()}
                            </p>
                        )}

                        <button
                            className="text-medium-pink hover:bg-very-light-pink py-1 px-2 rounded-full mt-1 transition-all"
                            onClick={(e) => {
                                e.stopPropagation();
                                goToDailyCalendar(day, setDate, setCalendarMode);
                            }}
                        >
                            {day.getDate()}
                        </button>

                        <div className="mt-1 ml-3">
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
                                    className="text-left"
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
                                >
                                    {dayEvents.length > 5 ? (
                                        <div className="hover:bg-very-light-pink w-full rounded-lg p-1 transition-all">
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