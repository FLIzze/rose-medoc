import { UserInterface } from "../model/user";

export default async function createEvent(
  day: string,
  begginingHour: number,
  endHour: number,
  meetingMonth: number,
  meetingYear: number,
  title: string,
  description: string,
  user: UserInterface | undefined,
  participants: UserInterface[]) {

  try {
    const beginning = new Date(meetingYear, meetingMonth - 1, Number(day), begginingHour);
    const end = new Date(meetingYear, meetingMonth - 1, Number(day), endHour);

    const response = await fetch('http://localhost:5000/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        description: description,
        beginning: beginning.toISOString(),
        end: end.toISOString(),
        by: user?.id,
        location: 'random',
        participants: participants.map(participant => participant.id)
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
