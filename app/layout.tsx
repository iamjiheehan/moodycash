import './globals.css';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import Navbar from '@/components/navbar/Navbar';
import Providers from './provides';
import { ClerkProvider } from '@clerk/nextjs';
import { koKR } from '@clerk/localizations';
import Footer from './footer/page';
import { FontClassNames } from '@/styles/fonts/fonts';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'MoodyCash',
    description: 'Log your emotions and reflect on them financially.',
    keywords: 'Next.js, Typescript, TailwindCSS',
    icons: {
        icon: '/favicon/favicon.ico',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider localization={koKR}>
            <html lang="en" className="h-full" suppressHydrationWarning>
                <body
                    className={`${inter.className} ${FontClassNames} h-full flex flex-col`}
                >
                    <Providers>
                        <Navbar />
                        <main className="py-10 flex-1">{children}</main>
                        <Footer />
                    </Providers>
                </body>
            </html>
        </ClerkProvider>
    );
}
