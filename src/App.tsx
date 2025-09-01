import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import PlayPage from "./pages/play";
import StatsPage from "./pages/stats";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<IndexPage />} />
            <Route
                path="/play"
                element={
                    <PrivateRoute>
                        <PlayPage />
                    </PrivateRoute>
                }
            />
            <Route
                path="/stats"
                element={
                    <PrivateRoute>
                        <StatsPage />
                    </PrivateRoute>
                }
            />
        </Routes>
    );
}

export default App;
