import autoTable from "jspdf-autotable";
import { EventInterface } from "../model/event";
import { UserInterface } from "../model/user";
import { jsPDF } from "jspdf";

export default function downloadEvent(event: EventInterface, users: UserInterface[]) {
    console.log('Downloading event', event, users);

    const beginning = new Date(event.beginning);
    const end = new Date(event.end);

    const doc = new jsPDF();

    const participants: UserInterface[] = [];

    // Add title at the top of the page
    doc.setFontSize(18);
    doc.text('Rendez-vous avec Rose Médoc', 105, 20, { align: 'center' });

    autoTable(doc, {
        startY: 30, // Start after the title
        head: [['Titre']],
        body: [[event.title]],
        headStyles: { fillColor: "#813843" }
    });

    autoTable(doc, {
        head: [['Lieu']],
        body: [[event.location]],
        headStyles: { fillColor: "#813843" }
    });

    if (event.description !== '') {
        autoTable(doc, {
            head: [['Description']],
            body: [[event.description]],
            headStyles: { fillColor: "#813843" }
        });
    }

    autoTable(doc, {
        head: [['Date de début', 'Date de fin']],
        body: [[`${beginning.toLocaleDateString('fr-FR')} - ${beginning.getHours()}:00`, `${end.toLocaleDateString('fr-FR')} - ${end.getHours()}:00`]],
        headStyles: { fillColor: "#813843" }
    });

    event.participants.map(participantId => {
        const user = users.find(user => user.id === participantId);
        if (user) {
            participants.push(user);
        }
    });

    autoTable(doc, {
        head: [['Nom', 'Prénom', 'Email']],
        body: participants.map(participant => [participant.lastName, participant.firstName, participant.email]),
        headStyles: { fillColor: "#813843" }
    });

    // Get the final Y position after the last table
    const finalY = (doc as any).lastAutoTable.finalY;

    // Add image just below the table
    const img = new Image();
    img.src = '/logo.png';
    img.onload = () => {
        const imgWidth = 100; // Adjust the width as needed
        const imgHeight = 100; // Adjust the height as needed
        const imgX = (doc.internal.pageSize.width - imgWidth) / 2; // Center the image horizontally
        doc.addImage(img, 'PNG', imgX, finalY + 10, imgWidth, imgHeight); // Add 10 units of padding
        doc.save(`${event.title}.pdf`);
    };
}