import { useState } from "react";
import { PageTransition } from "@/components/PageTransition";
import { EmptyState } from "@/components/EmptyState";
import { resources, type Resource } from "@/data/resources";
import { useBookmarkStore } from "@/store/bookmarkStore";
import { useToastStore } from "@/store/toastStore";
import { motion } from "framer-motion";
import {
  Search,
  Bookmark,
  BookmarkCheck,
  MapPin,
  Clock,
  Compass as CompassIcon,
  Heart,
  Users,
  Calendar,
  UtensilsCrossed,
  Wrench,
  Package,
} from "lucide-react";

const categories = [
  "All",
  "Counseling",
  "Clubs",
  "Events",
  "Dining",
  "Essential Services",
] as const;

const categoryIcons: Record<string, React.ElementType> = {
  Counseling: Heart,
  Clubs: Users,
  Events: Calendar,
  Dining: UtensilsCrossed,
  "Essential Services": Wrench,
};

const vibeEmojis: Record<string, string> = {
  "Free Food": "\uD83C\uDF55",
  "Low Sensory": "\uD83C\uDF3F",
  "Great for Freshmen": "\u2B50",
};

type Tab = "browse" | "bookmarks";

export default function Compass() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeTab, setActiveTab] = useState<Tab>("browse");
  const { bookmarkedIds, toggleBookmark, isBookmarked } = useBookmarkStore();
  const addToast = useToastStore((s) => s.addToast);

  let filtered =
    activeTab === "bookmarks"
      ? resources.filter((r) => bookmarkedIds.includes(r.id))
      : resources;

  if (activeCategory !== "All" && activeTab === "browse") {
    filtered = filtered.filter((r) => r.category === activeCategory);
  }

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q)
    );
  }

  const essentials = resources.filter((r) => r.isEssential);

  const handleToggleBookmark = (resource: Resource) => {
    const wasBookmarked = isBookmarked(resource.id);
    toggleBookmark(resource.id);
    addToast(
      wasBookmarked
        ? `Removed "${resource.title}" from bookmarks`
        : `Bookmarked "${resource.title}"`
    );
  };

  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto px-5 py-6">
        <div className="mb-6">
          <h1 className="font-heading text-2xl font-bold text-charcoal">
            Campus Compass
          </h1>
          <p className="text-warmgray text-sm mt-0.5">
            Resources, events, and essentials
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-5">
          <button
            onClick={() => setActiveTab("browse")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              activeTab === "browse"
                ? "bg-red text-white"
                : "bg-white border border-sand text-warmgray"
            }`}
          >
            Browse
          </button>
          <button
            onClick={() => setActiveTab("bookmarks")}
            className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              activeTab === "bookmarks"
                ? "bg-red text-white"
                : "bg-white border border-sand text-warmgray"
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            Saved ({bookmarkedIds.length})
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-warmgray-light" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search resources and events..."
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-sand bg-white text-sm focus:outline-none focus:ring-2 focus:ring-red/20 focus:border-red/40"
          />
        </div>

        {/* Category filters */}
        {activeTab === "browse" && (
          <div className="flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-charcoal text-white"
                    : "bg-white border border-sand text-warmgray hover:text-charcoal"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Cards */}
        {filtered.length === 0 ? (
          <EmptyState
            icon={<CompassIcon className="w-8 h-8" />}
            title={
              activeTab === "bookmarks"
                ? "No bookmarks yet"
                : "No results found"
            }
            description={
              activeTab === "bookmarks"
                ? "Bookmark resources for quick access."
                : "Try a different search or category."
            }
          />
        ) : (
          <div className="space-y-3 mb-8">
            {filtered.map((resource, i) => {
              const Icon = categoryIcons[resource.category] || CompassIcon;
              return (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="bg-white rounded-2xl p-4 border border-sand/60 hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-cream rounded-xl flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-warmgray" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-sm text-charcoal">
                            {resource.title}
                          </h3>
                          <span className="text-[10px] text-warmgray bg-cream px-2 py-0.5 rounded-full mt-1 inline-block">
                            {resource.category}
                          </span>
                        </div>
                        <button
                          onClick={() => handleToggleBookmark(resource)}
                          className="text-warmgray-light hover:text-red transition-colors shrink-0"
                        >
                          {isBookmarked(resource.id) ? (
                            <BookmarkCheck className="w-5 h-5 text-red" />
                          ) : (
                            <Bookmark className="w-5 h-5" />
                          )}
                        </button>
                      </div>

                      <p className="text-xs text-warmgray mt-2">
                        {resource.description}
                      </p>

                      <div className="flex items-center gap-3 mt-2 text-[11px] text-warmgray-light">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {resource.location}
                        </span>
                        {resource.dateTime && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {resource.dateTime}
                          </span>
                        )}
                      </div>

                      {resource.vibeTags && resource.vibeTags.length > 0 && (
                        <div className="flex gap-1.5 mt-2">
                          {resource.vibeTags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] bg-red-bg text-red px-2 py-0.5 rounded-full"
                            >
                              {vibeEmojis[tag]} {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Out-of-State Essentials */}
        {activeTab === "browse" && activeCategory === "All" && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-4 h-4 text-red" />
              <h2 className="font-heading text-lg font-semibold text-charcoal">
                Out-of-State Essentials
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {essentials.map((resource) => (
                <div
                  key={resource.id}
                  className="bg-red-bg rounded-xl p-4 border border-red/8"
                >
                  <h4 className="font-medium text-sm text-charcoal mb-1">
                    {resource.title}
                  </h4>
                  <p className="text-[11px] text-warmgray mb-2">
                    {resource.description}
                  </p>
                  <span className="text-[10px] text-red flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {resource.location}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
