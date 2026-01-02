import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { CreateBoxDialog } from "@/features/boxes/CreateBoxDialog";
import { useGetBoxes } from "@/hooks/boxes/useGetBoxes";
import { useGetMe } from "@/hooks/user/useGetMe";
import { PackageOpen } from "lucide-react";

export const BoxesPage = () => {
    const { data: user } = useGetMe();
    const { data: boxes, isLoading } = useGetBoxes(user?.id || "");

    if (isLoading) {
        return <div className="p-8">Carregando caixinhas...</div>;
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Caixinhas</h1>
                <CreateBoxDialog />
            </div>

            {!boxes || boxes.length === 0 ? (
                <div className="bg-card p-12 rounded-lg shadow-sm border border-dashed flex flex-col items-center justify-center text-center">
                    <div className="bg-muted p-4 rounded-full mb-4">
                        <PackageOpen className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                        Nenhuma caixinha criada
                    </h3>
                    <p className="text-muted-foreground max-w-sm">
                        Crie caixinhas para organizar seu dinheiro e guardar
                        para objetivos específicos.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {boxes.map((box) => (
                        <Card key={box.id}>
                            <CardHeader>
                                <CardTitle className="flex justify-between items-start">
                                    <span>{box.name}</span>
                                </CardTitle>
                                <CardDescription>
                                    {box.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground mb-1">
                                    Saldo atual
                                </p>
                                <p className="text-2xl font-bold text-primary">
                                    {new Intl.NumberFormat("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    }).format(box.balance)}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};
