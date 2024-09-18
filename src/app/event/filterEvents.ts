import { EventInterface } from "../model/event";
import { UserInterface } from "../model/user";

export default function filterEvent (
    events: EventInterface[],
    currentUser: UserInterface | undefined,
    own: boolean,
    tagged: boolean,
    others: boolean
) {
    return events.filter(event => {
        const isOwnEvent = event.by == currentUser?.id;
        const isTaggedEvent = event.participants.includes(currentUser!.id) && event.by != currentUser?.id;
        const isOthersEvent = !isOwnEvent && !isTaggedEvent;

        return (own && isOwnEvent) || (tagged && isTaggedEvent) || (others && isOthersEvent);
    });
};