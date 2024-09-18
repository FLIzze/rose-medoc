interface MainMonthlyCalProps {
    date: Date
}

export default function MainMonthlyCal({ date }: MainMonthlyCalProps) {
    return (
        <div className="flex gap-x-52">
            {date.getMonth()}
        </div>
    )
}