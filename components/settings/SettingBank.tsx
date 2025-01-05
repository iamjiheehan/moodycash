'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

const banks = [
    {
        value: '004',
        label: '국민은행',
    },
    {
        value: '020',
        label: '우리은행',
    },
    {
        value: '088',
        label: '신한은행',
    },
    {
        value: '003',
        label: '기업은행',
    },
    {
        value: '023',
        label: 'SC제일은행',
    },
    {
        value: '011',
        label: '농협은행',
    },
    {
        value: '005',
        label: '외환은행',
    },
    {
        value: '090',
        label: '카카오뱅크',
    },
    {
        value: '032',
        label: '부산은행',
    },
    {
        value: '071',
        label: '우체국',
    },
    {
        value: '031',
        label: '대구은행',
    },
    {
        value: '037',
        label: '전북은행',
    },
    {
        value: '035',
        label: '제주은행',
    },
    {
        value: '007',
        label: '수협은행',
    },
    {
        value: '027',
        label: '씨티은행',
    },
    {
        value: '039',
        label: '경남은행',
    },
];

export function SettingBank() {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('');

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? banks.find((banks) => banks.value === value)?.label
                        : '은행을 선택해주세요'}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput
                        placeholder="검색하기"
                        className="h-9"
                    />
                    <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {banks.map((banks) => (
                                <CommandItem
                                    key={banks.value}
                                    value={banks.value}
                                    onSelect={(currentValue) => {
                                        setValue(
                                            currentValue === value
                                                ? ''
                                                : currentValue
                                        );
                                        setOpen(false);
                                    }}
                                >
                                    {banks.label}
                                    <Check
                                        className={cn(
                                            'ml-auto',
                                            value === banks.value
                                                ? 'opacity-100'
                                                : 'opacity-0'
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
