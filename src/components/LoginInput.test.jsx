/* eslint-disable linebreak-style */

import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginInput from './LoginInput';
import { afterEach, describe, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { expect } from 'vitest';
import matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';

/**
 * Test scenario for LoginInput component
 * - Should handle email typing correctly
 * - Should handle password typing correctly
 * - Should call login function correctly when login button is clicked
 */

expect.extend(matchers);

describe('LoginInput component', () => {
  afterEach(() => {
    cleanup();
  });
  it('should handle email typing correctly', async () => {
    // arrange
    render(<LoginInput login={() => {}} />);
    const emailInput = await screen.getByPlaceholderText('Email');

    // action
    await userEvent.type(emailInput, 'test@example.com');

    // assert
    expect(emailInput).toHaveValue('test@example.com');
  });

  it('should handle password typing correctly', async () => {
    // arrange
    render(<LoginInput login={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText('Password');

    // action
    await userEvent.type(passwordInput, 'test123');

    // assert
    expect(passwordInput).toHaveValue('test123');
  });

  it('should call login function correctly when login button is clicked', async () => {
    // arrange
    const login = vi.fn();
    render(<LoginInput login={login} />);
    const emailInput = await screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'test@example.com');
    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'test123');
    const loginButton = await screen.getByRole('button', { name: 'Login' });

    // action
    await userEvent.click(loginButton);

    // assert
    expect(login).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'test123',
    });
  });
});