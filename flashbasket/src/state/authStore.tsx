import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {mmkvStorage} from './storage';

interface authStore {
  user: Record<string, any> | null;
  setUser: (user: any) => void;
  currentOrder: Record<string, any> | null;
  setCurrentOrder: (order: any) => void;
  logout: () => void;
}

export const useAuthStore = create<authStore>()(
  persist(
    (set, get) => ({
      user: null,
      currentOrder: null,
      setUser: data => set({user: data}),
      setCurrentOrder: order => set({currentOrder: order}),
      logout: () => set({user: null, currentOrder: null}),
    }),
    {
      name: 'auth_storage',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
