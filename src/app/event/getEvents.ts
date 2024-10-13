import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { EventInterface } from "../model/event";
import { api_key, api_url } from "../credentials";

export default function getEvents(setEvents: Dispatch<SetStateAction<EventInterface[]>>) {
        axios.get(`${api_url.url}events`, {
            headers: {
                'x-api-key': api_key.key
            }
        })
            .then((response) => {
                setEvents(response.data);
            })
            .catch((error) => {
                console.error('Error fetching events', error);
            });
}