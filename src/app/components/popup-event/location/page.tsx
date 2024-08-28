import { useState } from "react"

export default function Location() {
    const [location, setLocation] = useState("inside");

    return (
        <div>
            <label htmlFor="location">
                <div className="flex justify-around">
                    <div className="flex gap-2">
                        <input
                            type="radio"
                            name="location"
                            id="inside"
                            defaultChecked
                            onClick={() => setLocation("inside")}
                        />
                        <label htmlFor="inside">Rose Medoc</label>
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="radio"
                            name="location"
                            id="outside"
                            onClick={() => setLocation("outside")}
                        />
                        <label htmlFor="outside">Exterieur</label>
                    </div>
                </div>
            </label>

            {location === "inside" && (
                <label htmlFor="inside">
                    <div className="flex flex-col">
                        <div className="flex gap-3">
                            <input
                                defaultChecked
                                type="radio"
                                name="inside"
                                id="main-room"
                            />
                            <label htmlFor="main-room">Piece de vie</label>
                        </div>
                        <div className="flex gap-3">
                            <input type="radio"
                                name="inside"
                                id="upper-room"
                            />
                            <label htmlFor="upper-room">Etage</label>
                        </div>
                    </div>
                </label>
            )}

            {location === "outside" && (
                <div>
                    <input
                        type="text"
                        id=""
                        placeholder="Ajouter une adresse"
                        className="py-2 text-left px-2 hover:bg-gray-100 w-full outline-none focus:border-gray-400 transition-all border-b border-white h-9"
                    />
                </div>
            )}
        </div>
    )
}