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
import banks from '@/data/BanksData';

interface SettingBankProps {
    value?: string;
    label: string;
    onChange?: (value: string, label: string) => void;
    defaultValue?: string;
}

export function SettingBank({
    value,
    label,
    onChange,
    defaultValue,
}: SettingBankProps) {
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(
        defaultValue || value
    );

    React.useEffect(() => {
        if (defaultValue) {
            setSelectedValue(defaultValue);
        }
    }, [defaultValue]);

    return (
        <>
            <input
                type="hidden"
                name="bankName"
                value={selectedValue}
                required
            />
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                    >
                        {selectedValue
                            ? banks.find((bank) => bank.value === selectedValue)
                                  ?.label
                            : '은행을 선택해주세요'}
                        <ChevronsUpDown className="opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="검색하기" className="h-9" />
                        <CommandList>
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <CommandGroup>
                                {banks.map((bank) => (
                                    <CommandItem
                                        key={bank.value}
                                        value={bank.value}
                                        onSelect={() => {
                                            setSelectedValue(bank.value);
                                            onChange?.(bank.value, bank.label);
                                            setOpen(false);
                                        }}
                                    >
                                        {bank.label}
                                        <Check
                                            className={cn(
                                                'ml-auto',
                                                selectedValue === bank.value
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
        </>
    );
}
