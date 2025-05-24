import { ActionType } from "./action";
import { User } from "../../../utils/api";

function usersReducer(users: User[] = [], action: any) {
    switch (action.type) {
        case ActionType.RECEIVE_USERS:
            return action.payload;
        default:
            return users;
    }
}

export default usersReducer;