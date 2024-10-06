import { registerAtom } from "@/app/atom"
import { secret_registration } from "@/app/credentials"
import { useSetAtom } from "jotai"
import { Dispatch, FormEvent, SetStateAction, useState } from "react"

interface RegistrationKeyProps {
    setIsRegistrationKey: Dispatch<SetStateAction<boolean>>
}

export default function RegistrationKey({ setIsRegistrationKey }: Readonly<RegistrationKeyProps>) {
    const [key, setKey] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState<string>("")

    const setRegister = useSetAtom(registerAtom);

    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (key === secret_registration.key) {
            setIsRegistrationKey(true)
        } else {
            setErrorMessage("Clé incorrecte");
        }
    }

    return (
        <div
            className="h-min-screen h-full flex flex-col justify-center items-center bg-white w-1/2"
        >
            <div className="w-96">
                <h2 className="text-3xl font-bold mb-6 text-dark-pink">Inscription</h2>

                <form
                    onSubmit={(e) => handleOnSubmit(e)}
                >
                    <input
                        type="text"
                        onChange={(e) => setKey(e.target.value)}
                        placeholder="Entrez votre clé"
                        className="text-dark-pink px-3 py-2 border rounded-lg outline-none focus:ring-2 border-light-pink focus:ring-medium-pink w-full"
                    />
                    <button
                        type="submit"
                        className="w-full py-2 rounded-lg text-white bg-medium-pink transition-all hover:bg-dark-pink mt-3"
                    >
                        Valider
                    </button>

                    {errorMessage && <p className="text-red text-xs mt-4">{errorMessage}</p>}

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
        </div >
    )
}