import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url = 'http://localhost:3000/users';

  async login(name: string, password: string) {
    try {
      const response = await fetch(this.url + '/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          password: password,
        }),
      });

      if (response.status !== 200 && response.status !== 201) {
        throw new Error('Invalid credentials');
      }

      const user = await response.json();

      // Guardar solo el token en localStorage
      if (user && user.token) {
        localStorage.setItem('token', user.token);
      }

      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async verifyToken(token: string) {
    try {
      const response = await fetch(this.url + `/verify/${token}`);

      if (response.status !== 200 && response.status !== 201) {
        return null;
      }

      const data = await response.json();
      return data.valid ? data.user : null;
    } catch (error) {
      console.error('Verify token error:', error);
      return null;
    }
  }

  async logout() {
    try {
      const token = this.getToken();

      if (!token) {
        throw new Error('No token found');
      }
      const user = await this.verifyToken(token);

      if (!user || !user._id) {
        throw new Error('Cannot get user ID from token');
      }

      const response = await fetch(this.url + `/logout/${user._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        localStorage.removeItem('token');
        return true;
      }

      throw new Error('Logout failed');
    } catch (error) {
      console.error('Logout error:', error);
      return false;
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  async getUserId(): Promise<string | null> {
    const token = this.getToken();
    if (!token) return null;

    const user = await this.verifyToken(token);
    return user ? user._id : null;
  }

  async isAdmin(): Promise<boolean> {
    const token = this.getToken();
    if (!token) return false;

    const user = await this.verifyToken(token);
    return user ? user.admin : false;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
