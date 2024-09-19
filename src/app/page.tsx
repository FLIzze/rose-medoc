"use client";

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { UserInterface } from './model/user';
import Sidebar from './components/sidebar/page';
import Login from './components/login/page';
import MainCal from './components/main-calendar/page';
import axios from 'axios';
import { EventInterface } from './model/event';
import filterEvent from './event/filterEvents';
import getEvents from './event/getEvents';

export default function Home() {
    const [date, setDate] = useState(new Date());
    const [sidebarDate, setSidebarDate] = useState(new Date());

    const [currentUser, setCurrentUser] = useState<UserInterface>();

    const [own, setOwn] = useState(true);
    const [tagged, setTagged] = useState(true);
    const [others, setOthers] = useState(false);

    const [calendarMode, setCalendarMode] = useState('weekly');

    const [users, setUsers] = useState<UserInterface[]>([]);
    const cookie = Cookies.get();

    const [events, setEvents] = useState<EventInterface[]>([]);
    const [filteredEvents, setFilteredEvents] = useState<EventInterface[]>([]);

    useEffect(() => {
        getEvents(setEvents);
    }, []);
    
    useEffect(() => {
        const userId = Cookies.get('userId');
        if (userId) {
            setCurrentUser({ id: userId } as unknown as UserInterface);
        }
        
        axios.get('http://localhost:5000/api/users')
        .then((response) => {
            setUsers(response.data)
            for (const user of response.data as UserInterface[]) {
                if (user.id == +cookie['userId']) {
                    setCurrentUser(user);
                }
            }
        })
        .catch((error) => {
            console.error('Error fetching users', error);
        });
    }, []);

    useEffect(() => {
        setFilteredEvents(filterEvent(events, currentUser, own, tagged, others));
    }, [events, own, tagged, others]);

    return (
        <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
            {(currentUser) ? (
                <div className="bg-white h-screen overflow-hidden">
                    <div className="flex mt-5">
                        <div>
                            <Sidebar
                                sidebarDate={sidebarDate}
                                setSidebarDate={setSidebarDate}
                                setDate={setDate}
                                own={own}
                                tagged={tagged}
                                others={others}
                                setOwn={setOwn}
                                setTagged={setTagged}
                                setOthers={setOthers}
                                filteredEvents={filteredEvents}
                            />
                        </div>

                        <div className="w-screen">
                            <MainCal
                                currentUser={currentUser}
                                setDate={setDate}
                                setSidebarDate={setSidebarDate}
                                setCalendarMode={setCalendarMode}
                                calendarMode={calendarMode}
                                users={users}
                                filteredEvents={filteredEvents}
                                setEvents={setEvents}
                                setOwn={setOwn}
                                setTagged={setTagged}
                                setOthers={setOthers}
                                date={date}
                                sidebarDate={sidebarDate}
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