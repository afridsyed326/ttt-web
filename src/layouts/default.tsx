import { Navbar } from "@/components/navbar";

export default function DefaultLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="container mx-auto max-w-7xl px-6 flex-grow pt-5">
                {children}
            </main>
            <footer className="py-2 text-center bg-gray-400 dark:bg-gray-900">
                <p>
                    © {new Date().getFullYear()} Tic Tac Toe Online. All rights
                    reserved.
                </p>
            </footer>
        </div>
    );
}
