import axios from "axios";
import getEvents from "./getEvents";
import { Dispatch, SetStateAction } from "react";
import { EventInterface } from "../model/event";
import { api_key, api_url } from "../credentials";

export default async function deleteEvent(id: number | undefined, setEvents: Dispatch<SetStateAction<EventInterface[]>>) {
  try {
    const response = await axios.delete(`${api_url.url}events`, {
      headers: {
        'x-api-key': api_key.key
      },
      data: { id }
    });

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    getEvents(setEvents);
  } catch (error) {
    console.error('Error deleting event', error);
  }
}