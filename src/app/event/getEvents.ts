import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { EventInterface } from "../model/event";

export default function getEvents(setEvents: Dispatch<SetStateAction<EventInterface[]>>) {
    axios.get('https://api.calendar.alexandrebel.me/events')
        .then((response) => {
            setEvents(response.data);
        })
        .catch((error) => {
            console.error('Error fetching events', error);
        });
}