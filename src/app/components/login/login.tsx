"use client";

import { useState } from "react";
import login from "@/app/user/login";
import Image from "next/image";
import { useSetAtom } from "jotai";
import { currentUserAtom, registerAtom } from "@/app/atom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const setCurrentUser = useSetAtom(currentUserAtom);
  const setRegister = useSetAtom(registerAtom);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("L'email et le mot de passe sont obligatoires.");
      console.log("L'email et le mot de passe sont obligatoires.");
      return;
    }

    if (!isEmailValid) {
      setErrorMessage("Format de courriel invalide.");
      console.log("Format de courriel invalide.");
      return;
    }

    if (!(await login(email, password, setCurrentUser))) {
      setErrorMessage("Identifiants invalides.");
      console.log("Identifiants invalides.");
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setIsEmailValid(validateEmail(emailValue));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  return (
    <div className="flex w-screen h-screen bg-very-light-pink">
      <div className="flex items-center justify-center w-1/2 p-8 bg-white rounded shadow-md">
        <div className="w-96">
          <h2 className="text-3xl font-bold mb-6 text-dark-pink">Connexion</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="text-dark-pink font-bold" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                className={`text-dark-pink w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 ${
                  isEmailValid
                    ? "border-light-pink focus:ring-medium-pink"
                    : "border-red focus:ring-red"
                }`}
                required
              />
              {!isEmailValid && (
                <p className="text-red text-xs mt-1">
                  Format de courriel invalide.
                </p>
              )}
            </div>

            <div className="mb-4 relative">
              <label className="text-dark-pink font-bold" htmlFor="password">
                Mot de passe
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full items-center text-dark-pink px-3 py-2 border rounded-lg outline-none focus:ring-2 ${
                  isEmailValid
                    ? "border-light-pink focus:ring-medium-pink"
                    : "border-red focus:ring-red"
                }`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-10 text-dark-pink flex items-center justify-center w-8 h-8"
              >
                <Image
                  src={showPassword ? "/hide.png" : "/show.png"}
                  alt={showPassword ? "Hide" : "Show"}
                  width={20}
                  height={20}
                  className="mb-4"
                />
              </button>
            </div>

            {errorMessage && (
              <p className="text-red text-xs mb-4">{errorMessage}</p>
            )}

            <button
              type="submit"
              className="w-full py-2 rounded-lg text-white bg-medium-pink transition-all hover:bg-dark-pink"
            >
              Connexion
            </button>

            <div className="mt-3 text-dark-pink flex gap-x-1">
              <p>Pas de compte ?</p>
              <button
                className="text-medium-pink hover:text-dark-pink transition-all"
                onClick={() => setRegister(true)}
              >
                Inscription
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="flex items-center justify-center w-1/2 bg-very-light-pink">
        <Image
          src="/logo.png"
          alt="logo Rose Medoc"
          className="object-cover "
          width={500}
          height={500}
          priority={true}
        />
      </div>
    </div>
  );
}
