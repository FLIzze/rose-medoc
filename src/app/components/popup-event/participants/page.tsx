"use client";

import { UserInterface } from "@/app/model/user";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface ParticipantsProps {
    setParticipants: Dispatch<SetStateAction<UserInterface[]>>,
    participants: UserInterface[],
    users: UserInterface[],
    currentUser: UserInterface | undefined,
}

export default function Participants({ setParticipants, participants, users, currentUser }: Readonly<ParticipantsProps>) {
    const [participantsInput, setParticipantsInput] = useState("");

    function removeParticipant(participantId: number) {
        setParticipants(participants.filter(participant => participant.id !== participantId));
    }

    function hideParticipantsPopUp() {
        const participantsInput = document.getElementById("participantsInput") as HTMLInputElement;
        if (participantsInput) {
            participantsInput.value = "";
        }

        const participantsPopUp = document.getElementById("participantsPopUp") as HTMLDivElement;
        if (participantsPopUp) {
            participantsPopUp.style.display = "none";
        }
    }

    function displayParticipantsPopUp() {
        const participantsPopUp = document.getElementById("participantsPopUp") as HTMLDivElement;
        if (participantsPopUp) {
            participantsPopUp.style.display = "block";
        }
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const participantsPopUp = document.getElementById("participantsPopUp") as HTMLDivElement;
            if (participantsPopUp && !participantsPopUp.contains(event.target as Node)) {
                hideParticipantsPopUp();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);

    return (
        <div className="mt-2">
            <div className="flex items-center">
                <input
                    type="text"
                    className='outline-none pl-2 w-full resize-none h-9 focus:border-b-2 border-medium-pink transition-all text-medium-pink'
                    placeholder="Ajouter des participants"
                    onChange={(e) => {
                        setParticipantsInput(e.target.value);
                        displayParticipantsPopUp();
                    }}
                    id="participantsInput"
                />
            </div>

            {participantsInput !== "" && (
                <div
                    className="absolute mt-1 rounded-lg w-72 max-h-48 h-fit bg-white overflow-scroll border border-medium-pink"
                    id="participantsPopUp"
                >
                    {users
                        .filter(user =>
                            (user.lastName.toLowerCase().includes(participantsInput.toLowerCase()) ||
                                user.firstName.toLowerCase().includes(participantsInput.toLowerCase())) &&
                            user.id !== currentUser?.id &&
                            !participants.some(participant => participant.id === user.id)
                        ).length === 0 ? (
                        <div className="p-2 text-center">
                            <p>
                                Aucun participant éligible
                            </p>
                        </div>
                    ) : (
                        users
                            .filter(user =>
                                (user.lastName.toLowerCase().includes(participantsInput.toLowerCase()) ||
                                    user.firstName.toLowerCase().includes(participantsInput.toLowerCase())) &&
                                user.id !== currentUser?.id &&
                                !participants.some(participant => participant.id === user.id)
                            )
                            .map((user, index) => (
                                <button
                                    key={index}
                                    onClick={(e) => {
                                        setParticipants([...participants, user]);
                                        hideParticipantsPopUp();
                                    }}
                                    className="hover:bg-very-light-pink w-full h-full p-1 pl-3 text-left">
                                    <div className="flex items-center">
                                        <img src={`data:image/jpeg;base64,${user.pp}`} alt="Profile Picture" className='w-8 h-8 rounded-full mr-2' />
                                        <p>{user.lastName} {user.firstName}</p>
                                    </div>
                                </button>
                            ))
                    )}
                </div>
            )
            }

            {participants.map((participant, index) => (
                <div
                    className="flex justify-between hover:bg-very-light-pink rounded-lg p-2"
                    key={index}
                >
                    <div className="flex items-center">
                        <img src={`data:image/jpeg;base64,${participant.pp}`} alt="Profile Picture" className='w-7 h-7 rounded-full mr-2' />
                        <p>{participant.lastName} {participant.firstName}</p>
                    </div>
                    <button
                        onClick={() => removeParticipant(participant.id)}
                        className="mr-3">
                        x
                    </button>
                </div>
            ))}
        </div >
    )
}