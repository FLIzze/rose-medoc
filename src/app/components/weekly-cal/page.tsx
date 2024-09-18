'use client';

import CalEvent from "../event/page";
import { EventInterface } from '@/app/model/event';
import displayEventPopUp from '@/app/event/displayEventPopUp';
import displayEventDetails from '@/app/event/displayEventDetails';
import hideEventDetails from '@/app/event/hideEventDetails';
import hideEventPopup from '@/app/event/hideEventPopup';
import setCurrentEventDetails from '@/app/event/setCurrentEventDetails';
import { Dispatch, SetStateAction, useEffect } from "react";
import { UserInterface } from "@/app/model/user";
import updateWeekDates from "@/app/date/updateWeekDates";

interface WeeklyCalProps {
    days: string[],
    hours: number[],
    dates: string[],
    filteredEvents: EventInterface[],
    currentMonth: number,
    currentYear: number,
    setIsPopupVisible: Dispatch<SetStateAction<boolean>>,
    setIsDetailsVisible: Dispatch<SetStateAction<boolean>>,
    isDetailsVisible: boolean,
    isPopupVisible: boolean,
    setEvent: Dispatch<SetStateAction<EventInterface>>,
    setPosition: Dispatch<SetStateAction<{ x: number, y: number }>>,
    setCurrentDayEvent: Dispatch<SetStateAction<number>>,
    setCurrentHour: Dispatch<SetStateAction<number>>,
    setBeginningHour: Dispatch<SetStateAction<number>>,
    setEndHour: Dispatch<SetStateAction<number>>,
    setTitle: Dispatch<SetStateAction<string>>,
    setDescription: Dispatch<SetStateAction<string>>,
    setParticipants: Dispatch<SetStateAction<UserInterface[]>>,
    setLocation: Dispatch<SetStateAction<string>>,
    currentDay: number,
    setDates: Dispatch<SetStateAction<string[]>>
}

export default function WeeklyCal({
    days,
    hours,
    dates,
    filteredEvents,
    currentMonth,
    currentYear,
    setIsPopupVisible,
    setIsDetailsVisible,
    isDetailsVisible,
    isPopupVisible,
    setEvent,
    setPosition,
    setCurrentDayEvent,
    setCurrentHour,
    setBeginningHour,
    setEndHour,
    setTitle,
    setDescription,
    setParticipants,
    setLocation,
    currentDay,
    setDates
}: WeeklyCalProps) {

    let skip = 1;

    useEffect(() => {
        updateWeekDates(currentYear, currentMonth, currentDay, setDates);
    }, [currentDay, currentMonth, currentYear]);

    const setPopUpPosition = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        setPosition({ x: clientX, y: clientY });
    }

    const decrementSkip = () => {
        skip--;
    }

    return (
        <div className="h-screen flex flex-col pb-6">
            <div className="flex-none grid grid-cols-8 w-full pt-6">
                {days.map((day, dayIndex) => (
                    <div key={dayIndex} className="bg-white">
                        {day === "Empty" ? (
                            <div className="bg-white p-6"></div>
                        ) : (
                            <>
                                <p className="text-light-pink text-xs">{day}</p>
                                <p className="text-2xl font-semibold text-dark-pink">{dates[dayIndex]}</p>
                            </>
                        )}
                    </div>
                ))}
            </div>


            <div className="flex-grow overflow-y-scroll">
                <div className="grid grid-cols-8 w-full">
                    {days.map((_, dayIndex) => (
                        <div key={dayIndex} className="bg-white">
                            {hours.slice(0, -1).map((hour, hoursIndex) => {
                                const eventsForHour = filteredEvents.filter(event =>
                                    new Date(event.beginning).getHours() + 2 == hour &&
                                    new Date(event.beginning).getMonth() == currentMonth - 1 &&
                                    new Date(event.beginning).getDate() == Number(dates[dayIndex]) &&
                                    new Date(event.beginning).getFullYear() == currentYear
                                );

                                return (
                                    <div key={hoursIndex}>
                                        {dayIndex == 0 ? (
                                            <div className="text-xs text-right text-dark-pink pr-3 h-24">{hour}:00</div>) : (
                                            <div>
                                                {eventsForHour.length > 0 ? (
                                                    <div className="relative">
                                                        {eventsForHour
                                                            .map((event, eventIndex) => {
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
                                                                displayEventPopUp(hour, dayIndex, setCurrentDayEvent, setCurrentHour, setBeginningHour, setEndHour, setTitle, setDescription, setParticipants, isPopupVisible, setIsPopupVisible, isDetailsVisible, setLocation);
                                                                setPopUpPosition(e);
                                                            }}>
                                                        </div>
                                                    ) : (
                                                        <>{decrementSkip()}</>
                                                    )
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}