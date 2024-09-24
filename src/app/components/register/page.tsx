"use client";

import { Dispatch, SetStateAction, useState } from "react";
import register from "@/app/user/register";
import hash from "@/app/password/hash";
import login from "@/app/user/login";

interface RegisterProps {
    setRegister: Dispatch<SetStateAction<boolean>>
}

export default function Register({ setRegister }: RegisterProps) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [color, setColor] = useState('#000000');
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            setErrorMessage('Tous les champs sont obligatoires.');
            console.log('All fields are required.');
            return;
        }

        if (!isEmailValid) {
            setErrorMessage('Format de courriel invalide.');
            console.log('Invalid email format.');
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage('Les mots de passe ne correspondent pas.');
            console.log('Passwords do not match.');
            return;
        }

        try {
            await register(lastName, firstName, email, await hash(password), color);
            const userId = await login(email, password);
            if (userId !== null) {
                setSuccessMessage('Inscription réussie et connexion réussie.');
                console.log('Registration and login successful.');
                setRegister(false);
            } else {
                setErrorMessage('Inscription réussie, mais échec de la connexion.');
                console.log('Registration successful, but login failed.');
            }
        } catch (error) {
            setErrorMessage('Erreur lors de l\'inscription.');
            console.error('Error during registration:', error);
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const emailValue = e.target.value;
        setEmail(emailValue);
        setIsEmailValid(validateEmail(emailValue));
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <div className="flex w-screen h-screen bg-very-light-pink">
            <div className="flex items-center justify-center w-1/2 p-8 bg-white rounded shadow-md">
                <div className="w-96">
                    <h2 className="text-3xl font-bold mb-6 text-dark-pink">Inscription</h2>

                    <form onSubmit={handleRegister}>
                        <div className="mb-4">
                            <label className="text-dark-pink font-bold">Nom</label>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="text-dark-pink w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 border-light-pink focus:ring-medium-pink"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="text-dark-pink font-bold">Prénom</label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="text-dark-pink w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 border-light-pink focus:ring-medium-pink"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="text-dark-pink font-bold">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                className={`text-dark-pink w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 ${isEmailValid ? 'border-light-pink focus:ring-medium-pink' : 'border-red focus:ring-red'}`}
                                required
                            />
                            {!isEmailValid && <p className="text-red text-xs mt-1">Format de courriel invalide.</p>}
                        </div>

                        <div className="mb-4">
                            <label className="text-dark-pink font-bold">Mot de passe</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full text-dark-pink px-3 py-2 border rounded-lg outline-none focus:ring-2 border-light-pink focus:ring-medium-pink"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="text-dark-pink font-bold">Confirmer mot de passe</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full text-dark-pink px-3 py-2 border rounded-lg outline-none focus:ring-2 border-light-pink focus:ring-medium-pink"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="text-dark-pink font-bold">Couleur</label>
                            <input
                                type="color"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                                className="w-full h-10 border-none"
                                required
                            />
                        </div>

                        {errorMessage && <p className="text-red text-xs mb-4">{errorMessage}</p>}
                        {successMessage && <p className="text-green text-xs mb-4">{successMessage}</p>}

                        <button
                            className="w-full py-2 rounded-lg text-white bg-medium-pink transition-all hover:bg-dark-pink"
                            type="submit"
                        >
                            Inscription
                        </button>

                        <div className="mt-3 text-dark-pink flex gap-x-1">
                            <p>Déjà un compte ?</p>
                            <button
                                className="text-medium-pink hover:text-dark-pink transition-all"
                                onClick={() => setRegister(false)}
                            >Connexion
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="flex items-center justify-center w-1/2 bg-very-light-pink">
                <img
                    src="/logo.png"
                    alt="logo Rose Medoc"
                    className="object-cover w-96 h-96"
                />
            </div>
        </div>
    )
}