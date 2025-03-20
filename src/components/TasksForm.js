import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';
import { useSelector, useDispatch } from 'react-redux';
import { Input } from '@/components/ui/input';
import { updateAnswer } from '@/redux/tasksSlice'; // Импортируем действие updateAnswer
import { Report } from './Report';
export const TasksForm = () => {
    const tasks = useSelector((state) => state.tasksSlice);
    const mode = useSelector((state) => state.modeSlice);
    const dispatch = useDispatch();
    const [currentTask, setCurrentTask] = useState(1);
    const [answer, setAnswer] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(mode.time);
    useEffect(() => {
        if (timeLeft > 0 && !isCompleted) {
            const timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
        else if (timeLeft === 0 && !isCompleted) {
            setIsCompleted(true);
        }
    }, [timeLeft, isCompleted]);
    const handleClick = () => {
        if (currentTask <= tasks.length) {
            dispatch(updateAnswer({ index: currentTask - 1, userAnswer: answer }));
            if (currentTask < tasks.length) {
                setCurrentTask(currentTask + 1);
                setAnswer(0);
            }
            else {
                setIsCompleted(true);
            }
        }
    };
    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleClick();
        }
    };
    const calculateResults = (tasks) => {
        return tasks.map((task, index) => ({
            question: `${task.num1} ${task.operation} ${task.num2}`,
            userAnswer: `${task.userAnswer}`,
            isCorrect: task.userAnswer === task.answer,
        }));
    };
    const result = calculateResults(tasks);
    if (isCompleted) {
        return (_jsx(Report, { tasks: result, setCurrentTask: setCurrentTask, setIsCompleted: setIsCompleted, setTimeLeft: setTimeLeft }));
    }
    return (_jsxs(Card, { className: "mt-[20px] mx-auto w-[350px] h-full", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { children: ["\u0412\u043E\u043F\u0440\u043E\u0441 ", currentTask, " / ", tasks.length] }), _jsx(CardDescription, { children: "\u041F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0432\u0435\u0442 \u043D\u0430 \u0437\u0430\u0434\u0430\u043D\u0438\u0435" })] }), _jsxs(CardContent, { children: [_jsxs("div", { className: "text-7xl font-bold text-center mb-10", children: [tasks[currentTask - 1]?.num1, " ", tasks[currentTask - 1]?.operation, " ", tasks[currentTask - 1]?.num2] }), _jsx(Input, { autoFocus: true, placeholder: "\u041E\u0442\u0432\u0435\u0442", onKeyDown: handleEnter, value: answer, onChange: (e) => {
                            if (e.target.value) {
                                setAnswer(parseInt(e.target.value));
                            }
                            else {
                                setAnswer(0);
                            }
                        } }), _jsxs("div", { className: "text-center mt-4", children: ["\u041E\u0441\u0442\u0430\u043B\u043E\u0441\u044C \u0432\u0440\u0435\u043C\u0435\u043D\u0438: ", Math.floor(timeLeft / 60), ":", timeLeft % 60 < 10 ? '0' : '', timeLeft % 60] }), _jsx(CardFooter, { className: "mt-4 flex justify-center", children: _jsx(Button, { className: "cursor-pointer", onClick: handleClick, children: "\u041E\u0442\u0432\u0435\u0442\u0438\u0442\u044C" }) })] })] }));
};
