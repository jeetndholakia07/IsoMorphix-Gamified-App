import { Route, Routes } from "react-router";
import MainLayout from "../pages/MainLayout.js";
import Home from "../pages/Home/index.js";
import Games from "../pages/Games/index.js";
import GamePlay from "../pages/Games/GamePlay.js";
import Leaderboard from "../pages/Leaderboard/index.js";
import { useSelector } from "react-redux";
import type { RootState } from "../context/store/store.js";
import { tableColumns } from "../pages/Leaderboard/tableColumns.js";
import { useMemo } from "react";
import HowToPlay from "../pages/HowToPlay/index.js";

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