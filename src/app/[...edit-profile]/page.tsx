"use client";
import axios from "axios";
import { UserInterface } from "@/app/model/user";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState, useCallback } from "react";
import defaultUser from "@/app/defaultUser";
import hash from "@/app/password/hash";
import capitalizeFirstLetter from "@/app/capitalizeFirstLetter";
import getBase64Image from "@/app/getBase64Image";
import Cookies from "js-cookie";
import Image from "next/image";

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

    const fetchUserData = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/users`);
            const users: UserInterface[] = response.data;
            const currentUser = users.find(user => user.id === currentUserId);

            if (currentUser) {
                if (currentUser.uuid !== Cookies.get('uuid')) {
                    router.push('/');
                    return;
                }
                setUser(currentUser);
            } else {
                console.error('Utilisateur non trouvé');
            }
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'utilisateur', error);
        }
    }, [currentUserId, router]);

    useEffect(() => {
        fetchUserData();
    }, [currentUserId, fetchUserData]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setErrorMessage("Les mots de passe ne correspondent pas");
            return;
        }

        const hashedPassword = await hash(newPassword);
        const base64Image = await getBase64Image(file);
        const updatedUser: UserInterface = {
            id: currentUserId,
            password: hashedPassword,
            email: newEmail || user.email,
            firstName: capitalizeFirstLetter(newFirstName.toLowerCase()) || user.firstName,
            lastName: newLastName.toUpperCase() || user.lastName,
            color: newColor || user.color,
            pp: base64Image,
            uuid: user.uuid || ""
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
                setFile(null);
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
        <div className="w-screen h-screen bg-white text-dark-pink text-lg pb-10 flex">
            <form method="post" className="flex flex-col gap-y-4 w-full px-72 justify-center" onSubmit={handleSubmit}>
                <h2 className="text-3xl font-bold mb-6 text-dark-pink">Modifier votre compte</h2>
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
                        autoComplete="new-password"
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
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="color" className="font-bold">Couleur</label>
                    <input
                        type="color"
                        className="border border-medium-pink focus:ring-2 focus:ring-medium-pink outline-none transition-all w-full rounded-lg"
                        id="color"
                        value={newColor}
                        onChange={(e) => setNewColor(e.target.value)}
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="pp" className="font-bold">Photo de profil</label>
                    {fileURL && <Image
                        src={fileURL} alt="Selected file"
                        className="object-cover rounded-lg border border-medium-pink"
                        width={100}
                        height={100}
                    />}
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
            
            <button className="flex justify-center w-screen h-screen bg-very-light-pink items-center" onClick={goToHome}>
                <Image
                    src="/logo.png"
                    alt="logo Rose Medoc"
                    className="object-cover cursor-pointer"
                    width={500}
                    height={500}
                />
            </button>
        </div>
    );
}