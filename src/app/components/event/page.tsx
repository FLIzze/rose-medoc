import { UserInterface } from "@/app/model/user";
import { useState, useEffect } from "react";
import axios from "axios";

interface EventInterface {
    beginningHour: Number,
    endHour: Number,
    title: string,
    duration: Number,
    id: Number
}

export default function CalEvent({ beginningHour, endHour, title, duration, id }: EventInterface) {
    const [by, setBy] = useState<UserInterface>();
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
    }, []);

    return (
        <div className={`bg-${by?.color}-700 bg-opacity-10 rounded-l-md border-l-4 border-l-${by?.color}-700 pl-3 text-${by?.color}-700 text-sm py-1 hover:cursor-pointer hover:bg-opacity-15 h-${eventHeight} pb-3 select-none`}>
            <p>{beginningHour.toString()}:00 - {(endHour).toString()}:00</p>
            <p className="font-bold overflow-hidden whitespace-nowrap mr-2 text-ellipsis">{title}</p>
            <p>par {by?.name}</p>
            <p>Locaux</p>
        </div>
    )
}