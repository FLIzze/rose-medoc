interface EventInterface {
    beginningHour: Number,
    endHour: Number,
    title: string,
    color: string,
    duration: Number
}

export default function CalEvent({ beginningHour, endHour, title, color, duration }: EventInterface) {
    const eventHeight = 24 * +duration;

    return (
        <div className={`bg-${color}-700 bg-opacity-10 rounded-l-md border-l-4 border-l-${color}-700 pl-3 text-${color}-700 text-sm py-1 hover:cursor-pointer hover:bg-opacity-15 h-${eventHeight} pb-3 select-none`}>
            <p>{beginningHour.toString()}:00 - {(endHour).toString()}:00</p>
            <p className="font-bold overflow-hidden whitespace-nowrap mr-2 text-ellipsis">{title}</p>
            <p>par Moi</p>
            <p>Locaux</p>
        </div>
    )
}