'use client';

import { useToast } from '@/hooks/use-toast';
import { SignOutButton } from '@clerk/nextjs';

function SignOutLink() {
    const { toast } = useToast();
    const handleLogout = () => {
        toast({ description: '로그아웃 되었습니다' });
    };
    return (
        <SignOutButton redirectUrl="/">
            <button className="w-full text-left" onClick={handleLogout}>
                로그아웃
            </button>
        </SignOutButton>
    );
}
export default SignOutLink;
