import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { EventInterface } from "../model/event";

export default function getEvents(setEvents: Dispatch<SetStateAction<EventInterface[]>>) {
    axios.get('http://localhost:5000/api/events')
        .then((response) => {
            setEvents(response.data);
        })
        .catch((error) => {
            console.error('Error fetching events', error);
        });
}