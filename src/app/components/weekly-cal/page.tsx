'use client';

import { EventInterface } from '@/app/model/event';
import { Dispatch, SetStateAction } from "react";
import { UserInterface } from "@/app/model/user";
import Header from "./header/page";
import Body from "./body/page";

interface WeeklyCalProps {
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
    setDate: Dispatch<SetStateAction<Date>>,
    setCalendarMode: Dispatch<SetStateAction<string>>,
}

export default function WeeklyCal({
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
    setDate,
    setCalendarMode }: WeeklyCalProps) {

    return (
        <div className="h-screen flex flex-col pb-7">
            <Header
                date={date}
                setDate={setDate}
                setCalendarMode={setCalendarMode}
            />

            <Body
                hours={hours}
                startOfWeek={date}
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