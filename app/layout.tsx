import './globals.css';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import Navbar from '@/components/navbar/Navbar';
import Providers from './provides';
import { ClerkProvider } from '@clerk/nextjs';
import { koKR } from '@clerk/localizations';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'MoodyCash',
    description: 'Log your emotions and reflect on them financially.',
    keywords: 'Next.js, Typescript, TailwindCSS',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider localization={koKR}>
            <html lang="en" suppressHydrationWarning>
                <body className={inter.className}>
                    <Providers>
                        <Navbar />
                        <main className="container py-10">{children}</main>
                    </Providers>
                </body>
            </html>
        </ClerkProvider>
    );
}
