import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TasksForm } from '@/components/TasksForm';
import { setTasks } from '@/redux/tasksSlice';
import { generateTasks } from '@/lib/utils';
export const PlayPage = () => {
    const dispatch = useDispatch();
    const mode = useSelector((state) => state.modeSlice);
    useEffect(() => {
        const tasks = generateTasks(mode);
        dispatch(setTasks(tasks));
    }, []);
    return (_jsx(_Fragment, { children: _jsx(TasksForm, {}) }));
};
