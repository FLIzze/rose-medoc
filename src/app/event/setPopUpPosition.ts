import { Dispatch, SetStateAction } from "react";

export default function setPopUpPosition(
    e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>, 
    setPosition: Dispatch<SetStateAction<{ x: number, y: number }>>) {

    const { clientX, clientY } = e;
    setPosition({ x: clientX, y: clientY });
}