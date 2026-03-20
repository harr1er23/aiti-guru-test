import { create } from 'zustand';
import { persist, createJSONStorage, type StateStorage } from 'zustand/middleware';
import { login as loginApi, type AuthResponse } from '../api/authApi';

interface AuthStore {
  accessToken: string | null;
  user: Omit<AuthResponse, 'accessToken' | 'refreshToken'> | null;
  rememberMe: boolean;
  login: (username: string, password: string, rememberMe: boolean) => Promise<void>;
  logout: () => void;
}

const dynamicStorageBase: StateStorage = {
  getItem: (name: string) => {
    return localStorage.getItem(name) ?? sessionStorage.getItem(name);
  },
  setItem: (name: string, value: string) => {
    const parsed = JSON.parse(value);
    const rememberMe = parsed?.state?.rememberMe;
    if (rememberMe) {
      localStorage.setItem(name, value);
      sessionStorage.removeItem(name);
    } else {
      sessionStorage.setItem(name, value);
      localStorage.removeItem(name);
    }
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
    sessionStorage.removeItem(name);
  },
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      rememberMe: false,

      login: async (username, password, rememberMe) => {
        const data = await loginApi({ username, password, expiresInMins: 60 });
        set({
          accessToken: data.accessToken,
          rememberMe,
          user: {
            id: data.id,
            username: data.username,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
          },
        });
      },

      logout: () => set({ accessToken: null, user: null }),
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => dynamicStorageBase),
    }
  )
);
