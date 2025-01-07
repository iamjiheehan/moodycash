import HomeSectionForm from '@/components/form/HomeSection';
import InfoCard from '@/components/home/InfoCard';
import WelcomeSection from '@/components/home/WelcomeSection';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function HomePage() {
    return (
        <section>
            <WelcomeSection
                title={[
                    '오늘의 기분은 어떠신가요',
                    '마음을 기록하는 새로운 방법',
                ]}
                description={[
                    '다양한 감정들을 나타내는 계좌에 소액을 입금하는 송금 시뮬레이션을 통해',
                    '내 감정이 어떻게 돈의 흐름과 연결되는지 한눈에 알아볼 수 있도록 보여드려요.',
                    '새로운 방식으로 오늘의 감정을 기록해보세요.',
                ]}
                url="welcome"
                alt="Intro Image"
            />
            <div className="bg-customLightGray">
                <section className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-12 py-20 sm:py-16">
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
                            title="안전한 송금 시뮬레이션"
                            description={[
                                '송금은 0원에서 9,999원까지 가능합니다. ',
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
            <Link href="/service">
                <section
                    className="relative h-[250px] overflow-hidden flex justify-center items-center bg-center bg-cover"
                    style={{
                        backgroundImage: "url('/assets/Image/welcome-cs.webp')",
                    }}
                >
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <h1 className="relative text-2xl lg:text-3xl xl:text-4xl font-bold text-white">
                        서비스 이용하기
                    </h1>
                </section>
            </Link>
            <WelcomeSection
                title={['How are you feeling today?']}
                description={[
                    '감정을 담은 송금 시뮬레이션 서비스를 이용해보세요.',
                    '기분에 따라 다양한 계좌에 입금하며 감정의 여정을 추적해보세요.',
                    '여러분의 감정이 금융 흐름에 스며드는 모습을 살펴볼 수 있습니다.',
                ]}
                url="moodycash-black"
                alt="Welcome Image"
            />
        </section>
    );
}

export default HomePage;
