import { api_key, api_url } from "../credentials";
import { UserInterface } from "../model/user";

export default async function createEvent(
  title: string,
  description: string,
  user: UserInterface | undefined,
  participants: UserInterface[],
  location: string,
  popupDate: Date,
  endHour: number) {

  try {
    if (location == '') {
      location = 'Rose Medoc';
    }

    const participantIds = participants.map(participant => participant.id);
    if (user?.id) {
      participantIds.push(user.id);
    }

    let eventEndHour = new Date(popupDate);
    eventEndHour.setHours(endHour);

    const response = await fetch(`${api_url.url}events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': api_key.key
      },
      body: JSON.stringify({
        title: title,
        description: description,
        beginning: popupDate,
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