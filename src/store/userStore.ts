import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserProfile {
  name: string;
  university: string;
  homeState: string;
  interests: string[];
  lookingFor: string[];
  profilePhoto: string | null;
  onboardingComplete: boolean;
}

interface UserStore {
  user: UserProfile;
  setUser: (user: Partial<UserProfile>) => void;
  completeOnboarding: () => void;
  resetUser: () => void;
}

const defaultUser: UserProfile = {
  name: "",
  university: "",
  homeState: "",
  interests: [],
  lookingFor: [],
  profilePhoto: null,
  onboardingComplete: false,
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: defaultUser,
      setUser: (updates) =>
        set((state) => ({ user: { ...state.user, ...updates } })),
      completeOnboarding: () =>
        set((state) => ({ user: { ...state.user, onboardingComplete: true } })),
      resetUser: () => set({ user: defaultUser }),
    }),
    { name: "homebase-user" }
  )
);
