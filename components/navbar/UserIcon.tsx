'use client';

import { LuUser } from 'react-icons/lu';
import { fetchProfileImage } from '@/utils/actions';
import { useState, useEffect } from 'react';
import Image from 'next/image';

function UserIcon() {
    const [profileImage, setProfileImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const image = await fetchProfileImage();
                setProfileImage(image);
            } catch (error) {
                console.error('Failed to fetch profile image:', error);
                setProfileImage(null);
            }
        };
        fetchImage();
    }, []);

    if (profileImage) {
        return (
            <Image
                src={profileImage}
                alt="Profile Image"
                className="w-6 h-6 rounded-full object-cover"
                width={24}
                height={24}
            />
        );
    }
    return <LuUser className="w-6 h-6 bg-primary rounded-full text-white" />;
}

export default UserIcon;
