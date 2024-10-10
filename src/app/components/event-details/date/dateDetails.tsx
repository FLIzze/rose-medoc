import capitalizeFirstLetter from "@/app/capitalizeFirstLetter";
import { EventInterface } from "@/app/model/event";
import Image from "next/image";

interface DateProps {
  event: EventInterface;
}

export default function dateDetails({ event }: Readonly<DateProps>) {
  const beginning = new Date(event.beginning);
  const end = new Date(event.end);

  return (
    <>
      <div className="bg-light-pink flex items-center justify-center pb-4">
        <Image
          src="/clock.png"
          alt="date"
          className="mx-3"
          width={18}
          height={18}
          priority={true}
        />
      </div>
      <div className="pb-4">
        <p className="flex whitespace-nowrap">
          {capitalizeFirstLetter(
            beginning.toLocaleDateString("fr-FR", { weekday: "long" })
          )}
          , {beginning.getDate()}{" "}
          {capitalizeFirstLetter(
            beginning.toLocaleDateString("fr-FR", { month: "long" })
          )}{" "}
          {beginning.getHours() + 2}:00 - {end.getHours() + 2}:00
        </p>
      </div>
    </>
  );
}
