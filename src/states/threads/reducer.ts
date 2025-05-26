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
                    const { userId, voteType } = action.payload;
    
                    const alreadyUpVoted = thread.upVotesBy.includes(userId);
                    const alreadyDownVoted = thread.downVotesBy.includes(userId);
    
                    let newUpVotesBy = [...thread.upVotesBy];
                    let newDownVotesBy = [...thread.downVotesBy];
    
                    if (voteType === 1) { // Upvote
                        if (alreadyUpVoted) {
                            newUpVotesBy = thread.upVotesBy.filter((id) => id !== userId);
                        } else {
                            newUpVotesBy = [...thread.upVotesBy, userId];
                            newDownVotesBy = thread.downVotesBy.filter((id) => id !== userId);
                        }
                    } else if (voteType === -1) { // Downvote
                        if (alreadyDownVoted) {
                            newDownVotesBy = thread.downVotesBy.filter((id) => id !== userId);
                        } else {
                            newDownVotesBy = [...thread.downVotesBy, userId];
                            newUpVotesBy = thread.upVotesBy.filter((id) => id !== userId);
                        }
                    } else { // Neutral vote (revert)
                        newUpVotesBy = thread.upVotesBy.filter((id) => id !== userId);
                        newDownVotesBy = thread.downVotesBy.filter((id) => id !== userId);
                    }
    
                    return {
                        ...thread,
                        upVotesBy: newUpVotesBy,
                        downVotesBy: newDownVotesBy,
                        };
                }
                return thread;
            });
        default:
            return threads;
    }
}

export default threadsReducer;