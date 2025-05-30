/* eslint-disable linebreak-style */
import { describe, it, expect } from 'vitest';
import threadsReducer from './reducer';
import { ActionType } from './action';

/**
 * Test scenario for threadsReducer
 *
 * - Should return initial state when given unknown action
 * - Should return threads when given RECEIVE_THREADS action
 * - Should return threads with new thread when given ADD_THREAD action
 * - Should return threads with toggled vote when given TOGGLE_VOTE_THREAD action
 */

describe('threadsReducer', () => {
  it('should return initial state when given unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return threads when given RECEIVE_THREADS action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: {
        threads: [
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
            updatedAt: '2022-01-01T00:00:00.000Z',
          },
          {
            id: '2',
            title: 'Thread 2',
            body: 'Body 2',
            category: 'Category 2',
            ownerId: '2',
            totalComments: 0,
            upVotesBy: [],
            downVotesBy: [],
            createdAt: '2022-01-01T00:00:00.000Z',
            updatedAt: '2022-01-01T00:00:00.000Z',
          },
        ],
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload);
  });

  it('should return threads with new thread when given ADD_THREAD action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: ActionType.ADD_THREAD,
      payload: {
        thread: {
          id: '3',
          title: 'Thread 3',
          body: 'Body 3',
          category: 'Category 3',
          ownerId: '3',
          totalComments: 0,
          upVotesBy: [],
          downVotesBy: [],
          createdAt: '2022-01-01T00:00:00.000Z',
          updatedAt: '2022-01-01T00:00:00.000Z',
        },
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([action.payload, ...initialState]);
  });

  it('should return threads with toggled vote when given TOGGLE_VOTE_THREAD action', () => {
    // arrange
    const initialState = [
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
        updatedAt: '2022-01-01T00:00:00.000Z',
      },
    ];
    const action = {
      type: ActionType.TOGGLE_VOTE_THREAD,
      payload: {
        threadId: '1',
        voteType: 1,
        userId: '1',
      },
    };

    // action: like thread
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [action.payload.userId],
      },
    ]);

    // action: dislike thread
    const nextState2 = threadsReducer(initialState, {
      ...action,
      payload: {
        ...action.payload,
        voteType: -1,
      },
    });

    // assert
    expect(nextState2).toEqual([
      {
        ...initialState[0],
        downVotesBy: [action.payload.userId],
      },
    ]);

    // action: neutralize thread vote
    const nextState3 = threadsReducer(initialState, {
      ...action,
      payload: {
        ...action.payload,
        voteType: 0,
      },
    });

    // assert
    expect(nextState3).toEqual([
      {
        ...initialState[0],
        upVotesBy: [],
        downVotesBy: [],
      },
    ]);
  });
});