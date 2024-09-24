"use client";

import hideEventPopup from "@/app/event/hideEventPopup";
import { EventInterface } from "@/app/model/event"
import { UserInterface } from "@/app/model/user";
import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface MonthlyEventProps {
    event: EventInterface,
    setIsPopupVisible: Dispatch<SetStateAction<boolean>>
}

export default function MonthlyEvent({ event, setIsPopupVisible }: MonthlyEventProps) {
    const [eventCreator, setEventCreator] = useState<UserInterface>({} as UserInterface);

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
    }, [event.by]);

    useEffect(() => {
        function handleClickOutside() {
            hideEventPopup(setIsPopupVisible);
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    })

    return (
        <div
            style={{
                backgroundColor: `${eventCreator.color}1A`,
                borderLeft: `4px solid ${eventCreator.color}`,
                color: eventCreator.color,
            }}
            className={`rounded-l-md pl-2 text-sm select-none hover:opacity-100 opacity-75 transition-all h-6 pr-3 w-full flex text-left`}
        >
            <p className="overflow-hidden whitespace-nowrap text-ellipsis w-full">{new Date(event.beginning).getHours() + 2}:00 {event.title}</p>
        </div>
    )
}