import { Label } from '../ui/label';
import { Input } from '../ui/input';

type FormInputProps = {
    name: string;
    type: string;
    label?: string;
    defaultValue?: string;
    placeholder?: string;
    value?: string;
    readonly?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onInput?: (e: React.FormEvent<HTMLInputElement>) => void;
};

function FormInput({
    label,
    name,
    type,
    defaultValue,
    placeholder,
    value,
    readonly = false,
    onChange,
    onInput,
}: FormInputProps) {
    return (
        <div>
            <Label htmlFor={name} className="capitalize">
                {label || name}
            </Label>
            <Input
                id={name}
                name={name}
                type={type}
                defaultValue={defaultValue}
                placeholder={placeholder}
                value={value}
                readOnly={readonly}
                onChange={onChange}
                onInput={onInput}
                required
            />
        </div>
    );
}

export default FormInput;
