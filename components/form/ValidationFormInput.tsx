import React from 'react';
import { Input } from '../ui/input';
import { FaCheck } from 'react-icons/fa';
import { Label } from '../ui/label';

type ValidationFormInputProps = {
    name: string;
    readOnly?: boolean;
    type?: string;
    label?: string;
    defaultValue?: string;
    placeholder?: string;
    value?: string;
    isValid?: boolean;
    isRequired?: boolean;
};

export default function ValidationFormInput({
    label,
    name,
    readOnly,
    type = 'text',
    defaultValue,
    placeholder,
    isValid,
    value,
}: ValidationFormInputProps) {
    return (
        <div>
            <Label htmlFor={name} className="capitalize">
                {label || name}
            </Label>
            <div className="relative">
                <Input
                    id={name}
                    name={name}
                    value={value}
                    readOnly={readOnly}
                    type={type}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    className={`${
                        isValid
                            ? 'border-[hsl(var(--primary))] text-[hsl(var(--primary))]'
                            : ''
                    }`}
                />
                {isValid && (
                    <span className="absolute top-1/2 transform -translate-y-1/2 right-4">
                        <FaCheck className="text-[hsl(var(--primary))]" />
                    </span>
                )}
            </div>
        </div>
    );
}
