"use client";

import axios from "axios";
import { UserInterface } from "../model/user";
import { usePathname } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import defaultUser from "../defaultUser";
import hash from "../password/hash";
import { useRouter } from "next/navigation";
import capitalizeFirstLetter from "../capitalizeFirstLetter";
import getBase64Image from "../getBase64Image";

export default function EditProfile() {
    const router = useRouter();

    const pathName = usePathname();
    const currentUserId = Number(pathName.split('=')[1]);

    const [user, setUser] = useState<UserInterface>(defaultUser);
    const [newEmail, setNewEmail] = useState<string>("");
    const [newFirstName, setNewFirstName] = useState<string>("");
    const [newLastName, setNewLastName] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [newColor, setNewColor] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
    const [fileURL, setFileURL] = useState<string | null>(null);

    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        fetchUserData();
    }, [currentUserId]);

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/users`);
            const users: UserInterface[] = response.data;
            const currentUser = users.find(user => user.id === currentUserId);
            if (currentUser) {
                setUser(currentUser);
            } else {
                console.error('Utilisateur non trouvé');
            }
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'utilisateur', error);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setErrorMessage("Les mots de passe ne correspondent pas");
            return;
        }

        const hashedPassword = await hash(newPassword);
        const base64Image = await getBase64Image(file!);

        const updatedUser: UserInterface = {
            id: currentUserId,
            password: hashedPassword,
            email: newEmail || user.email,
            firstName: capitalizeFirstLetter(newFirstName.toLowerCase()) || user.firstName,
            lastName: newLastName.toUpperCase() || user.lastName,
            color: newColor || user.color,
            pp: base64Image || user.pp,
            uuid: user.uuid
        };

        try {
            const response = await fetch("http://localhost:5000/api/users", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedUser),
            });

            if (response.ok) {
                await fetchUserData();
                setNewEmail("");
                setNewFirstName("");
                setNewLastName("");
                setNewPassword("");
                setConfirmPassword("");
                setNewColor("");
                setErrorMessage("");
                setFileURL("");
                setFile(new File([], "default.txt"));
                alert("Profil mis à jour avec succès");
                goToHome();
            } else {
                const errorData = await response.json();
                setErrorMessage("Erreur lors de la mise à jour du profil: " + errorData.error);
            }
        } catch (error) {
            setErrorMessage("Erreur lors de la mise à jour du profil");
            console.error('Error while updating profile', error);
        }
    };

    const goToHome = () => {
        router.push("/");
    }

        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setFileURL(URL.createObjectURL(selectedFile));
        }
    };

    return (
        <div className="w-full h-full bg-white text-dark-pink text-lg pb-10">
            <div className="flex justify-center w-full">
                <img src="logo.png" alt="logo Rose Medoc" className="w-96 h-96 object-cover cursor-pointer" onClick={goToHome} />
            </div>

            <form method="post" className="flex flex-col gap-y-4 w-full px-72 justify-center" onSubmit={handleSubmit}>
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
                    <label htmlFor="firstName" className="font-bold">Prénom</label>
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
                    <label htmlFor="lastName" className="font-bold">Nom</label>
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
                    <label htmlFor="password" className="font-bold">Mot de passe</label>
                    <input
                        type="password"
                        className="border border-medium-pink rounded-md p-2 focus:ring-2 focus:ring-medium-pink outline-none transition-all"
                        placeholder="Nouveau mot de passe"
                        id="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="confirmPassword" className="font-bold">Confirmer le mot de passe</label>
                    <input
                        type="password"
                        className="border border-medium-pink rounded-md p-2 focus:ring-2 focus:ring-medium-pink outline-none transition-all"
                        placeholder="Confirmer le mot de passe"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="color" className="font-bold">Couleur</label>
                    <input
                        type="color"
                        className="border border-medium-pink focus:ring-2 focus:ring-medium-pink outline-none transition-all w-full"
                        id="color"
                        value={newColor}
                        onChange={(e) => setNewColor(e.target.value)}
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="pp" className="font-bold">Photo de profil</label>
                    {fileURL && <img src={fileURL} alt="Selected file" className="border border-medium-pink rounded-lg" />}
                    <input
                        type="file"
                        id="pp"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>

                {errorMessage !== "" && <p className="text-red text-base">{errorMessage}</p>}

                <input
                    className="p-2 bg-medium-pink hover:bg-dark-pink text-white rounded-lg transition-all text-base mt-4"
                    type="submit"
                    value={"Mettre à jour le profil"}
                />
            </form>
        </div>
    );
}