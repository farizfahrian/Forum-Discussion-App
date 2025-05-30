/* eslint-disable linebreak-style */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import api from '../../../utils/api';
import { asyncRegisterUsers } from './action';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

/**
 * Test scenario for asyncRegisterUsers thunk
 *
 * Test 1: asyncRegisterUsers thunk
 * - Should dispatch action correctly when data sending is successful
 * - Should dispatch action and call alert correctly when data sending fails
 */

const fakeRegisterUsers = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  password: 'password',
//   successCallback: vi.fn(),
};

const fakeErrorResponse = new Error('Error fetching data');

describe('asyncRegisterUsers thunk', () => {
  beforeEach(() => {
    api._register = api.register;
  });

  afterEach(() => {
    api.register = api._register;

    delete api._register;
  });

  it('should dispatch action correctly when data sending is successful', async () => {
    api.register = () => Promise.resolve(fakeRegisterUsers);

    const dispatch = vi.fn();

    await asyncRegisterUsers(fakeRegisterUsers)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data sending fails', async () => {
    api.register = () => Promise.reject(fakeErrorResponse);

    const dispatch = vi.fn();
    window.alert = vi.fn();

    await asyncRegisterUsers(fakeRegisterUsers)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse);
  });
});