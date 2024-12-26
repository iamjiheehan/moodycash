import React from 'react';
import { Button } from '../ui/button';
import { LuTent } from 'react-icons/lu';
import Link from 'next/link';
import Image from 'next/image';

export default function Logo() {
    return (
        <Button size="icon" asChild>
            <div>
                <Link href="/">
                    <LuTent className="w-6 h-6" />
                </Link>
                {/* <Image
                    src="/logo.png"
                    alt="logo"
                    width={40}
                    height={40}
                    // className="rounded-full
                /> */}
            </div>
        </Button>
    );
}
