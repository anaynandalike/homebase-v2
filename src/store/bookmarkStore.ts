import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BookmarkStore {
  bookmarkedIds: string[];
  toggleBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
}

export const useBookmarkStore = create<BookmarkStore>()(
  persist(
    (set, get) => ({
      bookmarkedIds: [],
      toggleBookmark: (id) =>
        set((state) => ({
          bookmarkedIds: state.bookmarkedIds.includes(id)
            ? state.bookmarkedIds.filter((b) => b !== id)
            : [...state.bookmarkedIds, id],
        })),
      isBookmarked: (id) => get().bookmarkedIds.includes(id),
    }),
    { name: "homebase-bookmarks" }
  )
);
