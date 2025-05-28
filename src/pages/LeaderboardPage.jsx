import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import LeaderboardList from '../components/LeaderboardList';
import { useDispatch } from 'react-redux';
import { asyncReceiveLeaderboard } from '../states/leaderboard/action';

function LeaderboardPage() {
  const leaderboards = useSelector((states) => states.leaderboard) || [];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboard());
  }, [dispatch]);

  const leaderboardList = leaderboards.map((leaderboard) => {
    return {
      ...leaderboard,
    };
  });

  return (
    <section className="pt-12 pb-16 min-h-screen bg-neutral-900">
      <LeaderboardList leaderboardList={leaderboardList} />
    </section>
  );
}

export default LeaderboardPage;
