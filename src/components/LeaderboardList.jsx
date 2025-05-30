import React from 'react';
import PropTypes from 'prop-types';

function LeaderboardList({ leaderboardList }) {
  return (
    <section className="pt-32 mx-4">
      <div className="flex flex-col gap-4 justify-center p-6 mx-auto max-w-lg rounded-lg border border-neutral-600">
        <h2 className="text-2xl font-bold text-white">Leaderboard</h2>
        <ul className="flex flex-col gap-4">
          {
            leaderboardList.map((leaderboard) => {
              return (
                <li key={leaderboard.user.id} className="flex gap-4 items-center">
                  <img src={leaderboard.user.avatar} alt={leaderboard.user.name} className="w-12 h-12 rounded-full" />
                  <div className="flex justify-between w-full gap-0.5">
                    <h3 className="text-lg font-medium text-white">{leaderboard.user.name}</h3>
                    <p className="text-xl font-bold text-white">{leaderboard.score}</p>
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

LeaderboardList.propTypes = {
  leaderboardList: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
      score: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default LeaderboardList;
