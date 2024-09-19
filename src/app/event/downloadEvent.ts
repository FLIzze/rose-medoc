import { EventInterface } from "../model/event";
import { jsPDF } from "jspdf";
import { UserInterface } from "../model/user";

export default function downloadEvent(event: EventInterface, users: UserInterface[]) {
    const doc = new jsPDF();

    // Add a header image (assuming you have a base64 image string)
    const headerImg = 'data:image/jpeg;base64,...'; // Replace with your base64 image string
    doc.addImage(headerImg, 'JPEG', 10, 10, 190, 30);

    // Add title with background color
    doc.setFillColor(230, 230, 250); // Light lavender color
    doc.rect(10, 50, 190, 10, 'F');
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 128); // Navy color
    doc.text(event.title, 15, 58);

    // Add formatted date
    const beginningDate = new Date(event.beginning);
    const endDate = new Date(event.end);
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Black color

    // Add description with background color
    doc.setFillColor(240, 248, 255); // Alice blue color
    doc.rect(10, 80, 190, 20, 'F');
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Black color
    doc.text("Description:", 10, 85);
    doc.text(event.description, 10, 95, { maxWidth: 180 });

    // Add location with background color
    doc.setFillColor(230, 230, 250); // Light lavender color
    doc.rect(10, 110, 190, 10, 'F');
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Black color
    doc.text("Location:", 10, 115);
    doc.text(event.location, 10, 125);

    // Add participants with background color
    doc.setFillColor(240, 248, 255); // Alice blue color
    doc.rect(10, 130, 190, 10, 'F');
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Black color
    doc.text("Participants:", 10, 135);
    if (event.participants && event.participants.length > 0) {
        event.participants.forEach((participantId, index) => {
            const participant = users.find(user => user.id === participantId);
            if (participant) {
                doc.text(`${index + 1}. ${participant.name} ${participant.firstName}`, 10, 145 + (index * 10));
            }
        });
    } else {
        doc.text("No participants", 10, 145);
    }

    // Save the PDF
    doc.save(`${event.title}.pdf`);
}