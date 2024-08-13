import { Dispatch, SetStateAction } from "react";

export default async function displayMeetingPopUp(
    hour: number,
    day: number,
    setCurrentDayMeeting: Dispatch<SetStateAction<number>>,
    setCurrentHour: Dispatch<SetStateAction<number>>,
    setBegginingHour: Dispatch<SetStateAction<number>>,
    setEndHour: Dispatch<SetStateAction<number>>,
    setTitle: Dispatch<SetStateAction<string>>,
    setDescription: Dispatch<SetStateAction<string>>) {

    const calendarPopup = document.getElementById("calendarPopup");
    if (calendarPopup) {
        setCurrentDayMeeting(day);
        setCurrentHour(hour);
        setBegginingHour(hour);
        setEndHour(hour + 1);

        calendarPopup.style.opacity = '1';
        calendarPopup.style.pointerEvents = 'auto'

        document.addEventListener('click', function handleClickOutside(event) {
            if (!calendarPopup.contains(event.target as Node)) {
                calendarPopup.style.opacity = '0';
                calendarPopup.style.pointerEvents = 'none'
                document.removeEventListener('click', handleClickOutside);
                setTimeout(() => {
                    setTitle('');
                    setDescription('');
                }, 100);
            }
        });
    }
}