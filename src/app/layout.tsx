import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";

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
                <main className="bg-[#f6f6f6] flex justify-center items-center min-h-screen">
                    {children}
                </main>
            </body>
        </html>
    );
}
