import { UserInterface } from "../model/user";

export default async function createEvent(
  title: string,
  description: string,
  user: UserInterface | undefined,
  participants: UserInterface[],
  location: string,
  date: Date,
  endHour: number) {

  try {
    if (location == '') {
      location = 'Rose Medoc';
    }

    const participantIds = participants.map(participant => participant.id);
    if (user?.id) {
      participantIds.push(user.id);
    }

    let eventEndHour = new Date(date);
    eventEndHour.setHours(endHour);

    const response = await fetch('http://localhost:5000/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        description: description,
        beginning: date,
        end: eventEndHour,
        by: user?.id,
        location: location,
        participants: participantIds
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }
  } catch (error) {
    console.error('Error creating event', error);
  }
}