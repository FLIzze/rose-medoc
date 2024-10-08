import { EventInterface } from "@/app/model/event";
import { UserInterface } from "@/app/model/user";
import Image from "next/image";

interface ParticipantsProps {
    event: EventInterface,
    users: UserInterface[],
}

export default function Participants({ event, users }: Readonly<ParticipantsProps>) {
    return (
        <>
            {event.participants && event.participants.length > 1 && (
                <>
                    <div className="bg-light-pink flex items-center justify-center p-2 pb-4">
                        <Image
                            src="/person.png"
                            alt="participants"
                            className='mx-3'
                            width={18}
                            height={18}
                        />
                    </div>
                    <div className="flex flex-col pb-4 pt-2">
                        <p className="font-bold">{event.participants.length} participants</p>
                        {event.participants.map((participantId, index) => {
                            const participant = users.find(user => user.id === participantId);
                            return (
                                <div
                                    className="flex items-center mt-1"
                                    key={event.id + participantId + index}
                                >
                                    <Image
                                        src={`data:image/jpeg;base64,${participant?.pp}`}
                                        alt="Profile Picture"
                                        className='rounded-full mr-2'
                                        width={25}
                                        height={25}
                                    />
                                    <p className={`${participant?.id === event.by ? 'font-bold' : ''}`}>{participant?.lastName} {participant?.firstName}</p>                                        </div>
                            );
                        })}
                    </div>
                </>
            )}

            {event.participants && event.participants.length == 1 && (() => {
                const participant = users.find(user => user.id == event.participants[0]);
                return (
                    <>
                        <div className="bg-light-pink flex items-center justify-center p-2 pb-4">
                            <Image
                                src="/person.png"
                                alt="participants"
                                className='mx-3'
                                width={18}
                                height={18}
                            />
                        </div>
                        <div className="flex items-center pb-4 pt-2">
                            <div className="flex items-center mt-1">
                                <Image
                                    src={`data:image/jpeg;base64,${participant?.pp}`}
                                    alt="Profile Picture"
                                    className='w-6 h-6 rounded-full mr-2'
                                    width={20}
                                    height={20}
                                />
                                <p className="font-bold">{participant?.lastName} {participant?.firstName}</p>
                            </div>
                        </div>
                    </>
                );
            })()}
        </>
    )
}