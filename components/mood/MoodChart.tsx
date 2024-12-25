'use client';

import * as React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const chartData = [
    { date: '2024-06-04', happy: 439, sad: 380, excited: 200 },
    { date: '2024-06-05', happy: 88, sad: 140, excited: 100 },
    { date: '2024-06-06', happy: 294, sad: 250, excited: 150 },
    { date: '2024-06-07', happy: 323, sad: 370, excited: 180 },
    { date: '2024-06-08', happy: 385, sad: 320, excited: 210 },
    { date: '2024-06-09', happy: 438, sad: 480, excited: 220 },
    { date: '2024-06-10', happy: 155, sad: 200, excited: 130 },
    { date: '2024-06-11', happy: 92, sad: 150, excited: 90 },
    { date: '2024-06-12', happy: 492, sad: 420, excited: 250 },
    { date: '2024-06-13', happy: 81, sad: 130, excited: 70 },
    { date: '2024-06-14', sad: 380, excited: 240 },
    { date: '2024-06-15', happy: 307, sad: 350, excited: 200 },
    { date: '2024-06-16', happy: 371, sad: 310, excited: 210 },
    { date: '2024-06-17', happy: 475, sad: 520, excited: 270 },
    { date: '2024-06-18', happy: 107, sad: 170, excited: 110 },
    { date: '2024-06-19', happy: 341, sad: 290, excited: 190 },
    { date: '2024-06-20', happy: 408, sad: 450, excited: 230 },
    { date: '2024-06-21', happy: 169, sad: 210, excited: 140 },
    { date: '2024-06-22', happy: 317, sad: 270, excited: 180 },
    { date: '2024-06-23', happy: 480, sad: 530, excited: 290 },
    { date: '2024-06-24', happy: 132, sad: 180, excited: 100 },
    { date: '2024-06-25', happy: 141, sad: 190, excited: 110 },
    { date: '2024-06-26', happy: 434, sad: 380, excited: 240 },
    { date: '2024-06-27', happy: 448, sad: 490, excited: 260 },
    { date: '2024-06-28', happy: 149, sad: 200, excited: 120 },
    { date: '2024-06-29', happy: 103, sad: 160, excited: 90 },
    { date: '2024-06-30', happy: 446, sad: 400, excited: 250 },
    { date: '2024-06-31', happy: 446, sad: 400 },
];

// Extract unique moods from chartData
const moods = Array.from(
    new Set(
        chartData.flatMap((item) =>
            Object.keys(item).filter((key) => key !== 'date')
        )
    )
);

const chartConfig = moods.reduce((config, mood, index) => {
    config[mood] = {
        label: mood.charAt(0).toUpperCase() + mood.slice(1),
        color: `hsl(var(--chart-${index + 1}))`,
    };
    return config;
}, {} as ChartConfig);

export function MoodChart() {
    const [timeRange, setTimeRange] = React.useState('90d');

    const filteredData = React.useMemo(() => {
        const referenceDate = new Date(
            Math.max(...chartData.map((item) => new Date(item.date).getTime()))
        );
        let daysToSubtract = 90;
        if (timeRange === '30d') {
            daysToSubtract = 30;
        } else if (timeRange === '7d') {
            daysToSubtract = 7;
        }
        const startDate = new Date(referenceDate);
        startDate.setDate(startDate.getDate() - daysToSubtract);
        return chartData.filter((item) => {
            const date = new Date(item.date);
            return date >= startDate;
        });
    }, [timeRange]);

    return (
        <Card>
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1 text-center sm:text-left">
                    <CardTitle>Mood Chart - Interactive</CardTitle>
                    <CardDescription>
                        Showing your moodswing for the last 3 months
                    </CardDescription>
                </div>
                <Select
                    value={timeRange}
                    onValueChange={(value) => {
                        console.log('Selected value:', value);
                        setTimeRange(value);
                    }}
                >
                    <SelectTrigger
                        className="w-[160px] rounded-lg sm:ml-auto"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Last 3 months" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="90d" className="rounded-lg">
                            Last 3 months
                        </SelectItem>
                        <SelectItem value="30d" className="rounded-lg">
                            Last 30 days
                        </SelectItem>
                        <SelectItem value="7d" className="rounded-lg">
                            Last 7 days
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <AreaChart data={filteredData}>
                        <defs>
                            {moods.map((mood, index) => (
                                <linearGradient
                                    key={mood}
                                    id={`fill${
                                        mood.charAt(0).toUpperCase() +
                                        mood.slice(1)
                                    }`}
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor={`var(--color-${mood})`}
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor={`var(--color-${mood})`}
                                        stopOpacity={0.1}
                                    />
                                </linearGradient>
                            ))}
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                });
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(
                                            value
                                        ).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                        });
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        {moods.map((mood) => (
                            <Area
                                key={mood}
                                dataKey={mood}
                                type="natural"
                                fill={`url(#fill${
                                    mood.charAt(0).toUpperCase() + mood.slice(1)
                                })`}
                                stroke={`var(--color-${mood})`}
                                stackId="a"
                                connectNulls={true}
                            />
                        ))}
                        <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
