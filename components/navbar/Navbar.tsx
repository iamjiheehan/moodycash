'use client';

import LinksDropdown from './LinksDropdown';
import Logo from './Logo';
import NavSearch from './NavSearch';
import DarkMode from './DarkMode';
import { navMenuLinks } from '@/utils/links';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="border-b">
            <div className="container flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap gap-4 py-8">
                <Logo />
                {/* <NavSearch /> */}
                <ul className="flex gap-8">
                    {navMenuLinks.map((link) => {
                        const isActive = pathname === link.href.trim(); // 공백 제거 후 비교
                        return (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`capitalize w-full ${
                                        isActive ? 'font-bold' : ''
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
                <div className="flex gap-4 items-center">
                    <DarkMode />
                    <LinksDropdown />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
