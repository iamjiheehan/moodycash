'use client';

import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useServiceDetails } from '@/utils/store';

type TextAreaInputProps = {
    name: string;
    labelText?: string;
    defaultValue?: string;
    placeholder?: string;
};

export default function TextAreaInput({
    name,
    labelText,
    defaultValue,
    placeholder,
}: TextAreaInputProps) {
    return (
        <div className="mb-2">
            <Label htmlFor={name} className="capitalize">
                {labelText || name}
            </Label>
            <Textarea
                id={name}
                name={name}
                rows={5}
                required
                className="leading-loose"
                placeholder={placeholder}
                onChange={(e) => {
                    useServiceDetails.setState({ description: e.target.value });
                }}
            />
        </div>
    );
}
