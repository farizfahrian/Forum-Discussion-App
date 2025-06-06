import { ActionType } from './action';


function leaderboardReducer(leaderboard = [], action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_LEADERBOARD:
    return action.payload;
  default:
    return leaderboard;
  }
}

export default leaderboardReducer;
