import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useDispatch } from 'react-redux';
import { setMode } from '@/redux/modeSlice';
import { useNavigate } from 'react-router';
import { Input } from './ui/input';
import { useEffect, useState } from 'react';
const operations = [
    { id: 1, title: 'Сложение' },
    { id: 2, title: 'Вычитание' },
    { id: 3, title: 'Умножение' },
    { id: 4, title: 'Деление' },
];
const numbers = [
    { id: 1, title: 'Однозначные' },
    { id: 2, title: 'Двузначные' },
    { id: 3, title: 'Трехзначные' },
];
const schema = z.object({
    selectedOperations: z.array(z.number()).refine((value) => value.length > 0, {
        message: 'Выберите хотя бы одну операцию',
    }),
    selectedNumbers: z.array(z.number()).refine((value) => value.length > 0, {
        message: 'Выберите хотя бы одно число',
    }),
    amountOfTasks: z.number().min(10, 'Минимальное число вопросов 10').max(100, 'Максимальное число вопросов 100'),
    time: z.number().min(20, 'Минимальное время 10 секунд').max(3600, 'Максимальное время 1 час'),
});
export function SettingsCardForm() {
    const dispatch = useDispatch();
    const { control, handleSubmit, formState: { errors }, setValue, watch, } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            selectedOperations: [2],
            selectedNumbers: [1],
            amountOfTasks: 20,
            time: 120,
        },
    });
    const [selectedOperations, setSelectedOperations] = useState([1]);
    const [selectedNumbers, setSelectedNumbers] = useState([1]);
    const [amountOfTasks, setAmountOfTasks] = useState(20);
    const [time, setTime] = useState(120);
    const navigate = useNavigate();
    useEffect(() => {
        setValue('selectedOperations', selectedOperations);
    }, [selectedOperations, setValue]);
    useEffect(() => {
        setValue('selectedNumbers', selectedNumbers);
    }, [selectedNumbers, setValue]);
    useEffect(() => {
        setValue('amountOfTasks', amountOfTasks);
    }, [amountOfTasks, setValue]);
    useEffect(() => {
        setValue('time', time);
    }, [time, setValue]);
    const onSubmit = (data) => {
        dispatch(setMode(data));
        navigate('/play');
    };
    return (_jsxs(Card, { className: "mt-10 mx-auto w-[350px] h-full", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0442\u0435\u0441\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F" }), _jsx(CardDescription, { children: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0436\u0435\u043B\u0430\u0435\u043C\u044B\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0434\u043B\u044F \u0432\u0430\u0448\u0435\u0433\u043E \u0437\u0430\u0434\u0430\u043D\u0438\u044F" })] }), _jsx(CardContent, { children: _jsxs("form", { onSubmit: handleSubmit(onSubmit), children: [_jsxs("div", { className: "grid w-full items-center gap-4", children: [_jsx("p", { children: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0436\u0435\u043B\u0430\u0435\u043C\u044B\u0435 \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u0438:" }), errors.selectedOperations && _jsx("p", { className: "text-red-500 text-sm", children: errors.selectedOperations.message }), _jsx("div", { className: "flex flex-col gap-y-3", children: operations.map((op) => (_jsxs("div", { className: "flex items-center space-x-2 text-muted-foreground", children: [_jsx(Checkbox, { className: "cursor-pointer", id: `op-${op.id}`, checked: selectedOperations.includes(op.id), onCheckedChange: (checked) => {
                                                    setSelectedOperations((prev) => (checked ? [...prev, op.id] : prev.filter((id) => id !== op.id)));
                                                } }), _jsx("label", { htmlFor: `op-${op.id}`, className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", children: op.title })] }, op.id))) }), _jsx("p", { children: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0436\u0435\u043B\u0430\u0435\u043C\u044B\u0435 \u0447\u0438\u0441\u043B\u0430:" }), errors.selectedNumbers && _jsx("p", { className: "text-red-500 text-sm", children: errors.selectedNumbers.message }), _jsx("div", { className: "flex flex-col gap-y-3", children: numbers.map((num) => (_jsxs("div", { className: "flex items-center space-x-2 text-muted-foreground", children: [_jsx(Checkbox, { className: "cursor-pointer", id: `num-${num.id}`, checked: selectedNumbers.includes(num.id), onCheckedChange: (checked) => {
                                                    setSelectedNumbers((prev) => (checked ? [...prev, num.id] : prev.filter((id) => id !== num.id)));
                                                } }), _jsx("label", { htmlFor: `num-${num.id}`, className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", children: num.title })] }, num.id))) }), _jsxs("div", { children: [_jsx("p", { className: "mb-4", children: "\u0427\u0438\u0441\u043B\u043E \u0432\u043E\u043F\u0440\u043E\u0441\u043E\u0432 (10 - 100):" }), _jsx(Input, { className: "mb-2", value: amountOfTasks, defaultValue: 20, onChange: (e) => {
                                                if (e.target.value) {
                                                    setAmountOfTasks(parseInt(e.target.value));
                                                }
                                                else {
                                                    setAmountOfTasks(0);
                                                }
                                            } }), errors.amountOfTasks && _jsx("p", { className: "text-red-500 text-base", children: errors.amountOfTasks.message }), _jsx("p", { className: "mb-4", children: "\u0412\u0440\u0435\u043C\u044F \u0432 \u0441\u0435\u043A\u0443\u043D\u0434\u0430\u0445 (10-3600):" }), _jsx(Input, { className: "mb-2", value: time, defaultValue: 120, onChange: (e) => {
                                                if (e.target.value) {
                                                    setTime(parseInt(e.target.value));
                                                }
                                                else {
                                                    setTime(0);
                                                }
                                            } }), errors.time && _jsx("p", { className: "text-red-500 text-base", children: errors.time.message })] })] }), _jsx(CardFooter, { className: "mt-4 flex justify-center", children: _jsx(Button, { className: "cursor-pointer", type: "submit", autoFocus: true, children: "\u041D\u0430\u0447\u0430\u0442\u044C" }) })] }) })] }));
}
