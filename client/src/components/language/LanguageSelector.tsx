import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function LanguageSelector() {
    return (
        <Select>
            <SelectTrigger className="w-45">
                <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Languages</SelectLabel>
                    <SelectItem value="EN">English</SelectItem>
                    <SelectItem value="PT-BR">Portuguese (Brazil)</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
