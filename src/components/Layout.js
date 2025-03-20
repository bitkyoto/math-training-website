import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { AppHeader } from './AppHeader';
import { Outlet } from 'react-router';
import { Footer } from './Footer';
export const Layout = () => {
    return (_jsxs(_Fragment, { children: [_jsx(AppHeader, {}), _jsx(Outlet, {}), _jsx(Footer, {})] }));
};
