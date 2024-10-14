import capitalizeFirstLetter from "../capitalizeFirstLetter";
import { v4 as uuidv4 } from "uuid";
import { api_key, api_url } from "../credentials";

export default async function register(
  lastName: string,
  firstName: string,
  email: string,
  password: string,
  color: string,
  file: string
): Promise<boolean> {
  try {
    const response = await fetch(`${api_url.url}users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": api_key.key
      },
      body: JSON.stringify({
        uuid: uuidv4(),
        lastName: lastName.toUpperCase(),
        firstName: capitalizeFirstLetter(firstName.toLowerCase()),
        email: email,
        password: password,
        color: color,
        pp: file,
      }),
    });

    if (response.ok) {
      return true;
    }
  } catch (error) {
    console.error("Error registering user", error);
  }

  return false;
}
