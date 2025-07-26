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
                    <div className="ml-[380px] w-full bg-white flex flex-col min-h-screen">
                        <Sidebar />
                        <section className='flex-1 px-13 pt-20 pb-5 overflow-y-auto'>
                            {children}
                        </section>
                        <footer className="w-full flex justify-between items-center px-13 py-5 text-[#5e5e5e] bg-[#f5f6f8]">
                            <span>УЧЕБНЫЙ ПРОЕКТ</span>
                            <span>
                                Вдохновлено <a href="https://kulager-auto.kz" target="_blank" className="text-black underline hover:no-underline">Сетью автошкол Кулагер</a>
                            </span>
                        </footer>
                    </div>
                </div>
            </AuthGuard>
        </ReduxProvider>
    );
}
