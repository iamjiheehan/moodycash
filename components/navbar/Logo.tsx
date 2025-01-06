import React from 'react';

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
                />
            </div>
        </Link>
    );
}
