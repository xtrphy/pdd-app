import Sidebar from "@/components/Sidebar";

export default function GroupLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Sidebar />
            <section className='w-full px-10 pt-20'>
                {children}
            </section>
        </>
    );
}
