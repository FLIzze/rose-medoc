import { Dispatch, SetStateAction } from "react";

export default async function displayMeetingPopUp(hour: number, day: number, setCurrentDayMeeting: Dispatch<SetStateAction<number>>, setCurrentHour: Dispatch<SetStateAction<number>>, setBegginingHour: Dispatch<SetStateAction<number>>, setEndHour: Dispatch<SetStateAction<number>>) {
    const calendarPopup = document.getElementById("calendarPopup");
    if (calendarPopup) {
        setCurrentDayMeeting(day);
        setCurrentHour(hour);
        setBegginingHour(hour);
        setEndHour(hour + 1);

        calendarPopup.classList.remove("hidden");
        calendarPopup.classList.add("absolute");

        document.addEventListener('click', function handleClickOutside(event) {
            if (!calendarPopup.contains(event.target as Node)) {
                calendarPopup.classList.remove('absolute');
                calendarPopup.classList.add('hidden');
                document.removeEventListener('click', handleClickOutside);
            }
        });
    }
}