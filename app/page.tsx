import SectionForm from '@/components/form/SectionForm';
import { Button } from '@/components/ui/button';

function HomePage() {
    return (
        <section>
            <section>
                <WelcomeSection />
            </section>
            <section className="grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 sm:py-8">
                <section>
                    <div>그래프 이미지</div>
                </section>
                <SectionForm
                    subtitle="Deposit money into your desired account based on your
                        mood."
                    additionalSubtitle={[
                        'Check the account balance through a graph',
                        'and easily track your emotional changes at a glance.',
                    ]}
                />
            </section>
            <section className="grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 sm:py-8">
                <SectionForm subtitle="How are you feeling today?" />
                <section>
                    <div>이미지</div>
                </section>
            </section>{' '}
            <section className="grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 sm:py-8">
                <SectionForm subtitle="Transfer to your Happy Account !" />
                <section>
                    <div>이미지</div>
                </section>
            </section>{' '}
            <section className="flex flex-col justify-center gap-4 items-center">
                <SectionForm
                    subtitle="Record your mood with a simple note"
                    button="Start Using the Service"
                />
            </section>
        </section>
    );
}

const WelcomeSection = () => {
    return (
        <section className="grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 sm:py-8">
            <section className="flex flex-col items-start gap-4">
                <h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-black-600 leading-normal">
                    Track Your Mood,
                    <br /> Fund Your Emotions
                </h1>
                <h2>
                    Track your emotional journey by depositing into different
                    accounts
                    <br /> that reflect your mood. Whether you&apos;re feeling
                    upbeat or down, <br />
                    you can visualize how your emotions influence your financial
                    flow.
                </h2>
                <Button variant="outline" size="lg" className="capitalize">
                    Click me
                </Button>
            </section>
            <section>
                <div>Image section</div>
            </section>
        </section>
    );
};
export default HomePage;
