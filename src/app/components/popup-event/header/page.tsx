import hideEventPopup from "@/app/event/hideEventPopup";
import { Dispatch, SetStateAction } from "react";

interface Header {
    setIsPopupVisible: Dispatch<SetStateAction<boolean>>
}

export default function Header({ setIsPopupVisible }: Header) {
    return (
        <div className="flex justify-end pr-5 h-9 w-full bg-medium-pink rounded-t-lg">
            <button onClick={() => hideEventPopup(setIsPopupVisible)}>
                <img
                    src="/cross.png"
                    alt="cross"
                    className="w-7 h-7 p-1 hover:bg-dark-pink rounded-full"
                />
            </button>
        </div>
    )
}