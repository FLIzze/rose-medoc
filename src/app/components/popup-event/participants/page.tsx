"use client";

import { UserInterface } from "@/app/model/user";
import { Dispatch, SetStateAction, useState } from "react";

interface ParticipantsProps {
    setParticipants: Dispatch<SetStateAction<UserInterface[]>>,
    participants: UserInterface[],
    users: UserInterface[],
    currentUser: UserInterface | undefined,
}

export default function Participants({ setParticipants, participants, users, currentUser } : ParticipantsProps) {
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
    return (
        <div>
            <div className="flex items-center">
                <input
                    type="text"
                    className="py-2 text-left px-2 w-full outline-none transition-all h-9 hover:bg-very-light-pink rounded-lg focus:bg-very-light-pink"
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
                    className="absolute mt-1 rounded-lg w-72 max-h-48 h-fit bg-white overflow-scroll border border-dark-pink"
                    id="participantsPopUp"
                >
                    {users
                        .filter(user =>
                            (user.name.toLowerCase().includes(participantsInput.toLowerCase()) ||
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
                                (user.name.toLowerCase().includes(participantsInput.toLowerCase()) ||
                                    user.firstName.toLowerCase().includes(participantsInput.toLowerCase())) &&
                                user.id !== currentUser?.id &&
                                !participants.some(participant => participant.id === user.id)
                            )
                            .map((user, index) => (
                                <div key={index}>
                                    <button
                                        onClick={() => {
                                            setParticipants([...participants, user]);
                                            hideParticipantsPopUp();
                                        }}
                                        className="hover:bg-very-light-pink w-full h-full p-1 pl-3 text-left">
                                        {user.name} {user.firstName}
                                    </button>
                                </div>
                            ))
                    )}
                </div>
            )}

            <div className="ml-7">
                {participants.map((participant, index) => (
                    <div key={index}>
                        <div className="flex justify-between hover:bg-very-light-pink rounded-lg pl-2">
                            <p>{participant.name}</p>
                            <button
                                onClick={() => removeParticipant(participant.id)}
                                className="mr-3">
                                x
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}