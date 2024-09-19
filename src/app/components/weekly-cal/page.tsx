'use client';

import { EventInterface } from '@/app/model/event';
import { Dispatch, SetStateAction } from "react";
import { UserInterface } from "@/app/model/user";
import Header from "./header/page";
import Body from "./body/page";

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
    setDate: Dispatch<SetStateAction<Date>>
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
    setDate }: WeeklyCalProps) {

    // Calculate the start of the week (Monday)
    const startOfWeek = new Date(date);
    const dayOfWeek = startOfWeek.getDay();
    const diffToMonday = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
    startOfWeek.setDate(startOfWeek.getDate() + diffToMonday);

    return (
        <div className="h-screen flex flex-col pb-24">
            <Header
                days={days}
                startOfWeek={startOfWeek}
            />

            <Body
                hours={hours}
                days={days}
                startOfWeek={startOfWeek}
                filteredEvents={filteredEvents}
                setIsPopupVisible={setIsPopupVisible}
                setIsDetailsVisible={setIsDetailsVisible}
                isDetailsVisible={isDetailsVisible}
                isPopupVisible={isPopupVisible}
                setEvent={setEvent}
                setTitle={setTitle}
                setDescription={setDescription}
                setParticipants={setParticipants}
                setLocation={setLocation}
                setPosition={setPosition}
                setDate={setDate}
            />
        </div>
    );
}