"use client";

import { Dispatch, SetStateAction, useState } from "react";
import login from "@/app/user/login";
import Cookies from "js-cookie";

interface LoginProps {
    setRegister: Dispatch<SetStateAction<boolean>>
}

export default function Login({ setRegister }: LoginProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');

        if (!email || !password) {
            setErrorMessage('Email and password are required.');
            console.log('Email and password are required.');
            return;
        }

        if (!isEmailValid) {
            setErrorMessage('Invalid email format.');
            console.log('Invalid email format.');
            return;
        }

        const userUuid = await login(email, password);
        if (userUuid) {
            console.log('User logged in');
            Cookies.set('uuid', userUuid, { expires: 7, secure: true, sameSite: 'strict' });
        } else {
            setErrorMessage('Invalid credentials.');
            console.log('Invalid credentials');
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
                    <h2 className="text-3xl font-bold mb-6 text-dark-pink">Login</h2>
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label className="text-dark-pink font-bold" htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                className={`text-dark-pink w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 ${isEmailValid ? 'border-light-pink focus:ring-medium-pink' : 'border-red focus:ring-red'}`}
                                required
                            />
                            {!isEmailValid && <p className="text-red text-xs mt-1">Invalid email format.</p>}
                        </div>
                        <div className="mb-4">
                            <label className="text-dark-pink font-bold" htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full text-dark-pink px-3 py-2 border rounded-lg outline-none focus:ring-2 ${isEmailValid ? 'border-light-pink focus:ring-medium-pink' : 'border-red focus:ring-red'}`}
                                required
                            />
                        </div>

                        {errorMessage && <p className="text-red text-xs mb-4">{errorMessage}</p>}

                        <button type="submit" className="w-full py-2 rounded-lg text-white bg-medium-pink transition-all hover:bg-dark-pink">
                            Login
                        </button>

                        <div className="mt-3 text-dark-pink flex gap-x-1">
                            <p>Pas de compte ?</p>
                            <button
                                className="text-medium-pink hover:text-dark-pink transition-all"
                                onClick={() => setRegister(true)}
                            >Register
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