import { UserInterface } from "@/app/model/user";
import { Dispatch, SetStateAction } from "react";

interface ParticipantProps {
    users: UserInterface[],
    participants: UserInterface[],
    setParticipants: Dispatch<SetStateAction<UserInterface[]>>,
    participantsInput: string,
    setParticipantsInput: Dispatch<SetStateAction<string>>,
    currentUser: UserInterface | undefined,
}

export default function Participant({
    users,
    participants,
    setParticipants,
    participantsInput,
    setParticipantsInput,
    currentUser }: ParticipantProps) {

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
        <div className="w-full">
            <input
                type="text"
                className="py-2 text-left px-2 hover:bg-gray-100 w-full outline-none focus:border-gray-400 transition-all border-b border-white h-9"
                placeholder="Ajouter des participants"
                onChange={(e) => {
                    setParticipantsInput(e.target.value);
                    displayParticipantsPopUp();
                }}
                id="participantsInput"
            />

            {participantsInput != "" && (
                <div
                    className="absolute border border-gray-200 mt-1 rounded-sm w-72 max-h-32 h-fit bg-white overflow-scroll"
                    id="participantsPopUp"
                >
                    {users
                        .filter(user => 
                            user.name.toLowerCase().includes(participantsInput.toLowerCase()) &&
                            user.id !== currentUser?.id &&
                            !participants.some(participant => participant.id === user.id)
                        ).length === 0 ? (
                            <div className="p-2 text-center text-gray-500">
                                <p>
                                    Aucun participant éligible
                                </p>
                            </div>
                        ) : (
                            users
                                .filter(user => 
                                    user.name.toLowerCase().includes(participantsInput.toLowerCase()) &&
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
                                            className="hover:bg-gray-100 w-full h-full p-2 text-left">
                                            {user.name}
                                        </button>
                                    </div>
                                ))
                        )}
                </div>
            )}

            <div className="ml-7">
                {participants.map((participant, index) => (
                    <div key={index}>
                        <div className="flex justify-between hover:bg-gray-100 rounded-sm">
                            <p className="p-1">{participant.name}</p>
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