import axios from "axios";
import getEvents from "./getEvents";
import { Dispatch, SetStateAction } from "react";
import { EventInterface } from "../model/event";

export default async function deleteEvent(id: number, setEvents: Dispatch<SetStateAction<EventInterface[]>>) {
  try {
    const response = await axios.delete(`http://localhost:5000/api/events`, {
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