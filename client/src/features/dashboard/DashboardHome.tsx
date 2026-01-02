import { useGetMe } from "@/hooks/user/useGetMe";

export const DashboardHome = () => {
    const { data: user } = useGetMe();

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Início</h1>

            <div className="bg-card p-6 rounded-lg shadow-sm border max-w-md">
                <h2 className="text-xl font-semibold mb-4">
                    Olá, {user?.name}!
                </h2>
                <div className="grid gap-2">
                    <p className="text-muted-foreground">Meu Saldo</p>
                    <p className="text-2xl font-bold">
                        {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                        }).format(user?.balance || 0)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {user?.email}
                    </p>
                </div>
            </div>
        </div>
    );
};
