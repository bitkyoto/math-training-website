import { MainPage } from './pages/MainPage'
import { ThemeProvider } from './components/theme-provider'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router'
import { store } from './redux/store'
import { PlayPage } from './pages/PlayPage'
import { StatsPage } from './pages/StatsPage'
import { Layout } from './components/Layout'
function App() {
    return (
        <>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <Provider store={store}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Layout />}>
                                <Route index element={<MainPage />} />
                                <Route path="play" element={<PlayPage />} />
                                <Route path="stats" element={<StatsPage />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </Provider>
            </ThemeProvider>
        </>
    )
}

export default App
