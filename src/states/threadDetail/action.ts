import api, { threadDetail } from "../../../utils/api";

const ActionType = {
    RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
    CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
    TOGGLE_VOTE_THREAD_DETAIL: 'TOGGLE_VOTE_THREAD_DETAIL',
};

function receiveThreadDetailActionCreator(threadDetail: threadDetail) {
    return {
        type: ActionType.RECEIVE_THREAD_DETAIL,
        payload: threadDetail,
    };
}

function clearThreadDetailActionCreator() {
    return {
        type: ActionType.CLEAR_THREAD_DETAIL,
    };
}

function toggleVoteThreadDetailActionCreator(userId: string) {
    return {
        type: ActionType.TOGGLE_VOTE_THREAD_DETAIL,
        payload: {
            userId
        }
    }
}

function asyncReceiveThreadDetail(threadId: string) {
    return async (dispatch: (action: any) => void) => {
        try {
            const threadDetail = await api.getThreadDetail(threadId);
            dispatch(receiveThreadDetailActionCreator(threadDetail));
        } catch (error) {
            alert(error);
        }
    };
}

function asyncToggleVoteThreadDetail() {
    return async (dispatch: (action: any) => void, getState: () => any) => {
        const {authUser, threadDetail} = getState();
        dispatch(toggleVoteThreadDetailActionCreator(authUser.id));

        try {
            await api.upVoteThread(threadDetail.id);
        } catch (error) {
            alert(error);
            dispatch(toggleVoteThreadDetailActionCreator(authUser.id));
        }
    };
}

export {
    ActionType,
    receiveThreadDetailActionCreator,
    clearThreadDetailActionCreator,
    toggleVoteThreadDetailActionCreator,
    asyncReceiveThreadDetail,
    asyncToggleVoteThreadDetail,
};
