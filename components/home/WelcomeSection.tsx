import Image from 'next/image';
import React from 'react';

const WelcomeSection = ({
    title,
    description,
    url,
    alt,
}: {
    title: string[];
    description: string[];
    url: string;
    alt: string;
}) => {
    return (
        <section className="container">
            <section className="flex items-center justify-between">
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
                <section>
                    <Image
                        src={`/assets/Image/${url}.webp`}
                        alt={alt}
                        height={400}
                        width={450}
                    />
                </section>
            </section>
        </section>
    );
};

export default WelcomeSection;
