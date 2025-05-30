/* eslint-disable linebreak-style */

import React from 'react';
import { describe, expect, it } from 'vitest';
import matchers from '@testing-library/jest-dom/matchers';
import { render, screen } from '@testing-library/react';
import LeaderboardList from './LeaderboardList';

/**
 * Test scenario for LeaderboardList component
 * - Should render leaderboard list correctly
 */

expect.extend(matchers);

describe('LeaderboardList component', () => {
  it('should render leaderboard list correctly', () => {
    // arrange
    const leaderboardList = [
      {
        user: {
          id: '1',
          avatar: 'https://ui-avatars.com/api/?name=John+Doe',
          name: 'John Doe',
        },
        score: 10,
      },
      {
        user: {
          id: '2',
          avatar: 'https://ui-avatars.com/api/?name=Jane+Doe',
          name: 'Jane Doe',
        },
        score: 5,
      },
    ];
    render(<LeaderboardList leaderboardList={leaderboardList} />);

    // assert
    expect(screen.getByText('Leaderboard')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });
});