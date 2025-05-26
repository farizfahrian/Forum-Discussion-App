import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api, { LoginPayload } from '../../../utils/api';

const ActionType = {
    SET_AUTH_USER: 'SET_AUTH_USER',
    UNSET_AUTH_USER: 'UNSET_AUTH_USER',    
};

function setAuthUserActionCreator(authUser: any) {
    return {
        type: ActionType.SET_AUTH_USER,
        payload: {
            authUser,
        },
    };
}

function unsetAuthUserActionCreator() {
    return {
        type: ActionType.UNSET_AUTH_USER
    };
}

function asyncSetAuthUser({ email, password }: LoginPayload) {
    return async (dispatch: (action: any) => void) => {
        dispatch(showLoading());
        try {
            // Get token from login
            const token = await api.login({ email, password });
            api.putAccessToken(token);
            // Fetch user profile
            const authUser = await api.getOwnProfile();
            dispatch(setAuthUserActionCreator(authUser));
        } catch (error) {
            alert(error);
        } finally {
            dispatch(hideLoading());
        }
    };
}

function asyncUnsetAuthUser() {
    return (dispatch: (action: any) => void) => {
        dispatch(unsetAuthUserActionCreator());
        api.putAccessToken('');
        dispatch(hideLoading());
    };
}

export { 
    ActionType, 
    setAuthUserActionCreator, 
    unsetAuthUserActionCreator, 
    asyncSetAuthUser, 
    asyncUnsetAuthUser 
};
