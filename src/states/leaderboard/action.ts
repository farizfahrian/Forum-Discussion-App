import api, { LeaderboardEntry } from "../../../utils/api";

const ActionType = {
    RECEIVE_LEADERBOARD: 'RECEIVE_LEADERBOARD',
}

function receiveLeaderboardActionCreator(leaderboard: LeaderboardEntry[]) {
    return {
        type: ActionType.RECEIVE_LEADERBOARD,
        payload: leaderboard,
    };
}

function asyncReceiveLeaderboard() {
    return async (dispatch: (action: any) => void) => {
        try {
            const leaderboard = await api.getLeaderboards();
            console.log(leaderboard);
            dispatch(receiveLeaderboardActionCreator(leaderboard));
        } catch (error) {
            alert(error);
        }
    };
}

export { 
    ActionType, 
    receiveLeaderboardActionCreator, 
    asyncReceiveLeaderboard 
};
