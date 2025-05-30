/* eslint-disable linebreak-style */
/**
 * Test scenario for ThreadDetail component
 * - Should render thread detail correctly
 * - Should call upvote function correctly when upvote button is clicked
 * - Should call downvote function correctly when downvote button is clicked
 * - Should call neutralize function correctly when neutralize button is clicked
 */

import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import ThreadDetail from './ThreadDetail';
import { afterEach, describe, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { expect } from 'vitest';
import matchers from '@testing-library/jest-dom/matchers';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { postedAt } from '../../utils';

// Extend matchers
expect.extend(matchers);

describe('ThreadDetail component', () => {
  afterEach(() => {
    cleanup();
  });

  const fakeThreadDetail = {
    id: '1',
    title: 'Thread 1',
    body: 'Body 1',
    category: 'Category 1',
    owner: {
      id: '1',
      name: 'User 1',
      avatar: 'http://images.unsplash.com/photo-1',
    },
    comments: [],
    createdAt: '2022-01-01T00:00:00.000Z',
  };

  function updateVoteThreadDetail(voteType = {}) {
    return {
      ...fakeThreadDetail,
      upVotesBy: voteType.upVotesBy ?? [],
      downVotesBy: voteType.downVotesBy ?? [],
    };
  }

  function createMockStore(authUser) {
    return configureStore({
      reducer: { authUser: () => authUser },
      preloadedState: { authUser },
    });
  }

  it('should render thread detail correctly', () => {
    const store = createMockStore({ id: '1', name: 'User 1' });

    render(
      <Provider store={store}>
        <ThreadDetail {...updateVoteThreadDetail()} onVoteThread={vi.fn()} />
      </Provider>
    );

    // owner avatar and name
    const avatar = screen.getByAltText('User 1');
    expect(avatar).toHaveAttribute('src', fakeThreadDetail.owner.avatar);

    expect(screen.getByText('User 1')).toBeInTheDocument();

    // postedAt mock
    expect(screen.getByText(postedAt(fakeThreadDetail.createdAt))).toBeInTheDocument();

    // title and body (dangerouslySetInnerHTML)
    expect(screen.getByText('Thread 1')).toBeInTheDocument();
    expect(screen.getByText('Body 1')).toBeInTheDocument();

    // category via mocked Chip
    expect(screen.getByTestId('chip')).toHaveTextContent('Category 1');

    // vote counts start at zero
    expect(screen.getAllByText('0')).toHaveLength(2);
  });

  it('neutralizes an upvote when clicked twice', async () => {
    const onVoteThread = vi.fn();
    const store = createMockStore({ id: '1', name: 'User 1' });

    // initial render: no votes
    const { rerender } = render(
      <Provider store={store}>
        <ThreadDetail {...updateVoteThreadDetail()} onVoteThread={onVoteThread} />
      </Provider>
    );

    const upBtn = screen.getByRole('button', { name: /upvote/i });
    // first click → upvote
    await userEvent.click(upBtn);
    expect(onVoteThread).toHaveBeenLastCalledWith({
      threadId: '1',
      voteType: 1,
    });

    rerender(
      <Provider store={store}>
        <ThreadDetail {...updateVoteThreadDetail({ upVotesBy: ['1'] })} onVoteThread={onVoteThread} />
      </Provider>
    );

    await userEvent.click(upBtn);
    expect(onVoteThread).toHaveBeenLastCalledWith({
      threadId: '1',
      voteType: 0,
    });
  });

  it('neutralizes a downvote when clicked twice', async () => {
    const onVoteThread = vi.fn();
    const store = createMockStore({ id: '1', name: 'User 1' });

    const { rerender } = render(
      <Provider store={store}>
        <ThreadDetail {...updateVoteThreadDetail()} onVoteThread={onVoteThread} />
      </Provider>
    );

    const downBtn = screen.getByRole('button', { name: /downvote/i });

    // first click → downvote
    await userEvent.click(downBtn);
    expect(onVoteThread).toHaveBeenLastCalledWith({
      threadId: '1',
      voteType: -1,
    });

    rerender(
      <Provider store={store}>
        <ThreadDetail {...updateVoteThreadDetail({ downVotesBy: ['1'] })} onVoteThread={onVoteThread} />
      </Provider>
    );

    await userEvent.click(downBtn);
    expect(onVoteThread).toHaveBeenLastCalledWith({
      threadId: '1',
      voteType: 0,
    });
  });

  it('switches from upvote to downvote (neutralizes then downvotes)', async () => {
    const onVoteThread = vi.fn();
    const store = createMockStore({ id: '1', name: 'User 1' });

    const { rerender } = render(
      <Provider store={store}>
        <ThreadDetail {...updateVoteThreadDetail()} onVoteThread={onVoteThread} />
      </Provider>
    );

    const upBtn = screen.getByRole('button', { name: /upvote/i });
    const downBtn = screen.getByRole('button', { name: /downvote/i });

    await userEvent.click(upBtn);
    expect(onVoteThread).toHaveBeenLastCalledWith({ threadId: '1', voteType: 1 });

    rerender(
      <Provider store={store}>
        <ThreadDetail {...updateVoteThreadDetail({ upVotesBy: ['1'] })} onVoteThread={onVoteThread} />
      </Provider>
    );

    await userEvent.click(downBtn);
    expect(onVoteThread).toHaveBeenLastCalledWith({ threadId: '1', voteType: -1 });
  });

  it('switches from downvote to upvote (neutralizes then upvotes)', async () => {
    const onVoteThread = vi.fn();
    const store = createMockStore({ id: '1', name: 'User 1' });

    const { rerender } = render(
      <Provider store={store}>
        <ThreadDetail {...updateVoteThreadDetail()} onVoteThread={onVoteThread} />
      </Provider>
    );

    const upBtn = screen.getByRole('button', { name: /upvote/i });
    const downBtn = screen.getByRole('button', { name: /downvote/i });

    await userEvent.click(downBtn);
    expect(onVoteThread).toHaveBeenLastCalledWith({ threadId: '1', voteType: -1 });

    rerender(
      <Provider store={store}>
        <ThreadDetail {...updateVoteThreadDetail({ downVotesBy: ['1'] })} onVoteThread={onVoteThread} />
      </Provider>
    );

    await userEvent.click(upBtn);
    expect(onVoteThread).toHaveBeenLastCalledWith({ threadId: '1', voteType: 1 });
  });
});