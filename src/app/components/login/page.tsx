"use client";

import { UserInterface } from "@/app/model/user";
import { Dispatch, SetStateAction, useState } from "react";
import login from "@/app/user/login";
import Cookies from "js-cookie";

interface LoginProps {
    setCurrentUser: Dispatch<SetStateAction<UserInterface | undefined>>
}

export default function Login({ setCurrentUser }: LoginProps) {
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

        const userId = await login(email, password);
        if (userId) {
            console.log('User logged in');
            Cookies.set('userId', userId.toString(), { expires: 7, secure: true, sameSite: 'strict' });
            setCurrentUser({ id: userId } as UserInterface);
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
        <div className="bg-white p-8 rounded shadow-md w-96">
            <h2 className="text-2xl font-bold mb-6">Login</h2>
            <form onSubmit={handleLogin}>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        className={`w-full px-3 py-2 border rounded ${isEmailValid ? 'border-gray-300' : 'border-red-500'}`}
                        required
                    />
                    {!isEmailValid && <p className="text-red-500 text-xs mt-1">Invalid email format.</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                {errorMessage && <p className="text-red-500 text-xs mb-4">{errorMessage}</p>}
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
                    Login
                </button>
            </form>
        </div>
    )
}