import { EventInterface } from "@/app/model/event";
import Image from "next/image";

interface LocationProps {
  event: EventInterface;
}

export default function Location({ event }: Readonly<LocationProps>) {
  return (
    <>
      {event.location && (
        <>
          <div className="bg-light-pink flex items-center justify-center p-2 pb-4">
            <Image
              src="/pin.png"
              alt="location"
              className="mx-3"
              height={18}
              priority={true}
              width={18}
            />
          </div>
          <div className="flex items-center pb-2">
            {event.location == "Rose Medoc" ? (
              <p>Rose Medoc</p>
            ) : (
              <a
                href={`https://www.google.fr/maps/place/${event.location}`}
                target="blank"
                className="text-light-pink"
              >
                {event.location}
              </a>
            )}
          </div>
        </>
      )}
    </>
  );
}
