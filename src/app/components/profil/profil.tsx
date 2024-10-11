"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAtom } from "jotai";
import { currentUserAtom, isProfileVisibleAtom } from "@/app/atom";
import defaultUser from "@/app/user/defaultUser";


export default function Profile() {
    const router = useRouter();

    const [isProfileVisible, setIsProfileVisible] = useAtom(isProfileVisibleAtom);

    const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const profile = document.getElementById("profile");
            if (profile && !profile.contains(event.target as Node)) {
                setIsProfileVisible(false);
            }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setIsProfileVisible]);

    const dc = () => {
        document.cookie = 'uuid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        setCurrentUser(defaultUser);
        window.location.reload();
    };

    return (
        <div className="text-sm">
            <button
                className="hover:opacity-70 transition-all"
                onClick={() => setIsProfileVisible(true)}
            >
                <Image
                    src={`data:image/jpeg;base64,${currentUser.pp}`}
                    alt="Profile Picture"
                    className='rounded-full mr-6'
                    width={40}
                    height={40}
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
                        onClick={() => router.push(`/edit-profile/${currentUser.id}`)
                    }
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
        </div >
    );
}