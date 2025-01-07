import Image from 'next/image';
import React from 'react';

const WelcomeSection = ({
    title,
    description,
    url,
    alt,
    format = 'webp',
    className,
    isThereAdarkModeImage = true,
    darkModeFormat = 'webp',
}: {
    title: string[];
    description: string[];
    url: string;
    alt: string;
    format?: string;
    className?: string;
    darkModeFormat?: string;
    isThereAdarkModeImage?: boolean;
}) => {
    return (
        <section
            className={`container mx-auto px-4 sm:px-6 lg:px-8 ${className}`}
        >
            <section className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-0">
                <section className="flex flex-col items-start gap-6">
                    <h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-black-600 leading-normal">
                        {title.map((text, index) => (
                            <React.Fragment key={index}>
                                {text}
                                <br />
                            </React.Fragment>
                        ))}
                    </h1>
                    <h2>
                        {description.map((text, index) => (
                            <React.Fragment key={index}>
                                {text}
                                <br />
                            </React.Fragment>
                        ))}
                    </h2>
                </section>
                <section className="min-h-[450px] flex flex-col justify-center">
                    <Image
                        src={`/assets/Image/${url}.${format}`}
                        alt={alt}
                        height={400}
                        width={450}
                        className={`${
                            isThereAdarkModeImage
                                ? 'dark:hidden'
                                : 'dark:filter dark:invert'
                        }`}
                    />
                    {isThereAdarkModeImage && (
                        <Image
                            src={`/assets/Image/dark-${url}.${darkModeFormat}`}
                            alt={alt}
                            height={450}
                            width={450}
                            className="hidden dark:block"
                        />
                    )}
                </section>
            </section>
        </section>
    );
};

export default WelcomeSection;
