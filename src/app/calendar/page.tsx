import WeeklyCal from "../components/weekly-cal/page";

export default function Home() {
  return (
    <div className="bg-white h-screen overflow-hidden">
      <div className="flex mt-5">
        <div className="w-full">
          <WeeklyCal></WeeklyCal>
        </div>
      </div>
    </div>
  );
}
