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
      <div className="max-w-[430px] mx-auto px-4 py-5">
        <div className="mb-4">
          <h1 className="font-heading text-xl font-bold text-charcoal">
            Campus Compass
          </h1>
          <p className="text-warmgray text-[11px] mt-0.5">
            Resources, events, and essentials
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1.5 mb-4">
          <button
            onClick={() => setActiveTab("browse")}
            className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all ${
              activeTab === "browse"
                ? "bg-red text-white"
                : "bg-white border border-sand text-warmgray"
            }`}
          >
            Browse
          </button>
          <button
            onClick={() => setActiveTab("bookmarks")}
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-medium transition-all ${
              activeTab === "bookmarks"
                ? "bg-red text-white"
                : "bg-white border border-sand text-warmgray"
            }`}
          >
            <Bookmark className="w-3 h-3" />
            Saved ({bookmarkedIds.length})
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-warmgray-light" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search resources..."
            className="w-full pl-9 pr-3 py-2 rounded-full border border-sand bg-white text-xs focus:outline-none focus:ring-2 focus:ring-red/20 focus:border-red/40"
          />
        </div>

        {/* Category filters */}
        {activeTab === "browse" && (
          <div className="flex gap-1.5 mb-4 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-charcoal text-white"
                    : "bg-white border border-sand text-warmgray"
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
            icon={<CompassIcon className="w-7 h-7" />}
            title={activeTab === "bookmarks" ? "No bookmarks yet" : "No results"}
            description={
              activeTab === "bookmarks"
                ? "Bookmark resources for quick access."
                : "Try a different search."
            }
          />
        ) : (
          <div className="space-y-2.5 mb-6">
            {filtered.map((resource, i) => {
              const Icon = categoryIcons[resource.category] || CompassIcon;
              return (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.025 }}
                  className="bg-white rounded-2xl p-3.5 border border-sand/60"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 bg-cream rounded-lg flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-warmgray" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <div className="min-w-0">
                          <h3 className="font-semibold text-xs text-charcoal leading-tight">
                            {resource.title}
                          </h3>
                          <span className="text-[8px] text-warmgray bg-cream px-1.5 py-0.5 rounded-full mt-1 inline-block">
                            {resource.category}
                          </span>
                        </div>
                        <button
                          onClick={() => handleToggleBookmark(resource)}
                          className="text-warmgray-light hover:text-red transition-colors shrink-0"
                        >
                          {isBookmarked(resource.id) ? (
                            <BookmarkCheck className="w-4 h-4 text-red" />
                          ) : (
                            <Bookmark className="w-4 h-4" />
                          )}
                        </button>
                      </div>

                      <p className="text-[10px] text-warmgray mt-1.5 leading-relaxed">
                        {resource.description}
                      </p>

                      <div className="flex items-center gap-2 mt-1.5 text-[9px] text-warmgray-light">
                        <span className="flex items-center gap-0.5">
                          <MapPin className="w-2.5 h-2.5" />
                          {resource.location}
                        </span>
                        {resource.dateTime && (
                          <span className="flex items-center gap-0.5">
                            <Clock className="w-2.5 h-2.5" />
                            {resource.dateTime}
                          </span>
                        )}
                      </div>

                      {resource.vibeTags && resource.vibeTags.length > 0 && (
                        <div className="flex gap-1 mt-1.5">
                          {resource.vibeTags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[8px] bg-red-bg text-red px-1.5 py-0.5 rounded-full"
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
            <div className="flex items-center gap-1.5 mb-3">
              <Package className="w-3.5 h-3.5 text-red" />
              <h2 className="font-heading text-sm font-semibold text-charcoal">
                Out-of-State Essentials
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {essentials.map((r) => (
                <div
                  key={r.id}
                  className="bg-red-bg rounded-xl p-3 border border-red/8"
                >
                  <h4 className="font-medium text-[11px] text-charcoal mb-0.5 leading-tight">
                    {r.title}
                  </h4>
                  <p className="text-[9px] text-warmgray mb-1.5 leading-relaxed">
                    {r.description}
                  </p>
                  <span className="text-[8px] text-red flex items-center gap-0.5">
                    <MapPin className="w-2.5 h-2.5" />
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
