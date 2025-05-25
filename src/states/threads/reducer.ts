import { Thread } from "../../../utils/api";
import { ActionType } from "./action";

function threadsReducer(threads: Thread[] = [], action: any) {
    switch (action.type) {
        case ActionType.RECEIVE_THREADS:
            return action.payload;
        case ActionType.ADD_THREAD:
            return [...threads, action.payload];
        case ActionType.TOGGLE_VOTE_THREAD:
            return threads.map((thread) => {
                if (thread.id === action.payload.threadId) {
                    return {
                        ...thread,
                        upVotesBy: action.payload.voteType === 1
                            ? [...thread.upVotesBy.filter((id) => id !== action.payload.userId), action.payload.userId]
                            : thread.upVotesBy.filter((id) => id !== action.payload.userId),
                        downVotesBy: action.payload.voteType === -1
                            ? [...thread.downVotesBy.filter((id) => id !== action.payload.userId), action.payload.userId]
                            : thread.downVotesBy.filter((id) => id !== action.payload.userId),
                    };
                }
                return thread;
            });
        default:
            return threads;
    }
}

export default threadsReducer;