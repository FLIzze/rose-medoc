"use client";

import { useState } from "react";
import hash from "@/app/password/hash";
import register from "@/app/user/register";
import getBase64Image from "@/app/getBase64Image";
import login from "@/app/user/login";
import Image from "next/image";
import { useSetAtom } from "jotai";
import { currentUserAtom, registerAtom } from "@/app/atom";
import RegistrationKey from "./registrationKey/registrationKey";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [color, setColor] = useState("#000000");

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [file, setFile] = useState<File | null>(null);
  const [fileURL, setFileURL] = useState<string | null>(null);

  const setRegister = useSetAtom(registerAtom);
  const setCurrentUser = useSetAtom(currentUserAtom);

  const [isRegistrationKey, setIsRegistrationKey] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setErrorMessage("Tous les champs sont obligatoires.");
      return;
    }

    if (!isEmailValid) {
      setErrorMessage("Format de courriel invalide.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    if (!isPasswordValid) {
      setErrorMessage(
        "Le mot de passe doit contenir au moins 8 caractères, dont une majuscule et un caractère spécial."
      );
      return;
    }

    if (file!.size > 65535) {
      setErrorMessage("Fichier trop grand.");
      return;
    }

    try {
      const base64Image = await getBase64Image(file);
      if (
        await register(
          lastName,
          firstName,
          email,
          await hash(password),
          color,
          base64Image
        )
      ) {
        login(email, password, setCurrentUser);
        setSuccessMessage("Inscription réussie !");
      }
    } catch (error) {
      setErrorMessage("Erreur lors de l'inscription.");
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setIsEmailValid(validateEmail(emailValue));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    setIsPasswordValid(validatePassword(passwordValue));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files![0];
    setFile(selectedFile);
    setFileURL(URL.createObjectURL(selectedFile));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  return (
    <>
      {!isRegistrationKey ? (
        <RegistrationKey setIsRegistrationKey={setIsRegistrationKey} />
      ) : (
        <div className="flex items-center h-min-screen h-full justify-center w-1/2 p-8 bg-white rounded shadow-md">
          <div className="w-96">
            <h2 className="text-3xl font-bold mb-6 text-dark-pink">
              Inscription
            </h2>

            <form onSubmit={handleRegister}>
              <div className="mb-4">
                <label className="text-dark-pink font-bold" htmlFor="lastName">
                  Nom
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="text-dark-pink w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 border-light-pink focus:ring-medium-pink"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="text-dark-pink font-bold" htmlFor="firstName">
                  Prénom
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="text-dark-pink w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 border-light-pink focus:ring-medium-pink"
                  required
                />
              </div>

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

              <div className="mb-4 flex flex-col">
                <label className="text-dark-pink font-bold" htmlFor="picture">
                  Photo
                </label>
                <input
                  id="picture"
                  type="file"
                  onChange={handleFileChange}
                  required
                  accept="image/*"
                />
                {fileURL && (
                  <Image
                    src={fileURL}
                    alt="Selected file"
                    className="mt-2 object-cover rounded-lg border border-medium-pink"
                    priority={true}
                    width={200}
                    height={200}
                  />
                )}
              </div>

              <div className="mb-4">
                <label className="text-dark-pink font-bold" htmlFor="password">
                  Mot de passe
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  autoComplete="new-password"
                  className={`w-full text-dark-pink px-3 py-2 border rounded-lg outline-none focus:ring-2 ${
                    isPasswordValid
                      ? "border-light-pink focus:ring-medium-pink"
                      : "border-red focus:ring-red"
                  }`}
                  required
                />
                {!isPasswordValid && (
                  <p className="text-red text-xs mt-1">
                    Le mot de passe doit contenir au moins 8 caractères, dont
                    une majuscule et un caractère spécial.
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  className="text-dark-pink font-bold"
                  htmlFor="confirmPassword"
                >
                  Confirmer mot de passe
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                  className="w-full text-dark-pink px-3 py-2 border rounded-lg outline-none focus:ring-2 border-light-pink focus:ring-medium-pink"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="text-dark-pink font-bold" htmlFor="color">
                  Couleur
                </label>
                <input
                  id="color"
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full h-10 border-none rounded-lg border border-medium-pink"
                  required
                />
              </div>

              {errorMessage && (
                <p className="text-red text-xs mb-4">{errorMessage}</p>
              )}
              {successMessage && (
                <p className="text-green text-xs mb-4">{successMessage}</p>
              )}

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
                >
                  Connexion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex items-center h-min-screen h-full justify-center w-1/2 bg-very-light-pink">
        <Image
          src="/logo.png"
          alt="logo Rose Medoc"
          className="object-cover pointer-events-none"
          width={500}
          priority={true}
          height={500}
        />
      </div>
    </>
  );
}
