import axios from "axios";
import { UserInterface } from "../model/user";
import { verify } from "../password/verify";
import { Dispatch, SetStateAction } from "react";
import Cookies from "js-cookie";
import { api_key } from "../credentials";

export default async function login(
  email: string,
  password: string,
  setCurrentUser: Dispatch<SetStateAction<UserInterface>>
) {
  try {
    const response = await axios.get(
      "https://api.calendar.alexandrebel.me/users",
      {
        headers: {
          "x-api-key": api_key.key,
        },
      }
    );
    for (const user of response.data as UserInterface[]) {
      if (user.email == email && (await verify(password, user.password))) {
        console.log("Utilisateur connecté");
        Cookies.set("uuid", user.uuid, {
          expires: 7,
          secure: true,
          sameSite: "strict",
        });
        setCurrentUser(user);
        window.location.reload();
        return true;
      }
    }
  } catch (error) {
    console.error("Error fetching users", error);
  }
  console.log("Identifiants invalides");
  return false;
}
