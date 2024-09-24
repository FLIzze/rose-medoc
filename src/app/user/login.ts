import axios from "axios";
import { UserInterface } from "../model/user";
import { verify } from "../password/verify";

export default async function login(email: string, password: string): Promise<string | null> {
    try {
        const response = await axios.get('http://localhost:5000/api/users');
        for (const user of response.data as UserInterface[]) {
            if (user.email == email && await verify(password, user.password)) {
                return user.uuid;
            }
        }
    } catch (error) {
        console.error('Error fetching users', error);
    }
    return null;
}