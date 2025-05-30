/* eslint-disable linebreak-style */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import api from '../../../utils/api';
import { receiveLeaderboardActionCreator } from './action';
import { asyncReceiveLeaderboard } from './action';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

/**
 * Test scenario for asyncReceiveLeaderboard thunk
 *
 * - Should dispatch action correctly when data fetching is successful
 * - Should dispatch action and call alert correctly when data fetching fails
 */

const fakeLeaderBoardResponse = [
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
];

const fakeErrorResponse = new Error('Error fetching data');

describe('asyncReceiveLeaderboard thunk', () => {
  beforeEach(() => {
    api._getLeaderBoards = api.getLeaderBoards;
  });

  afterEach(() => {
    api.getLeaderBoards = api._getLeaderBoards;

    delete api._getLeaderBoards;
  });

  it('should dispatch action correctly when data fetching is successful', async () => {
    api.getLeaderBoards = () => Promise.resolve(fakeLeaderBoardResponse);

    const dispatch = vi.fn();

    await asyncReceiveLeaderboard()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveLeaderboardActionCreator(fakeLeaderBoardResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching fails', async () => {
    api.getLeaderBoards = () => Promise.reject(fakeErrorResponse);
    const dispatch = vi.fn();

    window.alert = vi.fn();

    await asyncReceiveLeaderboard()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse);
  });
});