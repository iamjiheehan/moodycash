import { Button } from '@/components/ui/button';

function HomePage() {
    return (
        <section>
            <section>
                <section className="grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 sm:py-8">
                    <section className="flex flex-col justify-center gap-4">
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
                        <div>Image section</div>
                    </section>
                </section>
                <Button variant="outline" size="lg" className="capitalize">
                    Click me
                </Button>
            </section>
            <section className="grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 sm:py-8">
                <section>
                    <div>그래프 이미지</div>
                </section>
                <section className="flex flex-col justify-center gap-4">
                    <h2>
                        Deposit money into your desired account based on your
                        mood.
                    </h2>
                    <h2>
                        Check the account balance through a graph
                        <br /> and easily track your emotional changes at a
                        glance.
                    </h2>
                </section>
            </section>
            <section className="grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 sm:py-8">
                <section className="flex flex-col justify-center gap-4">
                    <h2>How are you feeling today?</h2>
                </section>
                <section>
                    <div>기분 체크</div>
                </section>
            </section>{' '}
            <section className="grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 sm:py-8">
                <section className="flex flex-col justify-center gap-4">
                    <h2>Transfer to your Happy Account !</h2>
                </section>
                <section>
                    <div>계좌 등록</div>
                </section>
            </section>{' '}
            <section className="flex flex-col justify-center gap-4 items-center">
                <section className="flex flex-col justify-center gap-4">
                    <h2>Record your mood with a simple note</h2>
                </section>
                <Button variant="outline" size="lg" className="capitalize">
                    Start Using the Service
                </Button>
            </section>
        </section>
    );
}
export default HomePage;
