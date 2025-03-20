import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { MainPage } from './pages/MainPage';
import { ThemeProvider } from './components/theme-provider';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router';
import { store } from './redux/store';
import { PlayPage } from './pages/PlayPage';
import { StatsPage } from './pages/StatsPage';
import { Layout } from './components/Layout';
function App() {
    return (_jsx(_Fragment, { children: _jsx(ThemeProvider, { defaultTheme: "dark", storageKey: "vite-ui-theme", children: _jsx(Provider, { store: store, children: _jsx(BrowserRouter, { children: _jsx(Routes, { children: _jsxs(Route, { path: "/", element: _jsx(Layout, {}), children: [_jsx(Route, { index: true, element: _jsx(MainPage, {}) }), _jsx(Route, { path: "play", element: _jsx(PlayPage, {}) }), _jsx(Route, { path: "stats", element: _jsx(StatsPage, {}) })] }) }) }) }) }) }));
}
export default App;
