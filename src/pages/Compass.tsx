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
  "Essentials",
] as const;

const categoryMap: Record<string, string> = {
  Essentials: "Essential Services",
};

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
    const cat = categoryMap[activeCategory] || activeCategory;
    filtered = filtered.filter((r) => r.category === cat);
  }

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q)
    );
  }

  const essentials = resources.filter((r) => r.isEssential);

  const handleToggleBookmark = (resource: Resource) => {
    const wasBookmarked = isBookmarked(resource.id);
    toggleBookmark(resource.id);
    addToast(wasBookmarked ? "Removed bookmark" : "Bookmarked!");
  };

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-charcoal">
            Campus Compass
          </h1>
          <p className="text-warmgray text-base mt-1">
            Resources, events, and essentials
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setActiveTab("browse")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === "browse"
                ? "bg-red text-white"
                : "bg-white border border-sand text-warmgray hover:text-charcoal"
            }`}
          >
            Browse
          </button>
          <button
            onClick={() => setActiveTab("bookmarks")}
            className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === "bookmarks"
                ? "bg-red text-white"
                : "bg-white border border-sand text-warmgray hover:text-charcoal"
            }`}
          >
            <Bookmark className="w-4 h-4" />
            Saved ({bookmarkedIds.length})
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-6 max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-warmgray-light" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search resources..."
            className="w-full pl-12 pr-4 py-3 rounded-full border border-sand bg-white text-base focus:outline-none focus:ring-2 focus:ring-red/20 focus:border-red/40"
          />
        </div>

        {/* Category filters */}
        {activeTab === "browse" && (
          <div className="flex gap-3 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
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
            icon={<CompassIcon className="w-10 h-10" />}
            title={activeTab === "bookmarks" ? "No bookmarks yet" : "No results"}
            description={
              activeTab === "bookmarks"
                ? "Bookmark resources for quick access."
                : "Try a different search."
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {filtered.map((resource, i) => {
              const Icon = categoryIcons[resource.category] || CompassIcon;
              return (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="bg-white rounded-2xl p-6 border border-sand/60"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-cream rounded-xl flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-warmgray" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="font-semibold text-base text-charcoal leading-tight">
                            {resource.title}
                          </h3>
                          <span className="text-xs text-warmgray bg-cream px-2.5 py-0.5 rounded-full mt-1.5 inline-block">
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

                      <p className="text-sm text-warmgray mt-2 leading-relaxed">
                        {resource.description}
                      </p>

                      <div className="flex items-center gap-3 mt-2 text-sm text-warmgray-light">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {resource.location}
                        </span>
                        {resource.dateTime && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {resource.dateTime}
                          </span>
                        )}
                      </div>

                      {resource.vibeTags && resource.vibeTags.length > 0 && (
                        <div className="flex gap-2 mt-3">
                          {resource.vibeTags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs bg-red-bg text-red px-2.5 py-1 rounded-full"
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

        {/* Essentials */}
        {activeTab === "browse" && activeCategory === "All" && (
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Package className="w-5 h-5 text-red" />
              <h2 className="font-heading text-xl font-semibold text-charcoal">
                Out-of-State Essentials
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {essentials.map((r) => (
                <div
                  key={r.id}
                  className="bg-red-bg rounded-2xl p-5 border border-red/8"
                >
                  <h4 className="font-medium text-sm text-charcoal mb-1 leading-tight">
                    {r.title}
                  </h4>
                  <p className="text-sm text-warmgray mb-2 leading-relaxed">
                    {r.description}
                  </p>
                  <span className="text-xs text-red flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {r.location}
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
