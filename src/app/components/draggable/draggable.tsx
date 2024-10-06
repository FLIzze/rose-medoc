"use client";

import { positionAtom, sizeAtom } from "@/app/atom";
import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";

interface DraggableProps {
    children: React.ReactNode
}

export default function Draggable({ children }: Readonly<DraggableProps>) {
    const [position, setPosition] = useAtom(positionAtom);
    const size = useAtomValue(sizeAtom);

    useEffect(() => {
        if (position.x + size.width >= window.innerWidth && position.y + size.height >= window.innerHeight) {
            setPosition({ x: position.x - size.width, y: position.y - size.height });
        } else if (position.x + size.width >= window.innerWidth) {
            setPosition({ x: position.x - size.width, y: position.y });
        } else if (position.y + size.height >= window.innerHeight) {
            setPosition({ x: position.x, y: position.y - size.height });
        } else {
            setPosition({ x: position.x, y: position.y });
        }
    }, [position.x, position.y, size.width, size.height]);

    return (
        <button
            style={{ left: position.x, top: position.y }}
            className='absolute z-10 cursor-default'
            role='button'
            tabIndex={0}  >
            {children}
        </button>
    );
}