import { LeaderboardEntry } from "../../../utils/api";
import { ActionType } from "./action";


function leaderboardReducer(leaderboard: LeaderboardEntry[] = [], action: any) {
    switch (action.type) {
        case ActionType.RECEIVE_LEADERBOARD:
            return action.payload;
        default:
            return leaderboard;
    }
}

export default leaderboardReducer;
