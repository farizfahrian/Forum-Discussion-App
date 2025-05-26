import api, { CreateThreadPayload, Thread } from "../../../utils/api";

const ActionType = {
    RECEIVE_THREADS: 'RECEIVE_THREADS',
    ADD_THREAD: 'ADD_THREAD',
    TOGGLE_VOTE_THREAD: 'TOGGLE_VOTE_THREAD',
};

function receiveThreadsActionCreator(threads: Thread[]) {
    return {
        type: ActionType.RECEIVE_THREADS,
        payload: threads,
    };
}

function addThreadActionCreator(thread: Thread) {
    return {
        type: ActionType.ADD_THREAD,
        payload: thread,
    };
}

function toggleVoteThreadActionCreator({threadId, voteType, userId}: {threadId: string, voteType: number, userId: string}) {
    return {
        type: ActionType.TOGGLE_VOTE_THREAD,
        payload: {
            threadId,
            voteType,
            userId
        }
    }
}

function asyncAddThread({ title, body, category }: CreateThreadPayload) {
    return async (dispatch: (action: any) => void) => {
        try {
            const thread = await api.createThread({ title, body, category });
            dispatch(addThreadActionCreator(thread));
        } catch (error) {
            alert(error);
        }
    };
}

function asyncToggleVoteThread({threadId, voteType}: {threadId: string, voteType: number}) {
    return async (dispatch: (action: any) => void, getState: () => any) => {
        const {authUser} = getState();
        dispatch(toggleVoteThreadActionCreator({threadId, voteType, userId: authUser.id}));

        try {
            await api.upVoteThread(threadId);
        } catch (error) {
            alert(error);
            dispatch(toggleVoteThreadActionCreator({threadId, voteType, userId: authUser.id}));
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