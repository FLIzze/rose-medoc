import axios from "axios";
import { UserInterface } from "../model/user";

export default async function login(email: string, password: string): Promise<number | null> {
    try {
        const response = await axios.get('http://localhost:5000/api/users');
        for (const user of response.data as UserInterface[]) {
            if (user.email === email && user.password === password) {
                return user.id;
            }
        }
    } catch (error) {
        console.error('Error fetching users', error);
    }
    return null;
}