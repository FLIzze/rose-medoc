"use client";

import { UserInterface } from "@/app/model/user";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ProfileProps {
    currentUser: UserInterface,
    setCurrentUser: Dispatch<SetStateAction<UserInterface>>,
    defaultUser: UserInterface,
}

export default function Profile({ currentUser, setCurrentUser, defaultUser }: Readonly<ProfileProps>) {
    const router = useRouter();

    const [isProfileVisible, setIsProfileVisible] = useState(false);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const profile = document.getElementById("profile");
            if (profile && !profile.contains(event.target as Node)) {
                hideProfile();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const dc = () => {
        document.cookie = 'uuid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        setCurrentUser(defaultUser);
        window.location.reload();
    };

    const displayProfile = () => {
        setIsProfileVisible(true);
    };

    const hideProfile = () => {
        setIsProfileVisible(false);
    };

    const editProfile = (currentUSer: UserInterface) => {
        router.push(`/edit-profile=${currentUSer.id}`);
    }

    return (
        <div className="text-sm">
            <button
                className="hover:opacity-70 transition-all"
                onClick={displayProfile}
            >
                <img
                    src={`data:image/jpeg;base64,${currentUser.pp}`}
                    alt="Profile Picture"
                    className='rounded-full mr-6'
                    width={20}
                    height={20}
                />
            </button>

            <div
                id="profile"
                className={`rounded-lg right-0 mr-4 absolute z-20 transition-opacity duration-300 text-white ${isProfileVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            >
                <div className="flex flex-col shadow-2xl bg-medium-pink rounded-lg py-3 px-2">
                    <p className="font-bold mb-3 mt-1">Bonjour {currentUser.lastName} {currentUser.firstName}</p>
                    <button
                        className="bg-medium-pink text-white hover:bg-dark-pink rounded-lg p-2 transition-colors text-left"
                        onClick={() => editProfile(currentUser)}
                    >
                        Modifier le profil
                    </button>
                    <button
                        className="bg-medium-pink text-white hover:bg-dark-pink rounded-lg p-2 transition-colors text-left"
                        onClick={dc}
                    >
                        Déconnexion
                    </button>
                </div>
            </div>
        </div>
    );
}