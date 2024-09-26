"use client";

import { UserInterface } from "@/app/model/user";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ProfileProps {
    currentUser: UserInterface;
    setCurrentUser: Dispatch<SetStateAction<UserInterface>>;
    defaultUser: UserInterface;
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
        setCurrentUser(defaultUser);
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
        <div>
            <button
                className="hover:opacity-70 transition-all"
                onClick={displayProfile}
            >
                <img src={`data:image/jpeg;base64,${currentUser.pp}`} alt="Profile Picture" className='w-11 h-11 rounded-full mr-6' />
            </button>

            <div
                id="profile"
                className={`absolute left-80 z-20 transition-opacity duration-300 ${isProfileVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            >
                <div className="flex justify-end pr-5 h-9 w-full bg-medium-pink rounded-t-lg">
                    <button onClick={hideProfile}>
                        <img
                            src="/cross.png"
                            alt="cross"
                            className="w-7 h-7 p-1 hover:bg-dark-pink rounded-full"
                        />
                    </button>
                </div>

                <div className="text-dark-pink pl-5 pt-2 flex flex-col bg-white pr-4 pb-5 shadow-2xl">
                    <button
                        className="bg-medium-pink text-white hover:bg-dark-pink rounded-lg p-2 transition-colors mt-2"
                        onClick={() => editProfile(currentUser)}
                    >
                        Modifier le profil
                    </button>
                    <button
                        className="bg-medium-pink text-white hover:bg-dark-pink rounded-lg p-2 transition-colors mt-2"
                        onClick={dc}
                    >
                        Déconnexion
                    </button>
                </div>
            </div>
        </div>
    );
}