import { EventInterface } from "@/app/model/event";
import Image from "next/image";

interface TitleProps {
  event: EventInterface;
}

export default function Title({ event }: Readonly<TitleProps>) {
  return (
    <>
      <div className="bg-light-pink flex items-center justify-center p-2">
        <Image
          src="/title.png"
          alt="titre"
          className="mx-3"
          width={18}
          priority={true}
          height={18}
        />
      </div>
      <div className="pb-4 mt-4">
        <h1 className="font-bold text-lg">{event.title}</h1>
      </div>
    </>
  );
}
