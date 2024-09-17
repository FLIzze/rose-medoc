"use client";

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import WeeklyCal from './components/weekly-cal/page';
import { UserInterface } from './model/user';
import Sidebar from './components/sidebar/page';
import Login from './components/login/page';

export default function Home() {
    const [currentDay, setCurrentDay] = useState(new Date().getDate());
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    const [localMonth, setLocalMonth] = useState(currentMonth);
    const [localYear, setLocalYear] = useState(currentYear);

    const [currentDate, setCurrentDate] = useState(new Date(currentYear, localMonth));

    const [location, setLocation] = useState("Rose Medoc");

    const [currentUser, setCurrentUser] = useState<UserInterface>();

    const [own, setOwn] = useState(true);
    const [tagged, setTagged] = useState(true);
    const [others, setOthers] = useState(false);

    useEffect(() => {
        const userId = Cookies.get('userId');
        if (userId) {
            setCurrentUser({ id: userId } as unknown as UserInterface);
        }
    }, []);

    return (
        <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
            {(currentUser) ? (
                <div className="bg-white h-screen overflow-hidden">
                    <div className="flex mt-5">
                        <div>
                            <Sidebar
                                setCurrentDay={setCurrentDay}
                                currentMonth={currentMonth}
                                setCurrentMonth={setCurrentMonth}
                                currentYear={currentYear}
                                setCurrentYear={setCurrentYear}
                                localMonth={localMonth}
                                setLocalMonth={setLocalMonth}
                                currentDate={currentDate}
                                setCurrentDate={setCurrentDate}
                                own={own}
                                tagged={tagged}
                                others={others}
                                setOwn={setOwn}
                                setTagged={setTagged}
                                setOthers={setOthers}
                                localYear={localYear}
                                setLocalYear={setLocalYear}
                            />
                        </div>

                        <div className="w-screen">
                            <WeeklyCal
                                currentUser={currentUser}
                                setCurrentUser={setCurrentUser}
                                cookie={Cookies.get()}
                                own={own}
                                tagged={tagged}
                                others={others}
                                currentDay={currentDay}
                                currentMonth={currentMonth}
                                currentYear={currentYear}
                                setCurrentDay={setCurrentDay}
                                setCurrentMonth={setCurrentMonth}
                                setCurrentYear={setCurrentYear}
                                setLocalMonth={setLocalMonth}
                                setCurrentDate={setCurrentDate}
                                currentDate={currentDate}
                                localMonth={localMonth}
                                setLocation={setLocation}
                                location={location}
                                localYear={localYear}
                                setLocalYear={setLocalYear}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <Login
                    setCurrentUser={setCurrentUser}
                />
            )}
        </div>
    );
}