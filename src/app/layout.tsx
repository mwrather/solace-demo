import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Solace Candidate Assignment',
  description: 'Show us what you got',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="min-h-full">
      <body
        className={`${inter.className} min-h-full bg-gray-50 text-gray-600`}
      >
        <header className="fixed top-0 left-0 z-10 w-full bg-gray-50 h-16 px-6 flex justify-start items-center gap-4">
          <Image src="/solace-logo.svg" alt="Solace" width={115} height={32} />
          <h1 className="font-semibold text-xl">Solace Advocate Search</h1>
        </header>
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
