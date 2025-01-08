import { Button } from '../ui/button';
import Link from 'next/link';

function EmptyList({
    heading = '불러올 데이터가 없습니다',
    message = '다시 시도해주세요.',
    btnText = 'back home',
}: {
    heading?: string;
    message?: string;
    btnText?: string;
}) {
    return (
        <div className="mt-4">
            <h2 className="text-xl font-bold ">{heading}</h2>
            <p className="text-lg">{message}</p>
            <Button asChild className="mt-4 capitalize" size="lg">
                <Link href="/">{btnText}</Link>
            </Button>
        </div>
    );
}
export default EmptyList;
