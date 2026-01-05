import { Trans, useTranslation } from "react-i18next";
import { AuthTemplate } from ".";
import { LoginForm } from "./components/LoginForm";

export const Login = () => {
    const { t } = useTranslation();

    return (
        <AuthTemplate
            title={
                <Trans
                    i18nKey="login.title"
                    components={{
                        highlight: (
                            <span className="font-medium text-amber-500" />
                        ),
                    }}
                />
            }
            subtitle={t("login.subtitle")}
        >
            <LoginForm />
        </AuthTemplate>
    );
};
