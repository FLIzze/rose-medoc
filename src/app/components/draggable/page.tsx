import { useState, useRef, useEffect } from "react";

interface DraggableProps {
    children: React.ReactNode;
    posX: number;
    posY: number;
}

export default function Draggable({ children, posX, posY }: Readonly<DraggableProps>) {
    const [position, setPosition] = useState({ x: posX, y: posY });
    const [isDragging, setIsDragging] = useState(false);
    const initialClickRef = useRef({ offsetX: 0, offsetY: 0 });
    const popUpSize = { width: 382, height: 300 };

    useEffect(() => {
        if (posX + popUpSize.width >= window.innerWidth && posY + popUpSize.height >= window.innerHeight) {
            setPosition({ x: posX - popUpSize.width, y: posY - popUpSize.height });
        } else if (posX + popUpSize.width >= window.innerWidth) {
            setPosition({ x: posX - popUpSize.width, y: posY });
        } else if (posY + popUpSize.height >= window.innerHeight) {
            setPosition({ x: posX, y: posY - popUpSize.height });
        } else {
            setPosition({ x: posX, y: posY });
        }
    }, [posX, posY]);

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    function handleMouseMove(e: MouseEvent) {
        if (isDragging) {
            let offsetX = e.clientX - initialClickRef.current.offsetX;
            let offsetY = e.clientY - initialClickRef.current.offsetY;

            setPosition({ x: offsetX, y: offsetY });
        }
    };

    function handleMouseUp() {
        setIsDragging(false);
    };

    function handleMouseDown(e: React.MouseEvent<HTMLDivElement>) {
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
            return;
        }
    
        setIsDragging(true);
        const boundingRect = e.currentTarget.getBoundingClientRect();
        const offsetX = e.clientX - boundingRect.left;
        const offsetY = e.clientY - boundingRect.top;
        initialClickRef.current = { offsetX, offsetY };
    };
    
    return (
        <div
            style={{ left: position.x, top: position.y }}
            onMouseDown={handleMouseDown}
            className='absolute'
            role='button'
            tabIndex={0}    
        >
            {children}
        </div>
    );
}