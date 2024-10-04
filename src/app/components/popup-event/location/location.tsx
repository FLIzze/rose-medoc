"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

interface LocationProps {
    setLocation: Dispatch<SetStateAction<string>>,
    location: string
}

export default function Location({ setLocation, location }: Readonly<LocationProps>) {
    const inputRef = useRef<HTMLInputElement>(null);
    
    const [apiKey, setApiKey] = useState<string>("");

    const filePath = "/google_api_key.json";

    useEffect(() => {
        fetch(filePath)
            .then(response => response.json())
            .then(data => {
                setApiKey(data.apiKey);
            })
            .catch(error => {
                console.error("Error fetching API key:", error);
            });
    }, []);

    useEffect(() => {
        if (!inputRef.current || !apiKey) return;

        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
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
    }, [apiKey, setLocation]);

    return (
        <input
            ref={inputRef}
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Laisser vide pour Rose Medoc"
            className='outline-none pl-2 mt-2 w-full resize-none h-9 focus:border-b-2 border-medium-pink transition-all text-medium-pink'
        />
    )
}