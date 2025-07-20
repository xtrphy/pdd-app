import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from 'next/font/local';
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const IgraSans = localFont({
    src: './fonts/IgraSans.otf',
    display: 'swap',
});

export const metadata: Metadata = {
    title: "PDDApp",
    description: "Get your driver's license with us!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${IgraSans.className} antialiased`}
            >
                <main className="flex">
                    {children}
                </main>
            </body>
        </html>
    );
}
