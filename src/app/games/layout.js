import { Toaster } from "sonner";

export default function RootLayout({ children }) {
    return (
        <div className="flex flex-col justify-items-center min-h-screen p-15">
            <div className="flex flex-col items-center gap-8">{children}</div>
            <Toaster />
        </div>
    );
}
