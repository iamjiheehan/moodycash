'use client';

import React from 'react';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from './theme-provider';

function Providers({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Toaster />
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
        </div>
    );
}
export default Providers;
