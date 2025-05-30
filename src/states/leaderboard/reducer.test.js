/* eslint-disable linebreak-style */

import { describe, it, expect } from 'vitest';
import leaderboardReducer from './reducer';
import { ActionType } from './action';

/**
 * Test scenario for leaderboardReducer
 *
 * - Should return initial state when given unknown action
 * - Should return leaderboard when given RECEIVE_LEADERBOARD action
 */

describe('leaderboardReducer', () => {
  it('should return initial state when given unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = leaderboardReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return leaderboard when given RECEIVE_LEADERBOARD action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: ActionType.RECEIVE_LEADERBOARD,
      payload: {
        leaderboards: [
          {
            user: {
              id: '1',
              name: 'User 1',
              email: 'user1@example.com',
              avatar: 'photo 1',
            },
            score: 1,
          },
          {
            user: {
              id: '2',
              name: 'User 2',
              email: 'user2@example.com',
              avatar: 'photo 2',
            },
            score: 2,
          },
        ],
      },
    };

    // action
    const nextState = leaderboardReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload);
  });
});