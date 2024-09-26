"use client";

import axios from "axios";
import { UserInterface } from "../model/user";
import { usePathname } from "next/navigation";
import { FormEvent, use, useEffect, useState } from "react";
import defaultUser from "../defaultUser";

export default function EditProfile() {
    const pathName = usePathname();
    const currentUserId = Number(pathName.split('=')[1]);

    const [user, setUser] = useState<UserInterface>(defaultUser);
    const [newEmail, setNewEmail] = useState<string>("");
    const [newFirstName, setNewFirstName] = useState<string>("");
    const [newLastName, setNewLastName] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    useEffect(() => {
        axios.get(`http://localhost:5000/api/users`)
            .then((response) => {
                const users: UserInterface[] = response.data;
                const currentUser = users.find(user => user.id === currentUserId);
                if (currentUser) {
                    setUser(currentUser);
                } else {
                    console.error('User not found');
                }
            })
            .catch((error) => {
                console.error('Error fetching user', error);
            });
    }, [currentUserId]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const updatedUser = {
            email: newEmail || user.email,
            firstName: newFirstName || user.firstName,
            lastName: newLastName || user.lastName,
            password: newPassword || user.password,
        };

        axios.put(`http://localhost:5000/api/users/${currentUserId}`, updatedUser)
            .then((response) => {
                setUser(response.data);
                alert("Profile updated successfully");
            })
            .catch((error) => {
                console.error('Error updating profile', error);
            });
    };

    return (
        <div className="w-screen h-screen bg-white flex items-center justify-center text-dark-pink text-lg">
            <form method="post" className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <label htmlFor="email" className="font-bold">Email</label>
                    <input
                        type="email"
                        className="border border-medium-pink rounded-md p-2 focus:ring-2 focus:ring-medium-pink outline-none transition-all"
                        placeholder={user.email}
                        id="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="firstName" className="font-bold">First Name</label>
                    <input
                        type="text"
                        className="border border-medium-pink rounded-md p-2 focus:ring-2 focus:ring-medium-pink outline-none transition-all"
                        placeholder={user.firstName}
                        id="firstName"
                        value={newFirstName}
                        onChange={(e) => setNewFirstName(e.target.value)}
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="lastName" className="font-bold">Last Name</label>
                    <input
                        type="text"
                        className="border border-medium-pink rounded-md p-2 focus:ring-2 focus:ring-medium-pink outline-none transition-all"
                        placeholder={user.lastName}
                        id="lastName"
                        value={newLastName}
                        onChange={(e) => setNewLastName(e.target.value)}
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="password" className="font-bold">Password</label>
                    <input
                        type="password"
                        className="border border-medium-pink rounded-md p-2 focus:ring-2 focus:ring-medium-pink outline-none transition-all"
                        placeholder="New Password"
                        id="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="confirmPassword" className="font-bold">Confirm Password</label>
                    <input
                        type="password"
                        className="border border-medium-pink rounded-md p-2 focus:ring-2 focus:ring-medium-pink outline-none transition-all"
                        placeholder="Confirm Password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="profilePicture" className="font-bold">Profile Picture</label>
                    <img
                        src={`data:image/jpeg;base64,${user.pp}`}
                        alt="Profile Picture"
                        id="profilePicture"
                    />
                </div>

                <input
                    className="p-2 bg-medium-pink hover:bg-dark-pink text-white rounded-lg transition-all text-base mt-4"
                    type="submit"
                    value={"Update Profile"}
                />
            </form>
        </div>
    );
}