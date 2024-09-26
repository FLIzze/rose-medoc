import capitalizeFirstLetter from "../capitalizeFirstLetter";
import { v4 as uuidv4 } from 'uuid';

const getBase64Image = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
};

export default async function register(
    lastName: string,
    firstName: string,
    email: string,
    password: string,
    color: string,
    file: File | null) {

    try {
        const base64Image = file ? await getBase64Image(file) : null;

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
                color: color,
                pp: base64Image
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }
    } catch (error) {
        console.error('Error registering user', error);
    }
}