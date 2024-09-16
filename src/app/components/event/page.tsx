"use client";

import { UserInterface } from "@/app/model/user";
import { useState, useEffect } from "react";
import axios from "axios";

interface EventInterface {
    beginningHour: Number,
    endHour: Number,
    title: string,
    duration: Number,
    id: Number,
    location: string
}

export default function CalEvent({ beginningHour, endHour, title, duration, id, location }: EventInterface) {
    const [by, setBy] = useState<UserInterface>({} as UserInterface);
    const eventHeight = 24 * +duration;

    useEffect(() => {
        axios.get('http://localhost:5000/api/users')
            .then((response) => {
                for (const user of response.data as UserInterface[]) {
                    if (user.id == +id) {
                        setBy(user);
                        return;
                    } 
                }
            })
            .catch((error) => {
                console.error('Error fetching events', error);
            });
    }, [id]);

    return (
        <div 
            style={{
                backgroundColor: `${by.color}1A`,
                borderLeft: `4px solid ${by.color}`,
                color: by.color,
            }}
            className={`rounded-l-md pl-3 text-sm py-1 hover:cursor-pointer pb-3 select-none h-${eventHeight}`}
        >
            <p className="overflow-hidden whitespace-nowrap text-ellipsis">{beginningHour.toString()}:00 - {(endHour).toString()}:00</p>
            <p className="font-bold overflow-hidden whitespace-nowrap mr-2 text-ellipsis">{title}</p>
            <p className="overflow-hidden whitespace-nowrap text-ellipsis">par {by.firstName} {by.name}</p>
            <p className="overflow-hidden whitespace-nowrap text-ellipsis">{location}</p>
        </div>
    )
}