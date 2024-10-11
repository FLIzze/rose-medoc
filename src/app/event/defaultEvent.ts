import { EventInterface } from "../model/event";

const defaultEvent: EventInterface = {
    id: 0,
    title: '',
    description: '',
    beginning: new Date(),
    end: new Date(),
    by: 0,
    location: '',
    participants: []
}

export default defaultEvent;