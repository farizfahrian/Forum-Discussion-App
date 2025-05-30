/* eslint-disable linebreak-style */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import api from '../../../utils/api';
import { asyncPopulateUsersAndThreads } from './action';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';

/**
 * Test scenario for asyncPopulateUsersAndThreads thunk
 *
 * Test 1: asyncPopulateUsersAndThreads thunk
 * - Should dispatch action correctly when data fetching is successful
 * - Should dispatch action and call alert correctly when data fetching fails
 */

const fakeThreadsResponse = [
  {
    id: '1',
    title: 'Thread 1',
    body: 'Body 1',
    category: 'Category 1',
    ownerId: '1',
    totalComments: 0,
    upVotesBy: [],
    downVotesBy: [],
    createdAt: '2022-01-01T00:00:00.000Z',
  },
];

const fakeUsersResponse = [
  {
    id: '1',
    name: 'User 1',
    email: 'user1@example.com',
    avatar: 'photo 1',
  },
];

const fakeErrorResponse = new Error('Error fetching data');

describe('asyncPopulateUsersAndThreads thunk', () => {
  beforeEach(() => {
    api._getAllThreads = api.getAllThreads;
    api._getAllUsers = api.getAllUsers;
  });

  afterEach(() => {
    api.getAllThreads = api._getAllThreads;
    api.getAllUsers = api._getAllUsers;

    delete api._getAllThreads;
    delete api._getAllUsers;
  });

  it('should dispatch action correctly when data fetching is successful', async () => {
    // arrange
    api.getAllThreads = () => Promise.resolve(fakeThreadsResponse);
    api.getAllUsers = () => Promise.resolve(fakeUsersResponse);

    const dispatch = vi.fn();

    // action
    await asyncPopulateUsersAndThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator(fakeThreadsResponse));
    expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(fakeUsersResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching fails', async () => {
    // arrange
    // stub implementation
    api.getAllThreads = () => Promise.reject(fakeErrorResponse);
    api.getAllUsers = () => Promise.reject(fakeErrorResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // mock alert
    window.alert = vi.fn();

    // action
    await asyncPopulateUsersAndThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse);
  });
});