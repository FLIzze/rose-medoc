import createEvent from "@/app/event";
import { Dispatch, SetStateAction } from "react";
import { EventInterface } from "@/app/model/event";
import checkEvents from "@/app/checkEvents";

interface PopupMeeting {
    title: string,
    setTitle: Dispatch<SetStateAction<string>>,
    description: string,
    setDescription: Dispatch<SetStateAction<string>>,
    begginingHour: number,
    setBegginingHour: Dispatch<SetStateAction<number>>,
    endHour: number,
    setEndHour: Dispatch<SetStateAction<number>>,
    currentDayMeeting: number,
    currentMonth: number,
    currentYear: number,
    currentHour: number,
    days: string[],
    dates: string[],
    months: string[],
    hours: number[],
    setEvents: Dispatch<SetStateAction<EventInterface[]>>
}

export default function PoopupMeeting({ title, setTitle, description, setDescription, begginingHour, setBegginingHour, endHour, setEndHour, currentDayMeeting, currentMonth, currentYear, currentHour, days, dates, months, hours, setEvents }: PopupMeeting) {
    async function createNewMeeting() {
        await createEvent(dates[currentDayMeeting], hours[currentHour], currentMonth, currentYear, title, description);
        setEvents([]);
        checkEvents(setEvents);
    }

    return (
        <div className="hidden w-96 h-fit bg-white rounded-lg shadow-2xl py-5" id="calendarPopup">
            <div className='flex flex-col gap-4 text-sm ml-7 mr-4'>
                <input
                    type="text"
                    placeholder='Ajouter un titre *'
                    className='border-b border-gray-300 outline-none pl-3 font-bold'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <div className='flex gap-2'>
                    <button className='py-2 px-6 hover:bg-gray-300 rounded-lg'>{days[currentDayMeeting]} {dates[currentDayMeeting]} {months[currentMonth]}</button>
                    <button className='py-2 px-6 hover:bg-gray-300 rounded-lg'>{hours[begginingHour]}:00</button>
                    <button className='py-2 px-6 hover:bg-gray-300 rounded-lg'>{hours[endHour]}:00</button>
                </div>
                <textarea
                    placeholder='Ajouter une description'
                    className='text-xs bg-gray-200 rounded-lg outline-none pl-2 pt-2 w-full h-32 resize-none font-medium'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>

                <button className='bg-green-500 rounded-lg text-white h-9' onClick={createNewMeeting}>Enregistrer</button>
            </div>
        </div>
    )
}