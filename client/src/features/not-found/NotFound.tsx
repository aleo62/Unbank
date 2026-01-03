import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export const NotFound = () => {
    return (
        <section className="flex flex-col items-center justify-center min-h-screen gap-20">
            <div className="text-6xl flex items-center justify-center">
                <h1 className="pr-5 font-semibold">404</h1>
                <p className="text-3xl pl-5 w-30  border-l-2 border-muted-foreground/50">
                    Página não encontrada
                </p>
            </div>
            <Link to="/">
                <Button>Voltar para o Início</Button>
            </Link>
        </section>
    );
};
