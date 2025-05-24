// ======================
// TypeScript Interfaces
// ======================

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface Thread {
  id: string;
  title: string;
  body: string;
  category?: string;
  createdAt: string;
  ownerId: string;
  upVotesBy: string[];
  downVotesBy: string[];
  totalComments: number;
}

export interface threadDetail extends Thread {
  owner: User;
  comments: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  upVotesBy: string[];
  downVotesBy: string[];
  owner: User;
}

export interface Vote {
  id: string;
  userId: string;
  threadId?: string;
  commentId?: string;
  voteType: number;
}

export interface LeaderboardEntry {
  user: User;
  score: number;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface CreateThreadPayload {
  title: string;
  body: string;
  category?: string;
}

export interface CreateCommentPayload {
  threadId: string;
  content: string;
}

// ======================
// API Implementation
// ======================

const api = (() => {
  const BASE_URL = 'https://forum-api.dicoding.dev/v1';

  function putAccessToken(token: string): void {
    localStorage.setItem('accessToken', token);
  }

  function getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  async function _fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }

  // Register a new user
  async function register({ name, email, password }: RegisterPayload): Promise<User> {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
    return responseJson.data.user;
  }

  // Login user
  async function login({ email, password }: LoginPayload): Promise<string> {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
    return responseJson.data.token as string;
  }

  // Get own profile
  async function getOwnProfile(): Promise<User> {
    const response = await _fetchWithAuth(`${BASE_URL}/users/me`);
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
    return responseJson.data.user;
  }

  // Get all users
  async function getAllUsers(): Promise<User[]> {
    const response = await fetch(`${BASE_URL}/users`);
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
    return responseJson.data.users as User[];
  }

  // Get all threads
  async function getAllThreads(): Promise<Thread[]> {
    const response = await fetch(`${BASE_URL}/threads`);
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
    return responseJson.data.threads;
  }

  // Get thread detail
  async function getThreadDetail(threadId: string): Promise<threadDetail> {
    const response = await fetch(`${BASE_URL}/threads/${threadId}`);
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
    return responseJson.data.detailThread as threadDetail;
  }

  // Create thread
  async function createThread({ title, body, category }: CreateThreadPayload): Promise<Thread> {
    const response = await _fetchWithAuth(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body, category }),
    });
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
    return responseJson.data.thread;
  }

  // Create comment on a thread
  async function createComment({ threadId, content }: CreateCommentPayload): Promise<Comment> {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
    return responseJson.data.comment as Comment;
  }

  // Upvote a thread
  async function upVoteThread(threadId: string): Promise<Vote> {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/up-vote`, {
      method: 'POST',
    });
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
    return responseJson.data.vote;
  }

  // Downvote a thread
  async function downVoteThread(threadId: string): Promise<Vote> {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/down-vote`, {
      method: 'POST',
    });
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
    return responseJson.data.vote as Vote;
  }

  // Neutralize thread vote
  async function neutralVoteThread(threadId: string): Promise<Vote> {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/neutral-vote`, {
      method: 'POST',
    });
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
    return responseJson.data.vote;
  }

  // Upvote a comment
  async function upVoteComment(threadId: string, commentId: string): Promise<Vote> {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`, {
      method: 'POST',
    });
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
    return responseJson.data.vote as Vote;
  }

  // Downvote a comment
  async function downVoteComment(threadId: string, commentId: string): Promise<Vote> {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`, {
      method: 'POST',
    });
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
    return responseJson.data.vote;
  }

  // Neutralize comment vote
  async function neutralVoteComment(threadId: string, commentId: string): Promise<Vote> {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`, {
      method: 'POST',
    });
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
    return responseJson.data.vote as Vote;
  }

  // Get leaderboards
  async function getLeaderboards(): Promise<LeaderboardEntry[]> {
    const response = await fetch(`${BASE_URL}/leaderboards`);
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
    return responseJson.data.leaderboards;
  }

  return {
    putAccessToken,
    getAccessToken,
    register,
    login,
    getOwnProfile,
    getAllUsers,
    getAllThreads,
    getThreadDetail,
    createThread,
    createComment,
    upVoteThread,
    downVoteThread,
    neutralVoteThread,
    upVoteComment,
    downVoteComment,
    neutralVoteComment,
    getLeaderboards,
  };
})();

export default api;
  