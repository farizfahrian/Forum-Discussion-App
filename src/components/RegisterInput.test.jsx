/* eslint-disable linebreak-style */
import React from 'react';
import { render, screen } from '@testing-library/react';
import RegisterInput from './RegisterInput';
import { afterEach, describe, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { expect } from 'vitest';
import matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';

/**
 * Test scenario for RegisterInput component
 * - Should handle name typing correctly
 * - Should handle email typing correctly
 * - Should handle password typing correctly
 * - Should call register function correctly when register button is clicked
 */

expect.extend(matchers);

describe('RegisterInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle name typing correctly', async () => {
    // arrange
    render(<RegisterInput register={() => {}} />);
    const nameInput = await screen.getByPlaceholderText('Name');

    // action
    await userEvent.type(nameInput, 'Test');

    // assert
    expect(nameInput).toHaveValue('Test');
  });

  it('should handle email typing correctly', async () => {
    // arrange
    render(<RegisterInput register={() => {}} />);
    const emailInput = await screen.getByPlaceholderText('Email');

    // action
    await userEvent.type(emailInput, 'test@example.com');

    // assert
    expect(emailInput).toHaveValue('test@example.com');
  });

  it('should handle password typing correctly', async () => {
    // arrange
    render(<RegisterInput register={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText('Password');

    // action
    await userEvent.type(passwordInput, 'password123');

    // assert
    expect(passwordInput).toHaveValue('password123');
  });

  it('should call register function correctly when register button is clicked', async () => {
    // arrange
    const register = vi.fn();
    render(<RegisterInput register={register} />);
    const nameInput = await screen.getByPlaceholderText('Name');
    await userEvent.type(nameInput, 'Test');
    const emailInput = await screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'test@example.com');
    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'password123');
    const registerButton = await screen.getByRole('button', { name: 'Register' });

    // action
    await userEvent.click(registerButton);

    // assert
    expect(register).toHaveBeenCalledWith({
      name: 'Test',
      email: 'test@example.com',
      password: 'password123',
    });
  });
});