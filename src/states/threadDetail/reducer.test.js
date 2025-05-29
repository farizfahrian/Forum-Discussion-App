/* eslint-disable linebreak-style */

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