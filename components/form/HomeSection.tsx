import Image from 'next/image';
import { Button } from '../ui/button';
import { add } from 'date-fns';
import React from 'react';

type SectionFormProps = {
    image?: string;
    title?: string;
    subtitle?: string;
    additionalSubtitle?: string[];
    button?: string;
};

const HomeSectionForm = ({
    image,
    title = '',
    subtitle,
    additionalSubtitle,
    button,
}: SectionFormProps) => {
    return (
        <section className="flex flex-col justify-center gap-4 items-center">
            {image && (
                <Image
                    src={image}
                    alt={title}
                    width={500}
                    height={300}
                    className="w-full h-auto"
                />
            )}

            <section className="flex flex-col justify-center gap-4">
                {title && <h1>{title}</h1>}
                {subtitle && <h2>{subtitle}</h2>}
                {additionalSubtitle &&
                    additionalSubtitle.map((text, index) => (
                        <h2 key={index}>
                            {text.split('\n').map((line, index) => (
                                <React.Fragment key={index}>
                                    {line}
                                    <br />
                                </React.Fragment>
                            ))}
                        </h2>
                    ))}
            </section>
            {button && (
                <Button variant="outline" size="lg" className="capitalize">
                    {button}
                </Button>
            )}
        </section>
    );
};

export default HomeSectionForm;
