import capitalizeFirstLetter from "../capitalizeFirstLetter";
import { v4 as uuidv4 } from 'uuid';

export default async function register(
    lastName: string,
    firstName: string,
    email: string,
    password: string,
    color: string) {

    try {
        const response = await fetch('http://localhost:5000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uuid: uuidv4(),
                lastName: lastName.toUpperCase(),
                firstName: capitalizeFirstLetter(firstName.toLowerCase()),
                email: email,
                password: password,
                color: color
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }
    } catch (error) {
        console.error('Error fetching users', error);
    }
}