import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { useNavigate } from 'react-router';
import { writeResults } from '@/lib/utils';
export const Report = ({ tasks, setCurrentTask, setIsCompleted, setTimeLeft }) => {
    const navigate = useNavigate();
    console.log('report');
    useEffect(() => writeResults(tasks), []);
    return (_jsx(_Fragment, { children: _jsxs(Card, { className: "mt-[20px] mx-auto w-[350px] h-full", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B \u0442\u0435\u0441\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F" }) }), _jsx(CardContent, { children: _jsx("div", { children: _jsx("ul", { className: "font-semibold", children: tasks.map((result, index) => (_jsxs("li", { className: result.isCorrect ? 'text-green-500' : 'text-red-500', children: [result.question, " = ", result.userAnswer, ' ', result.isCorrect ? 'Правильно' : result.userAnswer === undefined ? '' : 'Неправильно'] }, index))) }) }) }), _jsxs("div", { className: "flex flex-col justify-center mx-auto w-50 px-6 gap-4", children: [_jsx(Button, { className: "cursor-pointer bg-destructive", onClick: () => setCurrentTask(1) || setIsCompleted(false) || setTimeLeft(120), children: "\u041F\u0440\u043E\u0439\u0442\u0438 \u0437\u0430\u043D\u043E\u0432\u043E" }), _jsx(Button, { className: "cursor-pointer", onClick: () => navigate('/'), children: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043D\u043E\u0432\u044B\u0439 \u0442\u0435\u0441\u0442" })] })] }) }));
};
