import { Theme } from "@radix-ui/themes";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const poppins = Poppins({
    variable: "--font-poppins",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
    title: "Unbank",
    description: "Financial services for the future."
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${poppins.variable} antialiased`}>
                <Providers>
                    <Theme>{children}</Theme>
                </Providers>
            </body>
        </html>
    );
}
