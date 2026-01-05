import type { ReactNode } from "react";
import { AuthHeader } from "./components/AuthHeader";
import { AuthFooter } from "./components/AuthFooter";

export const AuthTemplate = ({ children, title, subtitle }: { children: ReactNode, title: ReactNode | string, subtitle: string }) => {
    return (
        <>
            <AuthHeader />
            <main className="max-w-lg mx-auto w-full max-md:py-5 flex-1 flex flex-col justify-center px-4">
                <div className="tracking-wide pb-5">
                    <h1 className="text-4xl md:text-5xl drop-shadow-sm">{title}.</h1>
                    <p className="text-sm md:text-md text-muted-foreground mt-4">
                        {subtitle}
                    </p>
                </div>
                {children}
            </main>
            <AuthFooter />
        </>
    );
};
