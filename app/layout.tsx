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
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider localization={koKR}>
            <html lang="en" suppressHydrationWarning>
                <body className={(inter.className, FontClassNames)}>
                    <Providers>
                        <Navbar />
                        <main className="py-10">{children}</main>
                        <Footer />
                    </Providers>
                </body>
            </html>
        </ClerkProvider>
    );
}
