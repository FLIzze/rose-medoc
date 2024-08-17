import { useState, useRef, useEffect } from "react";

interface DraggableProps {
    children: React.ReactNode;
    pos : { x: number, y: number };
    size : { width: number, height: number };
}

export default function Draggable({ children, pos, size }: Readonly<DraggableProps>) {
    const [position, setPosition] = useState({ x: pos.x, y: pos.y });

    useEffect(() => {
        if (pos.x + size.width >= window.innerWidth && pos.y + size.height >= window.innerHeight) {
            setPosition({ x: pos.x - size.width, y: pos.y - size.height });
        } else if (pos.x + size.width >= window.innerWidth) {
            setPosition({ x: pos.x - size.width, y: pos.y });
        } else if (pos.y + size.height >= window.innerHeight) {
            setPosition({ x: pos.x, y: pos.y - size.height });
        } else {
            setPosition({ x: pos.x, y: pos.y });
        }
    }, [pos.x, pos.y]);

    return (
        <div
            style={{ left: position.x, top: position.y }}
            className='absolute z-10'
            role='button'
            tabIndex={0}  >
                {children}
        </div>
    );
}