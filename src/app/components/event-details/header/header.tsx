import deleteEvent from "@/app/event/deleteEvent";
import downloadEvent from "@/app/event/downloadEvent";
import hideEventDetails from "@/app/event/hideEventDetails";
import { EventInterface } from "@/app/model/event";
import { UserInterface } from "@/app/model/user";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

interface HeaderProps {
  event: EventInterface;
  users: UserInterface[];
  setIsDetailsVisible: Dispatch<SetStateAction<boolean>>;
  setEvents: Dispatch<SetStateAction<EventInterface[]>>;
  currentUser: UserInterface;
}

export default function Header({
  event,
  users,
  setIsDetailsVisible,
  setEvents,
  currentUser,
}: Readonly<HeaderProps>) {
  const router = useRouter();

  return (
    <div className="flex justify-end pr-5 h-9 w-full bg-medium-pink items-center rounded-t-lg">
      <button
        onClick={() => {
          downloadEvent(event, users);
          hideEventDetails(setIsDetailsVisible);
        }}
      >
        <Image
          src="/download.png"
          alt="download"
          className="p-1 hover:bg-dark-pink rounded-full"
          width={30}
          height={30}
          priority={true}
        />
      </button>
      {event.by == currentUser.id && (
        <div className="items-center flex">
          <button
            onClick={() => {
              router.push(`/edit-event/${event.id}`);
              hideEventDetails(setIsDetailsVisible);
            }}
          >
            <Image
              src="/edit.png"
              alt="edit"
              className="p-2 hover:bg-dark-pink rounded-full mx-1"
              width={36}
              height={36}
              priority={true}
            />
          </button>

          <button
            onClick={() => {
              deleteEvent(event.id, setEvents);
              hideEventDetails(setIsDetailsVisible);
            }}
          >
            <Image
              src="/bin.png"
              alt="supprimer"
              className="p-2 hover:bg-dark-pink rounded-full mx-1"
              width={32}
              height={32}
              priority={true}
            />
          </button>
        </div>
      )}
      <button onClick={() => hideEventDetails(setIsDetailsVisible)}>
        <Image
          src="/cross.png"
          alt="cross"
          className="p-1 hover:bg-dark-pink rounded-full"
          width={30}
          height={30}
          priority={true}
        />
      </button>
    </div>
  );
}
