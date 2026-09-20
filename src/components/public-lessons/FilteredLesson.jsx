"use client";

import { FiSearch, FiX, FiTag, FiChevronDown } from "react-icons/fi";
import { useRouter, useSearchParams } from "next/navigation";
import { IoCloseOutline } from "react-icons/io5";

const categories = [
  { id: "all", label: "All Categories" },
  { id: "personal-growth", label: "Personal Growth" },
  { id: "career", label: "Career" },
  { id: "relationships", label: "Relationships" },
  { id: "mindset", label: "Mindset" },
  { id: "mistakes-learned", label: "Mistakes Learned" },
];

const emotionalTones = [
  { id: "all", label: "All Emotional Tones" },
  { id: "motivational", label: "Motivational" },
  { id: "sad", label: "Sad" },
  { id: "realization", label: "Realization" },
  { id: "gratitude", label: "Gratitude" },
];

const FilteredLesson = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ⚡ অটো-ফিল্টার হ্যান্ডলার (অপশন সিলেক্ট করার সাথে সাথেই ইউআরএল আপডেট হবে)
  const handleFilterChange = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`?${params.toString()}`);
  };

  const removeSingleParam = (key) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    router.push(`?${params.toString()}`);
  };

  const handleDeleteFiltering = () => {
    router.push("?");
  };

  const searchVal = searchParams.get("search");
  const categoryVal = searchParams.get("category");
  const toneVal = searchParams.get("emotionalTone");
  const sortVal = searchParams.get("sortBy");

  const hasActiveFilters =
    searchVal ||
    (categoryVal && categoryVal !== "all") ||
    (toneVal && toneVal !== "all") ||
    sortVal;

  return (
    <div className="w-full max-w-7xl mx-auto space-y-3">
      <div className="bg-[#0d071f]/60 border border-white/10 rounded-2xl p-4 backdrop-blur-xl flex flex-col md:flex-row items-center gap-3 shadow-xl w-full">
        
        {/* 1. Search Input (Enter চাপলে বা Blur হলে অটো ফিল্টার হবে) */}
        <div className="w-full md:flex-1 relative group">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-focus-within:bg-purple-500/20 group-focus-within:border-purple-500/40 group-focus-within:text-purple-300 transition-all duration-300 pointer-events-none">
            <FiSearch className="w-3.5 h-3.5" />
          </div>

          <input
            type="text"
            name="search"
            defaultValue={searchVal || ""}
            placeholder="Search lessons, topics, or authors..."
            aria-label="Search lessons"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleFilterChange("search", e.currentTarget.value);
              }
            }}
            onBlur={(e) => handleFilterChange("search", e.currentTarget.value)}
            className="w-full h-11 pl-14 pr-4 rounded-xl bg-[#0d071f]/70 hover:bg-[#110930]/80 border border-white/8 hover:border-purple-500/30 focus:border-purple-500/60 focus:bg-[#110930] text-white placeholder-white/30 text-sm font-medium outline-none transition-all duration-300 shadow-inner"
          />
        </div>

        {/* 2. Category Select (অটো আউটপুট onChange) */}
        <div className="relative w-full md:w-44 shrink-0">
          <select
            name="category"
            value={categoryVal || "all"}
            onChange={(e) => handleFilterChange("category", e.target.value)}
            aria-label="Filter by Category"
            className="w-full h-11 pl-4 pr-10 rounded-xl bg-[#11092c] hover:bg-[#160b38] border border-white/10 hover:border-purple-500/30 focus:border-purple-500/60 text-white text-xs font-semibold appearance-none outline-none cursor-pointer transition-all shadow-inner"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id} className="bg-[#0f0826] text-white py-2">
                {cat.label}
              </option>
            ))}
          </select>
          <FiChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400 pointer-events-none" />
        </div>

        {/* 3. Emotional Tone Select (অটো আউটপুট onChange) */}
        <div className="relative w-full md:w-44 shrink-0">
          <select
            name="emotionalTone"
            value={toneVal || "all"}
            onChange={(e) => handleFilterChange("emotionalTone", e.target.value)}
            aria-label="Filter by Emotional Tone"
            className="w-full h-11 pl-4 pr-10 rounded-xl bg-[#11092c] hover:bg-[#160b38] border border-white/10 hover:border-purple-500/30 focus:border-purple-500/60 text-white text-xs font-semibold appearance-none outline-none cursor-pointer transition-all shadow-inner"
          >
            {emotionalTones.map((tone) => (
              <option key={tone.id} value={tone.id} className="bg-[#0f0826] text-white py-2">
                {tone.label}
              </option>
            ))}
          </select>
          <FiChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400 pointer-events-none" />
        </div>

        {/* 4. Sort Options (অটো আউটপুট onChange) */}
        <div className="relative w-full md:w-44 shrink-0">
          <select
            name="sortBy"
            value={sortVal || ""}
            onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            aria-label="Sort Options"
            className="w-full h-11 pl-4 pr-10 rounded-xl bg-[#11092c] hover:bg-[#160b38] border border-white/10 hover:border-purple-500/30 focus:border-purple-500/60 text-white text-xs font-semibold appearance-none outline-none cursor-pointer transition-all shadow-inner"
          >
            <option value="" className="bg-[#0f0826] text-white/50">Sort By (Default)</option>
            <option value="newest" className="bg-[#0f0826] text-white">Newest</option>
            <option value="mostSaved" className="bg-[#0f0826] text-white">Most Saved</option>
          </select>
          <FiChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400 pointer-events-none" />
        </div>

        {/* Clear All Action Button (When active filters exist) */}
        {hasActiveFilters && (
          <div className="w-full md:w-auto shrink-0 flex items-center">
            <button
              type="button"
              onClick={handleDeleteFiltering}
              className="group w-full md:w-auto px-3.5 h-11 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 hover:border-rose-400/60 text-rose-300 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 backdrop-blur-xl shadow-md transition-all duration-200 active:scale-95 cursor-pointer shrink-0"
              title="Reset all filters"
            >
              <span className="w-4 h-4 rounded-md bg-rose-500/20 flex items-center justify-center text-rose-300 group-hover:rotate-90 transition-transform duration-300">
                <IoCloseOutline className="w-3.5 h-3.5" />
              </span>
              <span>Clear All</span>
            </button>
          </div>
        )}
      </div>

      {/* ACTIVE FILTER PILLS BADGES */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 pt-1 px-1 animate-in fade-in duration-300">
          <span className="text-[11px] uppercase font-extrabold tracking-wider text-purple-400 flex items-center gap-1">
            <FiTag className="w-3 h-3 text-purple-400" /> Active Filters:
          </span>

          {searchVal && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-200 text-xs font-medium backdrop-blur-md shadow-sm">
              <span className="opacity-60">Search:</span> &quot;{searchVal}&quot;
              <button
                onClick={() => removeSingleParam("search")}
                className="hover:bg-purple-500/30 rounded-md p-0.5 text-purple-300 hover:text-white transition-colors cursor-pointer"
                title="Remove search filter"
              >
                <FiX className="w-3 h-3" />
              </button>
            </span>
          )}

          {categoryVal && categoryVal !== "all" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-200 text-xs font-medium backdrop-blur-md shadow-sm">
              <span className="opacity-60">Category:</span> {categoryVal.replace("-", " ")}
              <button
                onClick={() => removeSingleParam("category")}
                className="hover:bg-cyan-500/30 rounded-md p-0.5 text-cyan-300 hover:text-white transition-colors cursor-pointer"
                title="Remove category filter"
              >
                <FiX className="w-3 h-3" />
              </button>
            </span>
          )}

          {toneVal && toneVal !== "all" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-pink-500/15 border border-pink-500/30 text-pink-200 text-xs font-medium backdrop-blur-md shadow-sm">
              <span className="opacity-60">Tone:</span> {toneVal}
              <button
                onClick={() => removeSingleParam("emotionalTone")}
                className="hover:bg-pink-500/30 rounded-md p-0.5 text-pink-300 hover:text-white transition-colors cursor-pointer"
                title="Remove tone filter"
              >
                <FiX className="w-3 h-3" />
              </button>
            </span>
          )}

          {sortVal && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-200 text-xs font-medium backdrop-blur-md shadow-sm">
              <span className="opacity-60">Sort:</span> {sortVal}
              <button
                onClick={() => removeSingleParam("sortBy")}
                className="hover:bg-indigo-500/30 rounded-md p-0.5 text-indigo-300 hover:text-white transition-colors cursor-pointer"
                title="Remove sort filter"
              >
                <FiX className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default FilteredLesson;