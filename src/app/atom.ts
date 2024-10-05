import { atom } from "jotai";
import { UserInterface } from "./model/user";
import defaultUser from "./defaultUser";
import { EventInterface } from "./model/event";

export const dateAtom = atom(new Date());
export const sidebarDateAtom = atom(new Date());

export const currentUserAtom = atom<UserInterface>(defaultUser);

export const ownAtom = atom(true);
export const taggedAtom = atom(true);
export const othersAtom = atom(false);

export const calendarModeAtom = atom('Semaine');

export const usersAtom = atom<UserInterface[]>([]);

export const eventsAtom = atom<EventInterface[]>([]);
export const filteredEventsAtom = atom<EventInterface[]>([]);

export const registerAtom = atom(false);

export const positionAtom = atom({ x: 0, y: 0 });
export const sizeAtom = atom({ width: 0, height: 0 });

export const titleAtom = atom('');
export const descriptionAtom = atom('');
export const locationAtom = atom('Rose Medoc');

export const participantsAtom = atom<UserInterface[]>([]);

export const isPopupVisibleAtom = atom(false);
export const isDetailsVisibleAtom = atom(false);
export const isCalendarModeVisibleAtom = atom(false);
export const isProfileVisibleAtom = atom(false);

export const eventAtom = atom<EventInterface>({} as EventInterface);

export const popupDateAtom = atom(new Date());

export const viewModeAtom = atom("weekly");

export const hoursAtom = atom<number[]>([7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]);