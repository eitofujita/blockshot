import '../globals.css';


export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body suppressHydrationWarning={true}>
                {children}
            </body>
        </html>
    );
}
