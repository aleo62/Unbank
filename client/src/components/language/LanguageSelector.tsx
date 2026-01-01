import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";

export function LanguageSelector() {
    const { i18n } = useTranslation();

    const handleChangeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        localStorage.setItem("language", lng);
    }

    return (
        <Select defaultValue={i18n.language} onValueChange={(value) => handleChangeLanguage(value)}>
            <SelectTrigger className="w-45">
                <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Languages</SelectLabel>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ptbr">Portuguese (Brazil)</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
