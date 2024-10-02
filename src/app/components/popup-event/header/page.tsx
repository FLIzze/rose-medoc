import hideEventPopup from "@/app/event/hideEventPopup";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";

interface Header {
    setIsPopupVisible: Dispatch<SetStateAction<boolean>>
}

export default function Header({ setIsPopupVisible }: Readonly<Header>) {
    return (
        <div className="flex justify-end pr-5 h-9 w-full bg-medium-pink rounded-t-lg">
            <button onClick={() => hideEventPopup(setIsPopupVisible)}>
                <Image
                    src="/cross.png"
                    alt="cross"
                    className="p-1 hover:bg-dark-pink rounded-full"
                    width={10}
                    height={10}
                />
            </button>
        </div>
    )
}