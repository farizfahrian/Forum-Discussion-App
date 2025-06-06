import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../../utils/api';

const ActionType = {
  RECEIVE_USERS: 'users/receive',
};

function receiveUsersActionCreator(users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: users,
  };
}

function asyncRegisterUsers({ name, email, password, successCallback }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.register({ name, email, password });
      successCallback();
    } catch (error) {
      alert(error);
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveUsersActionCreator,
  asyncRegisterUsers
};
