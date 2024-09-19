interface HeaderProps {
    days: string[],
    startOfWeek: Date,
}

export default function Header({ days, startOfWeek } : HeaderProps) {
    return (
        <div className="flex-none grid grid-cols-9 w-full pt-6" style={{ gridTemplateColumns: '4rem repeat(8, 1fr)' }}>
            <div className="bg-white">
                {/* Empty cell for the top-left corner */}
            </div>
            {days.map((_, dayIndex) => {
                const currentDate = new Date(startOfWeek);
                currentDate.setDate(startOfWeek.getDate() + dayIndex);
                return (
                    <div key={dayIndex} className="bg-white">
                        <p className="text-light-pink text-xs">{days[(dayIndex) % days.length]}</p>
                        <p className="text-2xl font-semibold text-dark-pink">{currentDate.getDate()}</p>
                    </div>
                );
            })}
        </div>
    )
}