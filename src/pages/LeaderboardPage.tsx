import { useSelector } from "react-redux";
import LeaderboardList from "../components/LeaderboardList";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { asyncReceiveLeaderboard } from "../states/leaderboard/action";
import { LeaderboardEntry } from "../../utils/api";

function LeaderboardPage() {
    const leaderboards: LeaderboardEntry[] = useSelector((states: any) => states.leaderboard) || [];
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(asyncReceiveLeaderboard() as any);
    }, [dispatch]);

    const leaderboardList = leaderboards.map((leaderboard: LeaderboardEntry) => {
        return {
            ...leaderboard,
        }
    })

    return (
        <section className="bg-neutral-900 pt-12 pb-16">
            <LeaderboardList leaderboardList={leaderboardList} />
        </section>
    );
}

export default LeaderboardPage;
