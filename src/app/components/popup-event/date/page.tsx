import { Dispatch, SetStateAction } from 'react';

interface DateProps {
    isEndHoursVisible: boolean,
    isBeginningHoursVisible: boolean,
    setIsBeginningHoursVisible: Dispatch<SetStateAction<boolean>>,
    setIsEndHoursVisible: Dispatch<SetStateAction<boolean>>,
    beginningHoursRef: React.RefObject<HTMLDivElement>,
    endHoursRef: React.RefObject<HTMLDivElement>,
    months: string[],
    date: Date
}

export default function Date({
    isEndHoursVisible,
    isBeginningHoursVisible,
    setIsBeginningHoursVisible,
    setIsEndHoursVisible,
    beginningHoursRef,
    endHoursRef,
    months,
    date }: DateProps) {

    function toggleBeginningHours() {
        if (isEndHoursVisible) {
            setIsEndHoursVisible(false);
        }

        setIsBeginningHoursVisible(prevState => !prevState);
    }

    function toggleEndHours() {
        if (isBeginningHoursVisible) {
            setIsBeginningHoursVisible(false);
        }

        setIsEndHoursVisible(prevState => !prevState);
    }

    // function handleBeginningHourClick(hour: number) {
    //     setBeginningHour(hour);
    //     if (hour >= endHour) {
    //         setEndHour(hour + 1);
    //     } else if (hour < endHour - 4) {
    //         setEndHour(hour + 1);
    //     }
    //     setIsBeginningHoursVisible(false);
    // }

    // function handleEndHourClick(hour: number) {
    //     setEndHour(hour);
    //     setIsEndHoursVisible(false);
    // }

    return (
        <div className="flex items-center">
            <img
                src="clock.png"
                alt="horloge"
                className='w-4 h-4 mr-4'
            />

            <button
                className="hover:bg-gray-100 transition-all py-2 px-2 text-left flex-wrap whitespace-nowrap"
            >
                {date.getDate()} {months[date.getMonth()]} {date.getFullYear()}
            </button>

            <div>
                <button
                    className='py-2 text-left hover:bg-gray-100 px-2'
                    onClick={toggleBeginningHours}
                >
                    {date.getHours()}:00
                </button>

                <div
                    ref={beginningHoursRef}
                    className={`absolute border border-gray-200 rounded-sm h-52 overflow-scroll flex-col bg-white mt-1 ${isBeginningHoursVisible ? 'flex' : 'hidden'}`}
                    id="beginningHours"
                    style={{ zIndex: 10 }}
                >
                    {/* {hours.map((hour, index) => (
                        <button
                            key={index}
                            className="hover:bg-gray-100 text-left p-2 w-32"
                            onClick={() => handleBeginningHourClick(hour)}
                        >
                            {hour}:00
                        </button>
                    ))} */}
                </div>
            </div>

            <p className="py-2 px-1 text-center">-</p>

            <div className="w-full">
                <button
                    className='py-2 text-left px-2 hover:bg-gray-100'
                    onClick={toggleEndHours}
                >
                    {date.getHours() + 1}:00
                </button>

                <div
                    ref={endHoursRef}
                    className={`absolute border border-gray-200 rounded-sm h-fit flex-col bg-white mt-1 ${isEndHoursVisible ? 'flex' : 'hidden'}`}
                    id="endHours"
                    style={{ zIndex: 10 }}
                >
                    {/* {hours.map((hour, index) => (
                        (hour > beginningHour && hour <= beginningHour + 4 && (
                            <button
                                key={index}
                                className="hover:bg-gray-100 p-2 text-left w-32"
                                onClick={() => handleEndHourClick(hour)}
                            >
                                {hour}:00
                            </button>
                        ))
                    ))} */}
                </div>
            </div>
        </div>
    )
}