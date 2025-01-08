'use client';

import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useServiceDetails } from '@/utils/store';

type TextAreaInputProps = {
    name: string;
    labelText?: string;
    defaultValue?: string;
    placeholder?: string;
    isLabelHidden?: boolean;
};

export default function TextAreaInput({
    name,
    labelText,
    defaultValue,
    placeholder,
    isLabelHidden = false,
}: TextAreaInputProps) {
    return (
        <div className="">
            {!isLabelHidden && (
                <Label htmlFor={name} className="capitalize">
                    {labelText || name}
                </Label>
            )}
            <Textarea
                id={name}
                name={name}
                rows={5}
                required
                defaultValue={defaultValue}
                className="leading-loose mt-2"
                placeholder={placeholder}
                onChange={(e) => {
                    useServiceDetails.setState({ description: e.target.value });
                }}
            />
        </div>
    );
}
