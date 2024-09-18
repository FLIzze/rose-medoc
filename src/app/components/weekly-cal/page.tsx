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

interface WeeklyCalProps {
    days: string[],
    hours: number[],
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
    date: Date,
    eventPopUpDate: Date,
    setEventPopUpDate: Dispatch<SetStateAction<Date>>
}

export default function WeeklyCal({
    days,
    hours,
    filteredEvents,
    setIsPopupVisible,
    setIsDetailsVisible,
    isDetailsVisible,
    isPopupVisible,
    setEvent,
    setPosition,
    setTitle,
    setDescription,
    setParticipants,
    setLocation,
    date,
    eventPopUpDate,
    setEventPopUpDate }: WeeklyCalProps) {

    let skip = 1;

    const setPopUpPosition = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        setPosition({ x: clientX, y: clientY });
    }

    const decrementSkip = () => {
        skip--;
    }

    // Calculate the start of the week (Monday)
    const startOfWeek = new Date(date);
    const dayOfWeek = startOfWeek.getDay();
    const diffToMonday = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
    startOfWeek.setDate(startOfWeek.getDate() + diffToMonday);

    return (
        <div className="h-screen flex flex-col pb-24">
            <div className="flex-none grid grid-cols-9 w-full pt-6" style={{ gridTemplateColumns: '4rem repeat(8, 1fr)' }}>
                <div className="bg-white">
                    {/* Empty cell for the top-left corner */}
                </div>
                {days.map((_, dayIndex) => (
                    <div key={dayIndex} className="bg-white">
                        <p className="text-light-pink text-xs">{days[(dayIndex) % days.length]}</p>
                        <p className="text-2xl font-semibold text-dark-pink">{new Date(startOfWeek).getDate() + dayIndex}</p>
                    </div>
                ))}
            </div>

            <div className="flex-grow overflow-y-scroll">
                <div className="grid grid-cols-9 w-full" style={{ gridTemplateColumns: '4rem repeat(8, 1fr)' }}>
                    <div className="bg-white">
                        {hours.slice(0, -1).map((hour, hoursIndex) => (
                            <div key={hoursIndex} className="text-xs text-right text-dark-pink pr-3 h-24">
                                {hour}:00
                            </div>
                        ))}
                    </div>
                    {days.map((_, dayIndex) => (
                        <div key={dayIndex} className="bg-white">
                            {hours.slice(0, -1).map((hour, hoursIndex) => {
                                const eventsForHour = filteredEvents.filter(event =>
                                    new Date(event.beginning).getHours() + 2 == hour &&
                                    new Date(event.beginning).getMonth() == date.getMonth() - 1 &&
                                    new Date(event.beginning).getDate() == new Date(startOfWeek).getDate() + dayIndex &&
                                    new Date(event.beginning).getFullYear() == date.getFullYear()
                                );

                                return (
                                    <div key={hoursIndex}>
                                        <div>
                                            {eventsForHour.length > 0 ? (
                                                <div className="relative">
                                                    {eventsForHour.map((event, eventIndex) => {
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
                                                            displayEventPopUp(setTitle, setDescription, setParticipants, isPopupVisible, setIsPopupVisible, isDetailsVisible, setLocation, hour, dayIndex, eventPopUpDate, setEventPopUpDate);
                                                            setPopUpPosition(e);
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
                    ))}
                </div>
            </div>
        </div>
    );
}