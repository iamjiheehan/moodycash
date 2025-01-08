import Image from 'next/image';
import React from 'react';

interface InfoCardProps {
    title: string;
    description: string[];
    imageSrc: string;
    imageAlt: string;
    imageHeight: number;
    imageWidth: number;
    className?: string; // Optional className prop
}

const InfoCard = ({
    title,
    description,
    imageSrc,
    imageAlt,
    imageHeight,
    imageWidth,
    className = '', 
}: InfoCardProps) => {
    return (
        <div
            className={`flex flex-col items-center gap-12 sm:gap-6 ${className}`}
        >
            <h3 className="font-semibold text-xl">{title}</h3>
            <div className="flex flex-col items-center">
                {description.map((desc, index) => (
                    <p key={index} className="break-keep w-4/5 text-center">
                        {desc}
                    </p>
                ))}
            </div>
            <div className="rounded-full overflow-hidden aspect-w-1 aspect-h-1 flex-1">
                <Image
                    className="object-cover h-full"
                    src={imageSrc}
                    alt={imageAlt}
                    height={imageHeight}
                    width={imageWidth}
                />
            </div>
        </div>
    );
};

export default InfoCard;
