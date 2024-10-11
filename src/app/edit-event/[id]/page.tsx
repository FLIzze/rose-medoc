"use client";

import axios from "axios";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { api_key } from "../../credentials";
import { EventInterface } from "../../model/event";
import defaultEvent from "../../event/defaultEvent";
import Location from "@/app/components/popup-event/location/location";
import getUsers from "@/app/user/getUsers";
import { UserInterface } from "@/app/model/user";
import Participants from "@/app/components/popup-event/participants/participants";
import defaultUser from "@/app/user/defaultUser";

export default function EditEvent() {
    const router = useRouter();
    const pathName = usePathname();

    const currentEventId = parseInt(pathName.split("/")[2]);

    const [event, setEvent] = useState<EventInterface>(defaultEvent);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [participantsId, setParticipantsId] = useState<number[]>([]);

    const [participants, setParticipants] = useState<UserInterface[]>([]);
    const [users, setUsers] = useState<UserInterface[]>([]);

    useEffect(() => {
        setParticipantsId(participants.map((participant) => participant.id));
    }, [participants])

    const fetchEvent = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:5000/events`, {
                headers: {
                    "x-api-key": api_key.key,
                },
            });
            const events: EventInterface[] = response.data;
            const currentEvent = events.find((event) => event.id === currentEventId);

            if (currentEvent) {
                setEvent(currentEvent);
                setTitle(currentEvent.title);
                setDescription(currentEvent.description);
                setParticipantsId(currentEvent.participants);
                const eventParticipants = currentEvent.participants.map((participantId) => {
                    return users.find((user) => user.id === participantId);
                }).filter(Boolean) as UserInterface[];
                setParticipants(eventParticipants);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération de l'évènement", error);
        }
    }, [currentEventId, users]);

    useEffect(() => {
        getUsers(setUsers);
    }, []);

    useEffect(() => {
        if (users.length > 0) {
            fetchEvent();
        }
    }, [fetchEvent, users]);

    const editEvent = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formatDateForMySQL = (dateString: Date) => {
            const date = new Date(dateString);
            date.setHours(date.getHours() + 2);
            return date.toISOString().slice(0, 19).replace('T', ' ');
        };

        const updatedEvent = {
            id: event.id,
            title: title || event.title,
            description: description || event.description,
            beginning: formatDateForMySQL(event.beginning),
            end: formatDateForMySQL(event.end),
            by: event.by,
            location: location || event.location,
            participants: participantsId,
        };

        try {
            const response = await fetch("http://localhost:5000/events", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': api_key.key
                },
                body: JSON.stringify(updatedEvent)
            });
            if (response.ok) {
                setLocation("");
                setTitle("");
                setDescription("");
                setParticipants([]);
                setParticipantsId([]);

                alert("Evènement mis à jour");
                router.push('/');
            }
        } catch (error) {
            setErrorMessage("Erreur lors de la mise à jour de l'évènement");
            console.error("Erreur lors de la mise à jour de l'évènement", error);
        }
    };

    return (
        <div className="flex text-dark-pink">
            <div className="flex flex-col w-1/2 h-min-full h-screen bg-white justify-center">
                <form
                    action="post"
                    className="flex justify-center flex-col px-10 gap-5"
                    onSubmit={(e) => editEvent(e)}
                >
                    <div className="flex flex-col">
                        <label htmlFor="title" className="font-bold">Titre</label>
                        <input
                            type="text"
                            onChange={(e) => setTitle(e.target.value)}
                            id="title"
                            placeholder={event.title}
                            className="border border-medium-pink rounded-md p-2 focus:ring-2 focus:ring-medium-pink outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label htmlFor="participants" className="font-bold">Participants</label>
                        <Participants
                            setParticipants={setParticipants}
                            participants={participants}
                            users={users}
                            currentUser={defaultUser}
                        />
                    </div>

                    {event.description !== "" ? (
                        <div className="flex flex-col">
                            <label htmlFor="description" className="font-bold">Description</label>
                            <input
                                type="text"
                                onChange={(e) => setDescription(e.target.value)}
                                id="description"
                                placeholder={event.description}
                                className="border border-medium-pink rounded-md p-2 focus:ring-2 focus:ring-medium-pink outline-none transition-all"
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            <label htmlFor="description" className="font-bold">Description</label>
                            <input
                                type="text"
                                onChange={(e) => setDescription(e.target.value)}
                                id="description"
                                placeholder='Ajouter une description'
                                className="border border-medium-pink rounded-md p-2 focus:ring-2 focus:ring-medium-pink outline-none transition-all"
                            />
                        </div>
                    )}

                    <div className="flex flex-col">
                        <p className="font-bold">Location</p>
                        <Location
                            location={location}
                            setLocation={setLocation}
                            edit={true}
                        />
                    </div>

                    <button
                        className="p-2 bg-medium-pink hover:bg-dark-pink text-white rounded-lg transition-all text-base mt-4"
                        type="submit"
                    >
                        Mettre à jour l'évènement
                    </button>
                    {errorMessage !== "" && (
                        <p className="text-red text-base">{errorMessage}</p>
                    )}
                </form>
            </div>
            <button
                className="flex justify-center w-screen h-screen bg-very-light-pink items-center"
                onClick={() => router.push("/")}
            >
                <Image
                    src="/logo.png"
                    alt="logo Rose Medoc"
                    className="object-cover cursor-pointer"
                    width={500}
                    height={500}
                    priority={true}
                />
            </button>
        </div>
    );
}