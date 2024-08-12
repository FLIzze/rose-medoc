import WeeklyCal from "./components/weekly-cal/page";
import CalHeader from "./components/cal-header/page";
import Header from "./components/header/page";
import Mod from "./components/mod/page";

export default function Home() {
  return (
    <div className="bg-white h-screen overflow-hidden">
      <Header></Header>
      <div className="flex mt-5">
        <Mod></Mod>
        <div className="w-full">
          <CalHeader></CalHeader>
          <WeeklyCal></WeeklyCal>
        </div>
      </div>
    </div>
  );
}
