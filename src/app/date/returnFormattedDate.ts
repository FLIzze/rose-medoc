export default function returnFormattedDate(date: Date): string {
    const months = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"];
    const days = ["LUN", "MAR", "MER", "JEU", "VEN", "SAM", "DIM"];

    const dateN = date.getDate();
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const dayIndex = date.getDay()+2;
    
    return `${days[dayIndex]} ${dateN} ${months[month]} ${year}`;
}