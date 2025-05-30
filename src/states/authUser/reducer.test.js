/* eslint-disable linebreak-style */
import { describe, it, expect } from 'vitest';
import authUserReducer from './reducer';
import { ActionType } from './action';

/**
 * Test scenario for authUserReducer
 *
 * - Should return initial state when given unknown action
 * - Should return auth user when given SET_AUTH_USER action
 * - Should return null when given UNSET_AUTH_USER action
 */


describe('authUserReducer', () => {
  it('should return initial state when given unknown action', () => {
    // arrange
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return auth user when given SET_AUTH_USER action', () => {
    // arrange
    const initialState = null;
    const action = {
      type: ActionType.SET_AUTH_USER,
      payload: {
        authUser: {
          id: '1',
          name: 'User 1',
          email: 'user1@example.com',
          avatar: 'photo 1',
        },
      },
    };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.authUser);
  });

  it('should return null when given UNSET_AUTH_USER action', () => {
    // arrange
    const initialState = {
      id: '1',
      name: 'User 1',
      email: 'user1@example.com',
      avatar: 'photo 1',
    };
    const action = { type: ActionType.UNSET_AUTH_USER };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(null);
  });
});