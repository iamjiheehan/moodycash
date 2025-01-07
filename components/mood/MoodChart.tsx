'use client';

import * as React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import { fetchServiceData } from '@/utils/fetchServiceData';

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

interface ServiceData {
    id: string;
    date: Date;
    description: string;
    mood: string;
    price: number;
}

export function MoodChart() {
    const [timeRange, setTimeRange] = React.useState('90d');
    const [chartData, setChartData] = React.useState<ServiceData[]>([]);

    React.useEffect(() => {
        const fetchData = async () => {
            const data = await fetchServiceData();
            if (data) {
                setChartData(data);
            }
        };

        fetchData();
    }, []);

    const moodlist = Array.from(new Set(chartData.map((item) => item.mood)));

    const chartConfig = moodlist.reduce((config, mood, index) => {
        config[mood] = {
            label: mood.charAt(0).toUpperCase() + mood.slice(1),
            color: `hsl(var(--chart-${index + 1}))`,
        };
        return config;
    }, {} as ChartConfig);

    const transformedData = chartData.map((item) => {
        const newItem: { [key: string]: any } = { ...item };
        moodlist.forEach((mood) => {
            newItem[mood] = item.mood === mood ? item.price : null;
        });
        return newItem;
    });

    const filteredData = React.useMemo(() => {
        const referenceDate = new Date(
            Math.max(
                ...transformedData.map((item) => new Date(item.date).getTime())
            )
        );
        let daysToSubtract = 90;
        if (timeRange === '30d') {
            daysToSubtract = 30;
        } else if (timeRange === '7d') {
            daysToSubtract = 7;
        }
        const startDate = new Date(referenceDate);
        startDate.setDate(startDate.getDate() - daysToSubtract);
        return transformedData.filter((item) => {
            const date = new Date(item.date);
            return date >= startDate;
        });
    }, [timeRange, transformedData]);

    return (
        <Card>
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1 text-center sm:text-left">
                    <CardTitle>감정 기록 그래프</CardTitle>
                    <CardDescription>
                        지난 3달간의 기록을 확인하세요.
                    </CardDescription>
                </div>
                <Select
                    value={timeRange}
                    onValueChange={(value) => {
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
                            3개월
                        </SelectItem>
                        <SelectItem value="30d" className="rounded-lg">
                            한달
                        </SelectItem>
                        <SelectItem value="7d" className="rounded-lg">
                            일주일
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
                            {moodlist.map((mood, index) => (
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
                                    {/* <stop
                                        offset="5%"
                                        stopColor={`var(--color-${index})`}
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor={`var(--color-${index})`}
                                        stopOpacity={0.1}
                                    /> */}
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
                                return date.toLocaleDateString('ko-KR', {
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
                                        ).toLocaleDateString('ko-KR', {
                                            month: 'short',
                                            day: 'numeric',
                                        });
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        {moodlist.map((moodItem) => (
                            <Area
                                key={moodItem}
                                dataKey={moodItem}
                                type="natural"
                                fill={`url(#fill${moodItem})`}
                                stroke={`var(--color-${moodItem})`}
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
