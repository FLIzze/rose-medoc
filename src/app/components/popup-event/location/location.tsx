"use client";

import { api_credentials } from "@/app/credentials";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

interface LocationProps {
    setLocation: Dispatch<SetStateAction<string>>,
    location: string
}

export default function Location({ setLocation, location }: Readonly<LocationProps>) {
    const inputRef = useRef<HTMLInputElement>(null);

    const apiPassword = api_credentials.apiKey;

    useEffect(() => {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiPassword}&libraries=places`;
        script.async = true;

        const handleScriptLoad = () => {
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

        script.onload = handleScriptLoad;
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, [apiPassword, setLocation]);

    return (
        <input
            ref={inputRef}
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Laisser vide pour Rose Medoc"
            className='outline-none pl-2 mt-2 w-full resize-none h-9 focus:border-b-2 border-medium-pink transition-all text-medium-pink ignore-click-outside'
        />
    );
}