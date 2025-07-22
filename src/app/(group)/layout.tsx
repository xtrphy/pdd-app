import AuthGuard from "@/components/AuthGuard";
import Sidebar from "@/components/Sidebar";
import ReduxProvider from "@/utils/rtk/Provider";

export default function GroupLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ReduxProvider>
            <AuthGuard>
                <Sidebar />
                <section className='w-full h-screen px-10 pt-20'>
                    {children}
                </section>
            </AuthGuard>
        </ReduxProvider>
    );
}
