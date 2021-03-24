import { requestAPI } from './request';

const TOKEN_KEY = 'FVM_TOKEN';

class AuthService {
  constructor() {
    this._token = localStorage.getItem(TOKEN_KEY);
    this._currentUser = null;
    this.isLoggedIn = !!this._token;
  }

  _setUserToken(token) {
    this._token = token;
    localStorage.setItem(TOKEN_KEY, token);
  }

  async login(username) {
    const { data } = await requestAPI('/users/auth', {
      method: 'POST',
      body: {
        username,
      },
    });

    if (data) {
      this._setUserToken(data.token);
      this._currentUser = data.user;
      return data.user;
    }

    console.warn('[Auth Service] Not valid username');
    return null;
  }

  logout() {
    this._isLoggedIn = false;
    this._setUserToken(null);
  }

  getCurrentToken() {
    return this._token;
  }

  clean() {
    this._currentUser = null;
    this._token = null;
  }

  async getCurrentUser() {
    if (!this._token) {
      console.warn('[Auth Service] User is not logged in');
    }

    const { data: user } = await requestAPI('/users/me');

    if (!user) {
      return null;
    }

    return {
      name: user.name,
      login: user.username,
      role: user.role,
      marks: user.marks,
    };
  }
}

export const authService = new AuthService();
