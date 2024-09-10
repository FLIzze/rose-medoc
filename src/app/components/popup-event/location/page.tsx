import { Dispatch, SetStateAction } from "react";

interface LocationProps {
    location: string,
    setLocation: Dispatch<SetStateAction<string>>,
}

export default function Location({ location, setLocation }: LocationProps) {
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
                            onClick={() => setLocation("Piece de vie")}
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

            {(location == "Piece de vie" || location == "Etage") ? (
                <label htmlFor="inside">
                    <div className="flex flex-col">
                        <div className="flex gap-3">
                            <input
                                defaultChecked
                                type="radio"
                                name="inside"
                                id="main-room"
                                onClick={() => setLocation("Piece de vie")}
                            />
                            <label htmlFor="main-room">Piece de vie</label>
                        </div>
                        <div className="flex gap-3">
                            <input type="radio"
                                name="inside"
                                id="upper-room"
                                onClick={() => setLocation("Etage")}
                            />
                            <label htmlFor="upper-room">Etage</label>
                        </div>
                    </div>
                </label>
            ) : (
                <div>
                    <input
                        type="text"
                        id=""
                        placeholder="Ajouter une adresse"
                        className="py-2 text-left px-2 hover:bg-gray-100 w-full outline-none focus:border-gray-400 transition-all border-b border-white h-9"
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
            )}
        </div>
    )
}