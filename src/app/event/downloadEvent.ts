import { EventInterface } from "../model/event";
import { UserInterface } from "../model/user";

export default function downloadEvent(event: EventInterface, users: UserInterface[]) {
    console.log('Downloading event', event, users);
}