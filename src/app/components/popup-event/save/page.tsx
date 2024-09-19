import addEvent from "@/app/event/addEvent";
import hideEventPopup from "@/app/event/hideEventPopup";
import { EventInterface } from "@/app/model/event";
import { UserInterface } from "@/app/model/user";
import { Dispatch, SetStateAction } from "react";

interface SaveProps {
    title: string,
    description: string,
    setEvents: Dispatch<SetStateAction<EventInterface[]>>,
    currentUser: UserInterface | undefined,
    participants: UserInterface[],
    location: string,
    setIsPopupVisible: Dispatch<SetStateAction<boolean>>,
    date: Date
}

export default function Save({
    title,
    description,
    setEvents,
    currentUser,
    participants,
    location,
    setIsPopupVisible,
    date }: SaveProps) {

    return (
        <div className="flex justify-end mt-4">
            <button
                className='rounded-sm h-10 border border-gray-200 transition-all hover:bg-gray-100 w-2/5'
                onClick={() => {
                    addEvent(title, description, setEvents, currentUser, participants, location, date);
                    hideEventPopup(setIsPopupVisible)
                }}>
                Enregistrer
            </button>
        </div>
    )
}