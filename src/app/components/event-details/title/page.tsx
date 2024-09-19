import { EventInterface } from "@/app/model/event"

interface TitleProps {
    event: EventInterface
}

export default function Title({ event }: TitleProps) {
    return (
        <div>
            <div className="bg-light-pink flex items-center justify-center p-2 pb-4">
                <img
                    src="title.png"
                    alt="titre"
                    className='w-5 h-5 mx-3'
                />
            </div>
            <div className="pb-4 p-2">
                <h1 className="font-bold text-lg">{event.title}
                    <p className="text-xs">{ }</p>
                </h1>
            </div>
        </div>
    )
}