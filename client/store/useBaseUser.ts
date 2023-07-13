import { create } from "zustand";

interface User {
  id?: string;
  full_name?: string;
  email?: string;
  avatar_url?: string;
  website?: string;
  username?: string;
}

type State = {
  user: User;
};

type Action = {
  setUser: (user: State["user"]) => void;
  removeUser: () => void;
};

const useBaseUser = create<State & Action>((set) => ({
  user: {},
  setUser: (payload: Partial<User>) =>
set((state) => ({ user: { ...state.user, ...payload } })),
  removeUser: () => set(() => ({ user: {} })),
}));

export default useBaseUser;
