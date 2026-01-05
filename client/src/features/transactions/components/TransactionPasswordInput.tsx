import { Button } from "@/components/ui/button";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import React from "react";

interface TransactionPasswordInputProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
    isLoading: boolean;
    onBack?: () => void;
}

export function TransactionPasswordInput({
    value,
    onChange,
    onSubmit,
    isLoading,
    onBack,
}: TransactionPasswordInputProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (value.length === 4) {
            onSubmit();
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="grid gap-8 py-4 justify-center"
        >
            <div className="grid gap-4 justify-center text-center">
                <Label htmlFor="password">Confirm your password</Label>
                <div className="flex justify-center">
                    <InputOTP
                        id="password"
                        maxLength={4}
                        value={value}
                        onChange={(value) => onChange(value)}
                        disabled={isLoading}
                    >
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                        </InputOTPGroup>
                    </InputOTP>
                </div>
            </div>
            <div className="flex justify-center gap-2">
                {onBack && (
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={onBack}
                        disabled={isLoading}
                    >
                        Back
                    </Button>
                )}
                <Button type="submit" disabled={isLoading || value.length < 4}>
                    {isLoading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Confirm
                </Button>
            </div>
        </form>
    );
}
