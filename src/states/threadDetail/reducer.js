import { ActionType } from './action';

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREAD_DETAIL:
    return action.payload.threadDetail;
  case ActionType.CLEAR_THREAD_DETAIL:
    return null;
  case ActionType.TOGGLE_VOTE_THREAD_DETAIL:
  {
    if (!threadDetail || threadDetail.id !== action.payload.threadId) {
      return threadDetail;
    }

    const { userId, voteType } = action.payload;

    const alreadyUpVoted = threadDetail.upVotesBy?.includes(userId) || false;
    const alreadyDownVoted = threadDetail.downVotesBy?.includes(userId) || false;

    let newUpVotesBy = [...(threadDetail.upVotesBy || [])];
    let newDownVotesBy = [...(threadDetail.downVotesBy || [])];

    if (voteType === 1) {
      newUpVotesBy = alreadyUpVoted
        ? newUpVotesBy.filter((id) => id !== userId)
        : newUpVotesBy.concat(userId);
      newDownVotesBy = newDownVotesBy.filter((id) => id !== userId);
    } else if (voteType === -1) {
      newUpVotesBy = newUpVotesBy.filter((id) => id !== userId);
      newDownVotesBy = alreadyDownVoted
        ? newDownVotesBy.filter((id) => id !== userId)
        : newDownVotesBy.concat(userId);
    } else {
      newUpVotesBy = newUpVotesBy.filter((id) => id !== userId);
      newDownVotesBy = newDownVotesBy.filter((id) => id !== userId);
    }

    return {
      ...threadDetail,
      upVotesBy: newUpVotesBy,
      downVotesBy: newDownVotesBy,
    };
  }

  case ActionType.ADD_THREAD_COMMENT:
    return {
      ...threadDetail,
      comments: [action.payload.comment, ...(threadDetail?.comments || [])],
    };
  case ActionType.TOGGLE_VOTE_COMMENT:
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          const alreadyUpVoted = comment.upVotesBy?.includes(action.payload.userId) || false;
          const alreadyDownVoted = comment.downVotesBy?.includes(action.payload.userId) || false;

          let newUpVotesBy = [...(comment.upVotesBy || [])];
          let newDownVotesBy = [...(comment.downVotesBy || [])];

          if (action.payload.voteType === 1) {
            newUpVotesBy = alreadyUpVoted
              ? newUpVotesBy.filter((id) => id !== action.payload.userId)
              : newUpVotesBy.concat(action.payload.userId);
            newDownVotesBy = newDownVotesBy.filter((id) => id !== action.payload.userId);
          } else if (action.payload.voteType === -1) {
            newUpVotesBy = newUpVotesBy.filter((id) => id !== action.payload.userId);
            newDownVotesBy = alreadyDownVoted
              ? newDownVotesBy.filter((id) => id !== action.payload.userId)
              : newDownVotesBy.concat(action.payload.userId);
          } else {
            newUpVotesBy = newUpVotesBy.filter((id) => id !== action.payload.userId);
            newDownVotesBy = newDownVotesBy.filter((id) => id !== action.payload.userId);
          }

          return {
            ...comment,
            upVotesBy: newUpVotesBy,
            downVotesBy: newDownVotesBy,
          };
        }
        return comment;
      }),
    };
  default:
    return threadDetail;
  }
}

export default threadDetailReducer;
