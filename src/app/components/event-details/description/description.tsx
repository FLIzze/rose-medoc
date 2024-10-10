import { EventInterface } from "@/app/model/event";
import Image from "next/image";

interface DescriptionProps {
  event: EventInterface;
}

export default function Description({ event }: Readonly<DescriptionProps>) {
  return (
    <>
      {event.description && (
        <>
          <div className="bg-light-pink flex items-center justify-center p-2 pb-4">
            <Image
              src="/description.png"
              alt="description"
              className="mx-3"
              height={18}
              priority={true}
              width={18}
            />
          </div>
          <div className="flex items-center pb-4 pt-2">
            <p className="text-justify">{event.description}</p>
          </div>
        </>
      )}
    </>
  );
}
