import Filters from "../filters/filters"
import SideMonthlyCal from "../side-monthly-calendar/side-monthly-calendar"
import Image from "next/image"


export default function Sidebar() {
    return (
        <div className="pl-4">
            <SideMonthlyCal/>

            <hr className="mb-5 border border-dark-pink" />

            <Filters/>

            <Image
                className="object-cover pointer-events-none"
                src="/logo.png"
                alt="logo Rose Medoc"
                width={500}
                height={500}
                priority={true}
            />
        </div>
    )
}