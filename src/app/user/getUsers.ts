import { SetStateAction } from "jotai";
import { Dispatch } from "react";
import { UserInterface } from "../model/user";
import axios from "axios";
import { api_key, api_url } from "../credentials";

export default function getUsers(setUsers: Dispatch<SetStateAction<UserInterface[]>>) {
    axios.get(`${api_url.url}users`, {
        headers: {
            'x-api-key': api_key.key
        }
    })
        .then((response) => {
            setUsers(response.data);
        })
        .catch((error) => {
            console.error('Error fetching users', error);
        });
}