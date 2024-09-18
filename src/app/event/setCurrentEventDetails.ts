import { Dispatch, SetStateAction } from "react";
import { EventInterface } from "../model/event";

export default function setCurrentEventDetails(event: EventInterface, setEvent: Dispatch<SetStateAction<EventInterface>>) {
    setEvent(event);
}
