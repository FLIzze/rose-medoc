"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { UserInterface } from "./model/user";
import Sidebar from "./components/sidebar/sidebar";
import Login from "./components/login/login";
import MainCal from "./components/main-calendar/main-calendar";
import axios from "axios";
import filterEvent from "./event/filterEvents";
import getEvents from "./event/getEvents";
import Register from "./components/register/register";
import defaultUser from "./user/defaultUser";
import { useAtom } from "jotai";
import {
  currentUserAtom,
  eventsAtom,
  filteredEventsAtom,
  othersAtom,
  ownAtom,
  registerAtom,
  taggedAtom,
  usersAtom,
} from "./atom";
import { api_key, api_url } from "./credentials";
import Image from "next/image";

export default function Home() {
  const cookie = Cookies.get();

  const [own] = useAtom(ownAtom);
  const [tagged] = useAtom(taggedAtom);
  const [others] = useAtom(othersAtom);

  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const [, setUsers] = useAtom(usersAtom);
  const [events, setEvents] = useAtom(eventsAtom);

  const [, setFilteredEvents] = useAtom(filteredEventsAtom);

  const [register] = useAtom(registerAtom);

  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingEvents, setLoadingEvents] = useState(true);

  useEffect(() => {
    getEvents(setEvents).finally(() => setLoadingEvents(false));
  }, [setEvents]);

  useEffect(() => {
    axios
      .get(`${api_url.url}users`, {
        headers: {
          "x-api-key": api_key.key,
        },
      })
      .then((response) => {
        setUsers(response.data);
        for (const user of response.data as UserInterface[]) {
          if (user.uuid === cookie["uuid"]) {
            setCurrentUser(user);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching users", error);
      })
      .finally(() => setLoadingUser(false));
  }, [setCurrentUser, setUsers]);

  useEffect(() => {
    setFilteredEvents(filterEvent(events, currentUser, own, tagged, others));
  }, [events, own, tagged, others, setFilteredEvents, currentUser]);

  if (loadingUser || loadingEvents) {
    return <div className="flex justify-center items-center h-screen bg-white w-screen">
      <Image
        src="loading.svg"
        alt="loading..."
        width={150}
        height={150}
      />
    </div>
  }

  return (
    <div className="w-screen flex items-center justify-center bg-white">
      {currentUser !== defaultUser &&
        currentUser !== undefined &&
        currentUser !== null ? (
        <div className="bg-white h-screen overflow-hidden">
          <div className="flex mt-5">
            <div>
              <Sidebar />
            </div>

            <div className="w-screen">
              <MainCal />
            </div>
          </div>
        </div>
      ) : register ? (
        <Register />
      ) : (
        <Login />
      )}
    </div>
  );
}