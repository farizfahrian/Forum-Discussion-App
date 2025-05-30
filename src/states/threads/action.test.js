/* eslint-disable linebreak-style */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import api from '../../../utils/api';
import { addThreadActionCreator, asyncToggleVoteThread, toggleVoteThreadActionCreator } from './action';
import { asyncAddThread } from './action';

/**
 * Test scenario for asyncThreads thunk
 *
 * Test 1: asyncAddThread thunk
 * - Should dispatch action correctly when data sending is successful
 * - Should dispatch action and call alert correctly when data sending fails
 *
 * Test 2: asyncToggleVoteThread thunk
 * - Should dispatch action correctly when data sending is successful
 * - Should dispatch action and call alert correctly when data sending fails
 */

const fakeAddThreads = [
  {
    title: 'Thread 1',
    body: 'Body 1',
    category: 'Category 1',
  },
];

const fakeToggleVoteThread = {
  threadId: 'thread-1',
  voteType: 0,
  userId: 'user-1',
};

const fakeToggleUpVoteThread = {
  ...fakeToggleVoteThread,
  voteType: 1,
};

const fakeToggleDownVoteThread = {
  ...fakeToggleVoteThread,
  voteType: -1,
};

const fakeToggleNeutralizeThreadVote = {
  ...fakeToggleVoteThread,
  voteType: 0,
};

const fakeErrorResponse = new Error('Error fetching data');

describe('asyncAddThread thunk', () => {
  beforeEach(() => {
    api._createThread = api.createThread;
  });

  afterEach(() => {
    api.createThread = api._createThread;

    delete api._createThread;
  });

  it('should dispatch action correctly when data sending is successful', async () => {
    api.createThread = () => Promise.resolve(fakeAddThreads);

    const dispatch = vi.fn();

    await asyncAddThread(fakeAddThreads)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(addThreadActionCreator(fakeAddThreads));
  });

  it('should dispatch action and call alert correctly when data sending fails', async () => {
    api.createThread = () => Promise.reject(fakeErrorResponse);

    const dispatch = vi.fn();
    window.alert = vi.fn();

    await asyncAddThread(fakeAddThreads)(dispatch);

    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse);
  });
});

describe('asyncToggleVoteThread thunk', () => {
  beforeEach(() => {
    api._upVoteThread = api.upVoteThread;
    api._downVoteThread = api.downVoteThread;
    api._neutralizeThreadVote = api.neutralizeThreadVote;
  });

  afterEach(() => {
    api.upVoteThread = api._upVoteThread;
    api.downVoteThread = api._downVoteThread;
    api.neutralizeThreadVote = api._neutralizeThreadVote;

    delete api._upVoteThread;
    delete api._downVoteThread;
    delete api._neutralizeThreadVote;
  });

  // up vote thread
  it('should dispatch action correctly when data sending is successful', async () => {
    api.upVoteThread = () => Promise.resolve(fakeToggleUpVoteThread);

    const dispatch = vi.fn();
    const getState = vi.fn(() => {
      return {
        authUser: {
          id: 'user-1',
        },
      };
    });

    await asyncToggleVoteThread(fakeToggleUpVoteThread)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(toggleVoteThreadActionCreator(fakeToggleUpVoteThread));
  });

  it('should dispatch action and call alert correctly when data sending fails', async () => {
    api.upVoteThread = () => Promise.reject(fakeErrorResponse);

    const dispatch = vi.fn();
    const getState = vi.fn(() => {
      return {
        authUser: {
          id: 'user-1',
        },
      };
    });
    window.alert = vi.fn();

    await asyncToggleVoteThread(fakeToggleUpVoteThread)(dispatch, getState);

    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse);
  });


  // down vote thread
  it('should dispatch action correctly when data sending is successful', async () => {
    api.downVoteThread = () => Promise.resolve(fakeToggleDownVoteThread);

    const dispatch = vi.fn();
    const getState = vi.fn(() => {
      return {
        authUser: {
          id: 'user-1',
        },
      };
    });

    await asyncToggleVoteThread(fakeToggleDownVoteThread)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(toggleVoteThreadActionCreator(fakeToggleDownVoteThread));
  });

  it('should dispatch action and call alert correctly when data sending fails', async () => {
    api.downVoteThread = () => Promise.reject(fakeErrorResponse);

    const dispatch = vi.fn();
    const getState = vi.fn(() => {
      return {
        authUser: {
          id: 'user-1',
        },
      };
    });
    window.alert = vi.fn();

    await asyncToggleVoteThread(fakeToggleDownVoteThread)(dispatch, getState);

    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse);
  });


  // neutralize thread vote
  it('should dispatch action correctly when data sending is successful', async () => {
    api.neutralizeThreadVote = () => Promise.resolve(fakeToggleNeutralizeThreadVote);

    const dispatch = vi.fn();
    const getState = vi.fn(() => {
      return {
        authUser: {
          id: 'user-1',
        },
      };
    });

    await asyncToggleVoteThread(fakeToggleNeutralizeThreadVote)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(toggleVoteThreadActionCreator(fakeToggleNeutralizeThreadVote));
  });

  it('should dispatch action and call alert correctly when data sending fails', async () => {
    api.neutralizeThreadVote = () => Promise.reject(fakeErrorResponse);

    const dispatch = vi.fn();
    const getState = vi.fn(() => {
      return {
        authUser: {
          id: 'user-1',
        },
      };
    });
    window.alert = vi.fn();

    await asyncToggleVoteThread(fakeToggleNeutralizeThreadVote)(dispatch, getState);

    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse);
  });
});
