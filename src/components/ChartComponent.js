import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CartesianGrid, Label, Line, LineChart, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { getAveragePercentage, getResults } from '@/lib/utils';
const chartConfig = {
    desktop: {
        label: 'Desktop',
        color: 'hsl(var(--chart-1))',
    },
};
export function ChartComponent() {
    const chartData = getResults();
    const averagePercentage = getAveragePercentage(chartData);
    return (_jsxs(Card, { className: "my-10 max-w-3xl mx-auto", children: [_jsxs(CardHeader, { className: "text-center", children: [_jsx(CardTitle, { children: "\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430 \u043F\u043E \u043F\u0440\u043E\u0446\u0435\u043D\u0442\u0443 \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0445 \u043E\u0442\u0432\u0435\u0442\u043E\u0432" }), _jsx(CardDescription, { children: "\u0412\u0430\u0448\u0438 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B \u0437\u0430 \u0432\u0441\u0435 \u0432\u0440\u0435\u043C\u044F" })] }), _jsx(CardContent, { className: "flex justify-center", children: _jsx(ChartContainer, { config: chartConfig, className: "h-48", children: _jsxs(LineChart, { width: 400, height: 400, data: chartData, margin: {
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }, children: [_jsx(CartesianGrid, { vertical: false }), _jsx(XAxis, { dataKey: "tasks", axisLine: false, padding: { left: 20, right: 0 }, tickMargin: 8, children: _jsx(Label, { value: "\u0427\u0438\u0441\u043B\u043E \u0432\u043E\u043F\u0440\u043E\u0441\u043E\u0432", position: "top", offset: 147.5 }) }), _jsx(YAxis, { type: "number", tickLine: false, axisLine: false, children: _jsx(Label, { value: "\u041F\u0440\u043E\u0446\u0435\u043D\u0442", position: "insideLeft", offset: 25, angle: -90, style: { textAnchor: 'middle' } }) }), _jsx(Tooltip, { cursor: false, content: _jsx(CustomTooltip, { active: undefined, payload: undefined, label: undefined }) }), _jsx(Line, { dataKey: "correctPercentage", type: "natural", stroke: "var(--chart-1)", strokeWidth: 2, dot: false })] }) }) }), _jsx("div", { className: "flex flex-col gap-2 font-medium leading-none text-center justify-center items-center", children: _jsxs("p", { children: ["\u0412\u0430\u0448 \u0441\u0440\u0435\u0434\u043D\u0438\u0439 \u043F\u0440\u043E\u0446\u0435\u043D\u0442 \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0445 \u043E\u0442\u0432\u0435\u0442\u043E\u0432: ", averagePercentage.toFixed(1), "%"] }) }), _jsx("div", { className: "leading-none text-muted-foreground" })] }));
}
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (_jsx("div", { className: "custom-tooltip", children: _jsx("p", { className: "label", children: `${payload[0].value}%` }) }));
    }
    return null;
};
