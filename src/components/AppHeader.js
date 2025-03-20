import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChartNoAxesColumnIncreasing, House, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useTheme } from '@/components/theme-provider.tsx';
import { useNavigate } from 'react-router';
export function AppHeader() {
    const { setTheme } = useTheme();
    const navigate = useNavigate();
    return (_jsxs("div", { className: "flex h-[100px] border-b-2 border-accent p-4 justify-center items-center gap-x-4", children: [_jsx(Button, { variant: "outline", className: "cursor-pointer", onClick: () => navigate('/'), children: _jsx(House, {}) }), _jsxs(Button, { variant: "outline", className: "cursor-pointer grow", onClick: () => navigate('/stats'), children: [_jsx(ChartNoAxesColumnIncreasing, {}), "\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430"] }), _jsxs(DropdownMenu, { modal: false, children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", size: "icon", className: "cursor-pointer", children: [_jsx(Sun, { className: "h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" }), _jsx(Moon, { className: "absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" }), _jsx("span", { className: "sr-only", children: "Toggle theme" })] }) }), _jsxs(DropdownMenuContent, { align: "end", children: [_jsx(DropdownMenuItem, { onClick: () => setTheme('light'), children: "Light" }), _jsx(DropdownMenuItem, { onClick: () => setTheme('dark'), children: "Dark" }), _jsx(DropdownMenuItem, { onClick: () => setTheme('system'), children: "System" })] })] })] }));
}
