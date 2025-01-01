import HomeSectionForm from '@/components/form/HomeSection';
import InfoCard from '@/components/home/InfoCard';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

function HomePage() {
    return (
        <section>
            <WelcomeSection />
            <div className="bg-customLightGray">
                <section className="container flex flex-col items-center gap-12 py-20 sm:py-16">
                    <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-black-600">
                        감정을 담은 송금 웹 서비스
                    </h1>
                    <section className="grid grid-cols-1 justify-items-center sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                        <InfoCard
                            title="기분에 따라 계좌 설정"
                            description={[
                                '기분이 좋았던 날, 힘들었던 날을',
                                '송금 기록으로 확인하며 자신만의 감정 여정을 그려보세요.',
                            ]}
                            imageSrc="/assets/Image/welcome-banking.webp"
                            imageAlt="Welcome image"
                            imageHeight={300}
                            imageWidth={300}
                        />
                        <InfoCard
                            title="한 눈에 보는 흐름"
                            description={[
                                '캘린더와 그래프 형식으로 ',
                                '흐름을 한 눈에 쉽게 확인할 수 있어요.',
                            ]}
                            imageSrc="/assets/Image/welcome-checking.webp"
                            imageAlt="Welcome image"
                            imageHeight={350}
                            imageWidth={300}
                        />
                        <InfoCard
                            title="안전한 송금 서비스"
                            description={[
                                '보안을 위해 송금은 0원에서 9,000원까지 가능합니다. ',
                                '그날의 감정을 안전하게 기록해 보세요.',
                            ]}
                            imageSrc="/assets/Image/welcome-safe.webp"
                            imageAlt="Welcome image"
                            imageHeight={300}
                            imageWidth={300}
                        />
                    </section>
                </section>
            </div>
            <Link href="/about">
                <section
                    className="relative h-[250px] overflow-hidden flex justify-center items-center bg-center bg-cover"
                    style={{
                        backgroundImage: "url('/assets/Image/welcome-cs.webp')",
                    }}
                >
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <h1 className="relative text-2xl lg:text-3xl xl:text-4xl font-bold text-white">
                        사용법 보러가기
                    </h1>
                </section>
            </Link>
            <section className="container">
                <section className="flex items-center justify-between">
                    <section className="flex flex-col items-start gap-6">
                        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-black-600 leading-normal">
                            How are you feeling today?
                        </h1>
                        <h2>
                            매일매일 감정을 기록하고 기록하며,
                            <br />
                            나만의 감정 여행을 떠나보세요.
                            <br /> 감정의 변화에 맞는 송금을 통해 새로운 금융
                            경험을 즐길 수 있습니다.
                        </h2>
                    </section>
                    <Link href="/service">
                        <Image
                            src="/assets/Image/moodycash-black.webp"
                            alt="Welcome image"
                            height={400}
                            width={450}
                        ></Image>
                    </Link>
                </section>
            </section>
        </section>
    );
}

const WelcomeSection = () => {
    return (
        <section className="container">
            <section className="flex items-center justify-between">
                <section className="flex flex-col items-start gap-6">
                    <h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-black-600 leading-normal">
                        Track Your Mood,
                        <br /> Fund Your Emotions
                    </h1>
                    <h2>
                        Track your emotional journey by depositing into
                        different accounts
                        <br /> that reflect your mood. Whether you&apos;re
                        feeling upbeat or down, <br />
                        you can visualize how your emotions influence your
                        financial flow.
                    </h2>
                </section>
                <section>
                    <Image
                        src="/assets/Image/welcome.webp"
                        alt="Welcome image"
                        height={400}
                        width={450}
                    ></Image>
                </section>
            </section>
        </section>
    );
};

export default HomePage;
