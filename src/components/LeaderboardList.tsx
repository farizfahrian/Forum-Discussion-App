interface LeaderboardListProps {
    leaderboardList: any[];
}

function LeaderboardList({ leaderboardList }: LeaderboardListProps) {
    return (
        <section className="pt-32">
            <div className="flex flex-col gap-4 justify-center max-w-lg mx-auto border border-neutral-600 p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-white">Leaderboard</h2>
            <ul className="flex flex-col gap-4">
                {
                    leaderboardList.map((leaderboard: any) => {
                        return (
                            <li key={leaderboard.user.id} className="flex gap-4 items-center">
                                <img src={leaderboard.user.avatar} alt={leaderboard.user.name} className="w-12 h-12 rounded-full" />
                                <div className="flex justify-between w-full gap-0.5">
                                    <h3 className="text-lg font-medium text-white">{leaderboard.user.name}</h3>
                                    <p className="text-white text-xl font-bold">{leaderboard.score}</p>
                                </div>
                            </li>
                        );
                    })
                }
            </ul>
            </div>
        </section>
    );
}

export default LeaderboardList;