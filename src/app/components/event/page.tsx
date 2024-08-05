interface EventInterface {
    beginning: string,
    end: string,
    title: string,
    by: string,
    where: string,
    color: string
}

export default function CalEvent({ beginning, end, title, by, where, color}: EventInterface) {
    return (
        <div className={`bg-${color}-700 bg-opacity-10 rounded-l-md border-l-4 border-l-${color}-700 pl-3 text-${color}-700 text-sm py-1`}>
            <p>{beginning} - {end}</p>
            <p className="font-bold">{title}</p>
            <p>par {by}</p>
            <p>{where}</p>
        </div>
    )
}