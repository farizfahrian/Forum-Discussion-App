import api, { CreateCommentPayload, threadDetail } from "../../../utils/api";

const ActionType = {
    RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
    CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
    TOGGLE_VOTE_THREAD_DETAIL: 'TOGGLE_VOTE_THREAD_DETAIL',
    ADD_THREAD_COMMENT: 'ADD_THREAD_COMMENT',
    TOGGLE_VOTE_COMMENT: 'TOGGLE_VOTE_COMMENT',
};

function receiveThreadDetailActionCreator(threadDetail: threadDetail) {
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

function toggleVoteThreadDetailActionCreator(userId: string, threadId: string, voteType: number) {
    return {
        type: ActionType.TOGGLE_VOTE_THREAD_DETAIL,
        payload: {
            userId,
            threadId,
            voteType
        }
    }
}

function addThreadCommentActionCreator(comment: CreateCommentPayload) {
    return {
        type: ActionType.ADD_THREAD_COMMENT,
        payload: comment,
    }
}

function toggleVoteCommentActionCreator({userId, commentId, voteType }: {userId: string, commentId: string, voteType: number}) {
    return {
        type: ActionType.TOGGLE_VOTE_COMMENT,
        payload: {
            userId,
            commentId,
            voteType
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

function asyncToggleVoteThreadDetail(threadId: string, voteType: number) {
    return async (dispatch: (action: any) => void, getState: () => any) => {
        const {authUser} = getState();
        dispatch(toggleVoteThreadDetailActionCreator(authUser.id, threadId, voteType));
        
        try {
            await api.upVoteThread(threadId);
        } catch (error) {
            alert(error);
            dispatch(toggleVoteThreadDetailActionCreator(authUser.id, threadId, voteType));
        }
    };
}

function asyncAddThreadComment(comment: CreateCommentPayload) {
    return async (dispatch: (action: any) => void) => {
        try {
            await api.createComment(comment);
            dispatch(addThreadCommentActionCreator(comment));
        } catch (error) {
            alert(error);
        }
    };
}

function asyncToggleVoteComment({commentId, voteType}: {commentId: string, voteType: number}) {
    return async (dispatch: (action: any) => void, getState: () => any) => {
        const {authUser} = getState();
        
        try {
            dispatch(toggleVoteCommentActionCreator({ userId: authUser.id, commentId, voteType}));
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
