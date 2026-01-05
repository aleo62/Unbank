import { TransactionType } from "@/api/Server";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCreateTransaction } from "@/hooks/transactions/useCreateTransaction";
import { useState } from "react";
import { TransactionPasswordInput } from "./components/TransactionPasswordInput";

interface TransactionDialogProps {
    isOpen: boolean;
    onClose: () => void;
    type: TransactionType.DEPOSIT | TransactionType.WITHDRAW;
    boxId?: string;
}

enum Step {
    AMOUNT = 0,
    PASSWORD = 1,
}

export function TransactionDialog({
    isOpen,
    onClose,
    type,
    boxId,
}: TransactionDialogProps) {
    const [step, setStep] = useState<Step>(Step.AMOUNT);
    const [amount, setAmount] = useState("");
    const [password, setPassword] = useState("");

    const { mutate: createTransaction, isPending } = useCreateTransaction();

    const handleClose = () => {
        setStep(Step.AMOUNT);
        setAmount("");
        setPassword("");
        onClose();
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        value = value.replace(/[^0-9.]/g, "");
        const dots = value.match(/\./g);
        if (dots && dots.length > 1) {
            return;
        }
        if (value.includes(".")) {
            const parts = value.split(".");
            if (parts[1].length > 2) {
                return;
            }
        }

        setAmount(value);
    };

    const handleAmountSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!amount || Number(amount) <= 0) {
            return;
        }
        setStep(Step.PASSWORD);
    };

    const handleTransactionSubmit = () => {
        createTransaction(
            {
                type,
                amount: Number(amount),
                password,
                boxId,
            },
            {
                onSuccess: () => {
                    handleClose();
                },
                onError: () => {
                    setPassword("");
                },
            }
        );
    };

    const isDeposit = type === TransactionType.DEPOSIT;
    const title = isDeposit ? "Deposit" : "Withdraw";
    const description = isDeposit
        ? "Add money to your account."
        : "Withdraw money from your account.";

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                {step === Step.AMOUNT && (
                    <form
                        onSubmit={handleAmountSubmit}
                        className="grid gap-8 py-8 justify-center"
                    >
                        <div className="flex items-center justify-center relative">
                            <span className="text-4xl font-bold text-muted-foreground absolute left-0 -translate-x-full pr-4">
                                R$
                            </span>
                            <div className="w-full max-w-50">
                                <Input
                                    id="amount"
                                    type="text"
                                    inputMode="decimal"
                                    placeholder="0.00"
                                    value={amount}
                                    onChange={handleAmountChange}
                                    className="text-4xl font-bold text-center border-none shadow-none focus-visible:ring-0 px-0 h-auto bg-transparent placeholder:text-muted-foreground/30"
                                    autoFocus
                                />
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <Button
                                type="submit"
                                size="lg"
                                className="w-full max-w-50"
                                disabled={!amount || Number(amount) <= 0}
                            >
                                Next
                            </Button>
                        </div>
                    </form>
                )}

                {step === Step.PASSWORD && (
                    <TransactionPasswordInput
                        value={password}
                        onChange={setPassword}
                        onSubmit={handleTransactionSubmit}
                        isLoading={isPending}
                        onBack={() => setStep(Step.AMOUNT)}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
}
