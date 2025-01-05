import Image from 'next/image';

interface InfoCardProps {
    title: string;
    description: string[];
    imageSrc: string;
    imageAlt: string;
    imageHeight: number;
    imageWidth: number;
}

const InfoCard = ({
    title,
    description,
    imageSrc,
    imageAlt,
    imageHeight,
    imageWidth,
}: InfoCardProps) => {
    return (
        <div className="flex flex-col items-center gap-12 sm:gap-6">
            <h3 className="font-semibold text-xl">{title}</h3>
            <div className="flex flex-col items-center">
                {description.map((desc, index) => (
                    <p key={index} className="break-keep w-4/5 text-center">
                        {desc}
                    </p>
                ))}
            </div>
            <div className="rounded-full overflow-hidden h-full">
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
