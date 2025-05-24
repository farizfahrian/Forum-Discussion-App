import api from '../../../utils/api';
import { setAuthUserActionCreator } from '../authUser/action';

const ActionType = {
    SET_IS_PRELOAD: 'SET_IS_PRELOAD',
};

function setIsPreloadActionCreator(isPreload: boolean) {
    return {
        type: ActionType.SET_IS_PRELOAD,
        payload: isPreload,
    }
}
 
function asyncPreloadProcess() {
    return async (dispatch: (action: any) => void) => {
        try {
            const profile = await api.getOwnProfile();
            dispatch(setAuthUserActionCreator(profile));
        } catch (error) {
            dispatch(setAuthUserActionCreator(null));
        } finally {
            dispatch(setIsPreloadActionCreator(false));
        }
    }
}

export { 
    ActionType, 
    setIsPreloadActionCreator, 
    asyncPreloadProcess 
};