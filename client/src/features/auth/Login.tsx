import { AuthTemplate } from ".";
import { LoginForm } from "./LoginForm";

export const Login = () => {
    return (
        <AuthTemplate
            title={<><span className="font-medium text-amber-500">Welcome</span> back</>}
            subtitle="Please sign in to your account, and continue managing your finances. (Just kidding, it's fake :p)"
        >
            <LoginForm />
        </AuthTemplate>
    );
};
