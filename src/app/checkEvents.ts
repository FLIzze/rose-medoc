import axios from "axios";
import { EventInterface } from "./model/event";
import { Dispatch, SetStateAction } from "react";

export default function checkEvents(setEvents: Dispatch<SetStateAction<EventInterface[]>>) {
    axios.get('http://localhost:5000/api/events')
        .then((response) => {
            setEvents(response.data);
        })
        .catch((error) => {
            console.error('Error fetching events', error);
        });
}