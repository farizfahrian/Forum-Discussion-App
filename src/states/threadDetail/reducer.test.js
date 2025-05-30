/* eslint-disable linebreak-style */

import { describe, it, expect } from 'vitest';
import threadDetailReducer from './reducer';
import { ActionType } from './action';

/**
 * Test scenario for threadsReducer
 *
 * - Should return initial state when given unknown action
 * - Should return thread detail when given RECEIVE_THREAD_DETAIL action
 * - Should return thread detail with clear thread detail when given CLEAR_THREAD_DETAIL action
 * - Should return thread detail with toggled vote when given TOGGLE_VOTE_THREAD_DETAIL action
 * - Should return thread detail comments with new comment when given ADD_THREAD_COMMENT action
 * - Should return thread detail comments with toggled vote when given TOGGLE_VOTE_COMMENT action
 */

describe('threadDetailReducer', () => {
  it('should return initial state when given unknown action', () => {
    // arrange
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return thread detail when given RECEIVE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = null;
    const action = {
      type: ActionType.RECEIVE_THREAD_DETAIL,
      payload: {
        threadDetail: {
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
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.threadDetail);
  });

  it('should return thread detail with clear thread detail when given CLEAR_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {
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
    };
    const action = { type: ActionType.CLEAR_THREAD_DETAIL };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(null);
  });

  it('should return thread detail with toggled vote when given TOGGLE_VOTE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {
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
    };
    const action = {
      type: ActionType.TOGGLE_VOTE_THREAD_DETAIL,
      payload: { threadId: '1', voteType: 1, userId: '1' },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: ['1'],
    });

    // action: dislike thread
    const nextState2 = threadDetailReducer(initialState, {
      ...action,
      payload: {
        threadId: '1',
        voteType: -1,
        userId: '1',
      },
    });

    // assert
    expect(nextState2).toEqual({
      ...initialState,
      downVotesBy: ['1'],
    });

    // action: neutralize thread vote
    const nextState3 = threadDetailReducer(initialState, {
      ...action,
      payload: {
        threadId: '1',
        voteType: 0,
        userId: '1',
      },
    });

    // assert
    expect(nextState3).toEqual({
      ...initialState,
      upVotesBy: [],
      downVotesBy: [],
    });
  });

  it('should return thread detail comments with new comment when given ADD_THREAD_COMMENT action', () => {
    // arrange
    const initialState = {
      id: '1',
      title: 'Thread 1',
      body: 'Body 1',
      category: 'Category 1',
      owner: {
        id: '1',
        name: 'User 1',
        avatar: 'photo 1',
      },
      totalComments: 0,
      upVotesBy: [],
      downVotesBy: [],
      createdAt: '2022-01-01T00:00:00.000Z',
      updatedAt: '2022-01-01T00:00:00.000Z',
    };
    const action = {
      type: ActionType.ADD_THREAD_COMMENT,
      payload: {
        comment: {
          id: '1',
          threadId: '1',
          body: 'Comment 1',
          userId: '1',
          createdAt: '2022-01-01T00:00:00.000Z',
          updatedAt: '2022-01-01T00:00:00.000Z',
        },
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [action.payload.comment],
    });
  });

  it('should return thread detail comments with toggled vote when given TOGGLE_VOTE_COMMENT action', () => {
    // arrange
    const initialState = {
      id: '1',
      title: 'Thread 1',
      body: 'Body 1',
      category: 'Category 1',
      owner: {
        id: '1',
        name: 'User 1',
        avatar: 'photo 1',
      },
      comments: [
        {
          id: '1',
          content: 'Comment 1',
          userId: '1',
          owner: {
            id: '1',
            name: 'User 1',
            avatar: 'photo 1',
          },
          upVotesBy: [],
          downVotesBy: [],
          createdAt: '2022-01-01T00:00:00.000Z',
        },
      ],
      upVotesBy: [],
      downVotesBy: [],
      createdAt: '2022-01-01T00:00:00.000Z',
      updatedAt: '2022-01-01T00:00:00.000Z',
    };

    const action = {
      type: ActionType.TOGGLE_VOTE_COMMENT,
      payload: {
        commentId: '1',
        voteType: 1,
        userId: '1',
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [
        {
          ...initialState.comments[0],
          upVotesBy: ['1'],
        },
      ],
    });

    // action: dislike comment
    const nextState2 = threadDetailReducer(initialState, {
      ...action,
      payload: {
        ...action.payload,
        voteType: -1,
      },
    });

    // assert
    expect(nextState2).toEqual({
      ...initialState,
      comments: [
        {
          ...initialState.comments[0],
          downVotesBy: ['1'],
        },
      ],
    });

    // action: neutralize comment vote
    const nextState3 = threadDetailReducer(initialState, {
      ...action,
      payload: {
        ...action.payload,
        voteType: 0,
      },
    });

    // assert
    expect(nextState3).toEqual({
      ...initialState,
      comments: [
        {
          ...initialState.comments[0],
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    });
  });

});