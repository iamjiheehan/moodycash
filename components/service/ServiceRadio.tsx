'use client';

import { useServiceDetails } from '@/utils/store';
import * as RadioGroup from '@radix-ui/react-radio-group';
import React from 'react';
import { Label } from '../ui/label';

interface RadioGroupComponentProps {
    moods: { mood: string }[];
}

const SelectRadio: React.FC<RadioGroupComponentProps> = ({ moods }) => {
    return (
        <RadioGroup.Root
            defaultValue={moods[0]?.mood}
            // onValueChange={(value) =>
            //     // useServiceDetails.setState({ mood: value })
            // }
            className="flex flex-col space-y-2"
        >
            {moods.map((mood, index) => (
                <div key={index} className="flex items-center space-x-2">
                    <RadioGroup.Item
                        id={`r${index}`}
                        value={mood.mood}
                        className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center"
                    >
                        <RadioGroup.Indicator className="w-4 h-4 bg-blue-500 rounded-full" />
                    </RadioGroup.Item>
                    <Label htmlFor={`r${index}`} className="text-gray-800">
                        {mood.mood}
                    </Label>
                </div>
            ))}
        </RadioGroup.Root>
    );
};

export default SelectRadio;
