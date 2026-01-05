import { Trans, useTranslation } from "react-i18next";
import { AuthTemplate } from ".";
import { RegisterForm } from "./components/RegisterForm";

export const Register = () => {
    const { t } = useTranslation();

    return (
        <AuthTemplate
            title={
                <Trans
                    i18nKey="register.title"
                    components={{
                        highlight: (
                            <span className="font-medium text-amber-500" />
                        ),
                    }}
                />
            }
            subtitle={t("register.subtitle")}
        >
            <RegisterForm />
        </AuthTemplate>
    );
};
