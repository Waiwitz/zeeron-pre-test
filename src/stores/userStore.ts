import { create } from "zustand";
import type { User } from "../interface";

type State = {
  users: User[];
};

type Action = {
  setUsers: (users: State["users"]) => void;
};

export const useUsersStore = create<State & Action>()((set) => ({
  users: [],
  setUsers: (users) => set(() => ({ users })),
}));
