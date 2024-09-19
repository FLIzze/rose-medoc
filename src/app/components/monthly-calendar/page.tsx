import displayEventDetails from "@/app/event/displayEventDetails";
import hideEventPopup from "@/app/event/hideEventPopup";
import setCurrentEventDetails from "@/app/event/setCurrentEventDetails";
import { EventInterface } from "@/app/model/event";
import { Dispatch, SetStateAction } from "react";
import MonthlyEvent from "../event/monthly-event/page";
import hideEventDetails from "@/app/event/hideEventDetails";
import displayEventPopUp from "@/app/event/displayEventPopUp";
import { UserInterface } from "@/app/model/user";

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
    setDate }: MainMonthlyCalProps) {

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
        <div className="grid grid-cols-7 text-dark-pink text-sm">
            {daysArray.map((day, index) => (
                <div
                    className="flex items-start flex-col border-l border-t border-dark-pink p-14"
                    key={index}
                    onClick={(e) => {
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
                        <p>{day.toLocaleDateString('fr-FR', { weekday: 'short' }).toUpperCase()}</p>
                    )}
                    <p>{day.getDate()}</p>

                    {filteredEvents
                        .filter(event => {
                            const eventDate = new Date(event.beginning);
                            return eventDate.getDate() === day.getDate() &&
                                eventDate.getMonth() === day.getMonth() &&
                                eventDate.getFullYear() === day.getFullYear();
                        })
                        .map((event, eventIndex) => (
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
                        ))
                    }
                </div>
            ))}
        </div>
    )
}