import { LanguageSelector } from "@/components/language/LanguageSelector";
import { AuthFooterItems } from "@/constants/auth-footer";

export const AuthFooter = () => {
    return (
        <footer className="py-12 max-w-4xl mx-auto w-full px-4 border-t border-t-muted-foreground/10 flex max-md:flex-col md:items-center gap-5 justify-between">
            <ul className="flex justify-center space-x-6 text-sm text-muted-foreground flex-wrap">
                {AuthFooterItems.map((item) => (
                    <li>
                        <a href="#" className="hover:text-foreground">
                            {item}
                        </a>
                    </li>
                ))}
            </ul>
            <LanguageSelector/>
        </footer>
    );
};
