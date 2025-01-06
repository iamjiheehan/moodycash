import React from 'react';
import { Button } from '../ui/button';
import { LuTent } from 'react-icons/lu';
import Link from 'next/link';
import Image from 'next/image';

export default function Logo() {
    return (
        <Link href="/">
            <div className="overflow-hidden">
                <Image
                    src="/assets/Image/moodycash-primary.png"
                    alt="logo"
                    width={160}
                    height={40}
                    // className="rounded-full
                />
            </div>
        </Link>
    );
}
