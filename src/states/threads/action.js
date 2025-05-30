import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../../utils/api';

const ActionType = {
  RECEIVE_THREADS: 'threads/receive',
  ADD_THREAD: 'threads/add',
  TOGGLE_VOTE_THREAD: 'threads/toggleVoteThread',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: threads,
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: thread,
  };
}

function toggleVoteThreadActionCreator({ threadId, voteType, userId }) {
  return {
    type: ActionType.TOGGLE_VOTE_THREAD,
    payload: {
      threadId,
      voteType,
      userId
    }
  };
}

function asyncAddThread({ title, body, category }) {
  return async (dispatch) => {
    console.log('show loading is dispatched');
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      alert(error);
    }

    dispatch(hideLoading());
  };
}

function asyncToggleVoteThread({ threadId, voteType }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleVoteThreadActionCreator({ threadId, voteType, userId: authUser.id }));

    try {
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

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  toggleVoteThreadActionCreator,
  asyncAddThread,
  asyncToggleVoteThread
};
