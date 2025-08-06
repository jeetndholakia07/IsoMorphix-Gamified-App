import { Route, Routes } from "react-router";
import MainLayout from "../pages/MainLayout";
import Home from "../pages/Home";
import Games from "../pages/Games";
import GamePlay from "../pages/Games/GamePlay";
import Leaderboard from "../pages/Leaderboard";
import { useSelector } from "react-redux";
import type { RootState } from "../context/store/store";
import { tableColumns } from "../pages/Leaderboard/tableColumns";
import { useMemo } from "react";
import HowToPlay from "../pages/HowToPlay";

const AppRoutes = () => {
    const userData = useSelector((state: RootState) => state.userData.user);
    const data = useMemo(() => [userData], [userData]);
    const columns = useMemo(() => tableColumns, []);
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/game" element={<Games />} />
                <Route path="/game/:id" element={<GamePlay />} />
                <Route path="/leaderboard" element={<Leaderboard columns={columns} data={data} />} />
                <Route path="/howToPlay" element={<HowToPlay/>}/>
                <Route path="*" element={<Home />} />
            </Route>
        </Routes>
    )
}
export default AppRoutes;