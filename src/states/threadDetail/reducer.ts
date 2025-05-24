import { ActionType } from "./action";
import { threadDetail } from "../../../utils/api";


function threadDetailReducer(threadDetail: threadDetail | null = null, action: any) {
    switch (action.type) {
        case ActionType.RECEIVE_THREAD_DETAIL:
            return action.payload.threadDetail;
        case ActionType.CLEAR_THREAD_DETAIL:
            return null;
        case ActionType.TOGGLE_VOTE_THREAD_DETAIL:
            return {
                ...threadDetail,
                upVotesBy: threadDetail?.upVotesBy.includes(action.payload.userId)
                    ? threadDetail?.upVotesBy.filter((id) => id !== action.payload.userId)
                    : [...threadDetail?.upVotesBy || [], action.payload.userId],
                downVotesBy: threadDetail?.downVotesBy.includes(action.payload.userId)
                    ? threadDetail?.downVotesBy.filter((id) => id !== action.payload.userId)
                    : [...threadDetail?.downVotesBy || [], action.payload.userId],
            };
        default:
            return threadDetail;
    }
}

export default threadDetailReducer;