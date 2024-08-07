export default async function createEvent(day: string, hour: number, meetingMonth: number, meetingYear: number, title: string, description: string) {
  try {
    console.log(hour);
    
    const beginning = new Date(meetingYear, meetingMonth - 1, Number(day), hour);
    const end = new Date(meetingYear, meetingMonth - 1, Number(day), hour + 1);

    const response = await fetch('http://localhost:5000/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title, 
        description: description,
        beginning: beginning.toISOString(), 
        end: end.toISOString() 
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    const data = await response.json();
    alert('Event created successfully');
  } catch (error) {
    console.error('Error creating event', error);
    alert('Error creating event');
  }
}
