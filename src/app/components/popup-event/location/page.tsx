import { Dispatch, SetStateAction, useEffect, useRef } from "react";

interface LocationProps {
    setLocation: Dispatch<SetStateAction<string>>
}

export default function Location({ setLocation }: LocationProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!inputRef.current) return;

        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyACMsKni9JGHzeEMwU7R_H2gk0h9H-ZeOI&libraries=places`;
        script.async = true;
        script.onload = () => {
            if (!inputRef.current) return;

            const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
                componentRestrictions: { country: 'fr' }
            });

            autocomplete.addListener("place_changed", () => {
                const place = autocomplete.getPlace();
                if (place.formatted_address) {
                    setLocation(place.formatted_address);
                }
            });
        };
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, [setLocation]);
    
    return (
        <input
            ref={inputRef}
            type="text"
            placeholder="Laisser vide pour Rose Medoc"
            className="py-2 text-left px-2 w-full outline-none transition-all h-9 bg-very-light-pink"
        />
    )
}