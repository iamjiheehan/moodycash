import { Button } from '@/components/ui/button';

function HomePage() {
    return (
        <section>
            <h1 className="text-3xl">HomePage</h1>
            <Button variant="outline" size="lg" className="capitalize m-8">
                Click me
            </Button>
        </section>
    );
}
export default HomePage;
