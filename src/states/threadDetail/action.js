import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../../utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  TOGGLE_VOTE_THREAD_DETAIL: 'TOGGLE_VOTE_THREAD_DETAIL',
  ADD_THREAD_COMMENT: 'ADD_THREAD_COMMENT',
  TOGGLE_VOTE_COMMENT: 'TOGGLE_VOTE_COMMENT',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function toggleVoteThreadDetailActionCreator({ threadId, voteType, userId }) {
  return {
    type: ActionType.TOGGLE_VOTE_THREAD_DETAIL,
    payload: {
      threadId,
      voteType,
      userId
    }
  };
}

function addThreadCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_THREAD_COMMENT,
    payload: {
      comment
    },
  };
}

function toggleVoteCommentActionCreator({ userId, commentId, voteType }) {
  return {
    type: ActionType.TOGGLE_VOTE_COMMENT,
    payload: {
      userId,
      commentId,
      voteType
    }
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(clearThreadDetailActionCreator());
    dispatch(showLoading());
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error);
    }

    dispatch(hideLoading());
  };
}

function asyncToggleVoteThreadDetail({ threadId, voteType }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleVoteThreadDetailActionCreator({ threadId, voteType, userId: authUser.id }));

    try {
      console.log('voteType is a ', typeof voteType, ' with a value of ', voteType);
      if (voteType === 1) {
        await api.upVoteThread(threadId);
      } else if (voteType === -1) {
        await api.downVoteThread(threadId);
      } else {
        await api.neutralizeThreadVote(threadId);
      }
    } catch (error) {
      alert(error);
    }
  };
}

function asyncAddThreadComment({ content, threadId }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const comment = await api.createComment({ content, threadId });
      dispatch(addThreadCommentActionCreator(comment));
    } catch (error) {
      alert(error);
    }

    dispatch(hideLoading());
  };
}

function asyncToggleVoteComment({ threadId, commentId, voteType }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleVoteCommentActionCreator({ threadId, commentId, voteType, userId: authUser.id }));

    try {
      if (voteType === 1) {
        console.log('1', threadId, ' ', commentId, ' ', voteType);
        await api.upVoteComment(threadId, commentId);
      } else if (voteType === -1) {
        console.log('-1', threadId, ' ', commentId, ' ', voteType);
        await api.downVoteComment(threadId, commentId);
      } else {
        console.log('0', commentId, ' ', voteType);
        await api.neutralVoteComment(threadId, commentId);
      }
    } catch (error) {
      alert(error);
    }
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  toggleVoteThreadDetailActionCreator,
  addThreadCommentActionCreator,
  asyncReceiveThreadDetail,
  asyncToggleVoteThreadDetail,
  asyncAddThreadComment,
  toggleVoteCommentActionCreator,
  asyncToggleVoteComment,
};
