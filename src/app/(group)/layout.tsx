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
                    <Sidebar />
                    <div className="
                    w-full bg-white flex flex-col min-h-screen
                    ml-0
                    lg:ml-80
                    ">
                        <section className='
                        flex-1 overflow-y-auto
                        px-4 pt-20 pb-5
                        sm:px-6 sm:pt-24
                        lg:px-13 lg:pt-20
                        '>
                            {children}
                        </section>
                        <footer className="w-full flex justify-between items-center text-[#5e5e5e] bg-[#f5f6f8] px-4 py-4 text-xs flex-col gap-2 sm:px-6 sm:py-5 sm:text-sm sm:flex-row sm:gap-0 lg:px-13
                        ">
                            <span>УЧЕБНЫЙ ПРОЕКТ</span>
                            <span className="text-center sm:text-right">
                                Вдохновлено{' '}
                                <a
                                    href="https://kulager-auto.kz"
                                    target="_blank"
                                    className="text-black underline hover:no-underline"
                                >
                                    Сетью автошкол Кулагер
                                </a>
                            </span>
                        </footer>
                    </div>
                </div>
            </AuthGuard>
        </ReduxProvider>
    );
}
