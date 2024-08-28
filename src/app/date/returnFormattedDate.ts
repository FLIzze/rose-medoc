export default function returnFormattedDate(beginning: Date, end: Date): string {
    const day = beginning.getDate().toString().padStart(2, '0');
    const month = beginning.getMonth();
    const year = beginning.getFullYear();
    const beginningHours = (beginning.getHours()+2).toString();
    const endHours = (end.getHours()+2).toString();
    const dayNames = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    const monthsName = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"];
    const dayName = dayNames[beginning.getDay()];

    console.log(beginning);
    

    return `${dayName} ${day} ${monthsName[month]} ${year} ${beginningHours}h00 : ${endHours}h00`;
}