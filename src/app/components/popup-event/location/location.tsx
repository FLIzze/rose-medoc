"use client";

// import { isApiLoadedAtom } from "@/app/atom";
// import { api_credentials } from "@/app/credentials";
// import { useAtom } from "jotai";
import { Dispatch, SetStateAction } from "react";

interface LocationProps {
    setLocation: Dispatch<SetStateAction<string>>,
    location: string,
    edit: boolean
}

export default function Location({ setLocation, location, edit }: Readonly<LocationProps>) {
    // const inputRef = useRef<HTMLInputElement>(null);
    // const apiPassword = api_credentials.apiKey;

    // const [isApiLoaded, setIsApiLoaded] = useAtom(isApiLoadedAtom);

    // useEffect(() => {
    //     // Ensure that the script is added only once
    //     if (!isApiLoaded) {
    //         const script = document.createElement("script");
    //         script.src = `https://maps.googleapis.com/maps/api/js?key=${apiPassword}&libraries=places`;
    //         script.async = true;

    //         script.onload = () => {
    //             setIsApiLoaded(true); // Mark the API as loaded
    //             initializeAutocomplete();
    //         };

    //         document.head.appendChild(script);

    //     } else {
    //         initializeAutocomplete();
    //     }
    // }, [apiPassword, setLocation, isApiLoaded]);

    // const initializeAutocomplete = () => {
    //     if (!inputRef.current || !window.google || !window.google.maps) return; // Ensure google object is ready

    //     const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
    //         componentRestrictions: { country: 'fr' }
    //     });

    //     autocomplete.addListener("place_changed", () => {
    //         const place = autocomplete.getPlace();
    //         if (place.formatted_address) {
    //             setLocation(place.formatted_address);
    //         }
    //     });
    // };

    return (
        <input
            // ref={inputRef}
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Laisser vide pour Rose Medoc"
            className={!edit ?
                "outline-none pl-2 mt-2 w-full resize-none h-9 focus:border-b-2 border-medium-pink transition-all text-medium-pink ignore-click-outside" :
                "border border-medium-pink rounded-md p-2 focus:ring-2 focus:ring-medium-pink outline-none transition-all"}
        />
    );
}
