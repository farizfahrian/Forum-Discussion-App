import api, { RegisterPayload, User } from "../../../utils/api";

const ActionType = {
    RECEIVE_USERS: 'RECEIVE_USERS',
};

function receiveUsersActionCreator(users: User[]) {
    return {
        type: ActionType.RECEIVE_USERS,
        payload: users,
    };
}

function asyncRegisterUsers({ name, email, password }: RegisterPayload) {
    return async () => {
        try {
            await api.register({ name, email, password });
        } catch (error) {
            alert(error);
        }
    };
}

export { 
    ActionType, 
    receiveUsersActionCreator, 
    asyncRegisterUsers 
};
