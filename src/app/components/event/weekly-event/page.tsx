"use client";

import { UserInterface } from "@/app/model/user";
import { useState, useEffect, MouseEvent, Dispatch, SetStateAction } from "react";
import axios from "axios";
import { EventInterface } from "@/app/model/event";
import hideEventPopup from "@/app/event/hideEventPopup";
import displayEventDetails from "@/app/event/displayEventDetails";
import setCurrentEventDetails from "@/app/event/setCurrentEventDetails";
import setPopUpPosition from "@/app/event/setPopUpPosition";

interface WeeklyEventProps {
    event: EventInterface,
    daily: Boolean,
    setPosition: Dispatch<SetStateAction<{ x: number, y: number }>>,
    setIsPopupVisible: Dispatch<SetStateAction<boolean>>,
    setIsDetailsVisible: Dispatch<SetStateAction<boolean>>,
    isDetailsVisible: boolean,
    isPopupVisible: boolean,
    setEvent: Dispatch<SetStateAction<EventInterface>>,
}

export default function WeeklyEvent({
    event,
    daily,
    setPosition,
    setIsPopupVisible,
    setIsDetailsVisible,
    isDetailsVisible,
    isPopupVisible,
    setEvent }: WeeklyEventProps) {

    const [eventCreator, setEventCreator] = useState<UserInterface>({} as UserInterface);
    const eventHeight = 24 * (new Date(event.end).getHours() - new Date(event.beginning).getHours());

    useEffect(() => {
        axios.get('http://localhost:5000/api/users')
            .then((response) => {
                for (const user of response.data as UserInterface[]) {
                    if (user.id == +event.by) {
                        setEventCreator(user);
                        return;
                    }
                }
            })
            .catch((error) => {
                console.error('Error fetching events', error);
            });
    }, []);

    return (
        <div
            style={{
                backgroundColor: `${eventCreator.color}1A`,
                borderLeft: `4px solid ${eventCreator.color}`,
                color: eventCreator.color,
            }}
            onClick={(e) => {
                hideEventPopup(setIsPopupVisible);
                displayEventDetails(setIsDetailsVisible, isDetailsVisible, isPopupVisible);
                setCurrentEventDetails(event, setEvent);
                setPopUpPosition(e, setPosition);
            }}
            className={`rounded-l-md pl-3 text-sm py-1 hover:cursor-pointer pb-3 select-none h-${eventHeight} hover:opacity-100 opacity-75 transition-all ${daily ? 'w-full' : 'w-48'}`}
        >
            <p className="overflow-hidden whitespace-nowrap text-ellipsis">{new Date(event.beginning).getHours() + 2}:00 - {new Date(event.end).getHours() + 2}:00</p>
            <p className="font-bold overflow-hidden whitespace-nowrap mr-2 text-ellipsis">{event.title}</p>
            <p className="overflow-hidden whitespace-nowrap text-ellipsis">par {eventCreator.firstName} {eventCreator.name}</p>
            <p className="overflow-hidden whitespace-nowrap text-ellipsis">{event.location}</p>
        </div>
    )
}