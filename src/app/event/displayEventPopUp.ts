import { Dispatch, SetStateAction } from "react";

export default async function displayEventPopUp(
    hour: number,
    day: number,
    setCurrentDayEvent: Dispatch<SetStateAction<number>>,
    setCurrentHour: Dispatch<SetStateAction<number>>,
    setBegginingHour: Dispatch<SetStateAction<number>>,
    setEndHour: Dispatch<SetStateAction<number>>,
    setTitle: Dispatch<SetStateAction<string>>,
    setDescription: Dispatch<SetStateAction<string>>) {

    const calendarPopup = document.getElementById("calendarPopup");

    if (calendarPopup) {
        const titleInput = document.getElementById("required-title");

        if (titleInput) {
            titleInput.style.display = "none";
        }

        setCurrentDayEvent(day);
        setCurrentHour(hour);
        setBegginingHour(hour);
        setEndHour(hour + 1);

        calendarPopup.style.opacity = '1';
        calendarPopup.style.pointerEvents = 'auto';

        const handleClickOutside = (event: MouseEvent) => {
            if (!calendarPopup.contains(event.target as Node)) {
                calendarPopup.style.opacity = '0';
                calendarPopup.style.pointerEvents = 'none';
                document.removeEventListener('click', handleClickOutside);
                setTimeout(() => {
                    setTitle('');
                    setDescription('');
                }, 100);
            }
        };

        setTimeout(() => {
            document.addEventListener('click', handleClickOutside);
        }, 0);
    }
}