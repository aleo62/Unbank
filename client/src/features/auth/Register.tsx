import { AuthTemplate } from ".";
import { RegisterForm } from "./RegisterForm";

export const Register = () => {
    return (
        <AuthTemplate
            title={
                <>
                    It's an {" "}
                    <span className="font-medium text-amber-500">Honor</span> to
                    have you here!
                </>
            }
            subtitle="Create an account to get started, we are excited to have you onboard."
        >
            <RegisterForm />
        </AuthTemplate>
    );
};
