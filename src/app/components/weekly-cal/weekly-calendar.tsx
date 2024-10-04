import Header from "./header/header";
import Body from "./body/body";

export default function WeeklyCal() {

    return (
        <div
            className="h-screen flex flex-col pb-7"
            id='weeklyCal'
        >
            <Header/>

            <Body/>
        </div>
    );
}