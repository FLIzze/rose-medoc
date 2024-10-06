import autoTable from "jspdf-autotable";
import { EventInterface } from "../model/event";
import { UserInterface } from "../model/user";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export default function downloadEvent(event: EventInterface, users: UserInterface[]) {
    console.log('Downloading event', event, users);

    const beginning = new Date(event.beginning);
    const end = new Date(event.end);

    const doc = new jsPDF();

    autoTable(doc, {
        head: [['Titre']],
        body: [[event.title]],
        headStyles: { fillColor: "#813843" }
    })

    autoTable(doc, {
        head: [['Lieu']],
        body: [[event.location]],
        headStyles: { fillColor: "#813843" }
    })

    autoTable(doc, {
        head: [['Description',]],
        body: [[event.description]],
        headStyles: { fillColor: "#813843" }
    })

    autoTable(doc, {
        head: [['Date de début', 'Date de fin']],
        body: [[`${beginning.toLocaleDateString('fr-FR')} - ${beginning.getHours()}:00`, `${end.toLocaleDateString('fr-FR')} - ${end.getHours()}:00`]],
        headStyles: { fillColor: "#813843" }
    })

    autoTable(doc, {
        head: [['Nom', 'Prénom', 'Email']],
        body: users.map(user => [user.lastName, user.firstName, user.email]),
        headStyles: { fillColor: "#813843"}
    })

    doc.save(`${event.title}.pdf`);
}