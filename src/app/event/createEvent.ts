import { UserInterface } from "../model/user";

export default async function   createEvent(
  title: string,
  description: string,
  user: UserInterface | undefined,
  participants: UserInterface[],
  location: string,
  date: Date) {

  try {
    // const beginning = new Date(meetingYear, meetingMonth - 1, Number(day), begginingHour);
    // const end = new Date(meetingYear, meetingMonth - 1, Number(day), endHour);

    if (location == '') {
      location = 'Rose Medoc';
    }

    const participantIds = participants.map(participant => participant.id);
    if (user?.id) {
      participantIds.push(user.id);
    }

    let eventPopUpEnd = new Date(date);
    eventPopUpEnd.setHours(date.getHours() + 1);

    const response = await fetch('http://localhost:5000/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        description: description,
        beginning: date,
        end: eventPopUpEnd,
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