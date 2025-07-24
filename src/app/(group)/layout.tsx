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
                <div className="flex min-h-screen w-full">
                    <div className="ml-[380px] w-full bg-white">
                        <Sidebar />
                        <section className='flex-1 px-13 pt-20 pb-5 overflow-y-auto'>
                            {children}
                        </section>
                    </div>
                </div>
            </AuthGuard>
        </ReduxProvider>
    );
}
