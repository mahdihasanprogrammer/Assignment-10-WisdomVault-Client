"use client";

import { Select, ListBox, Button } from "@heroui/react";
import { FiSliders, FiSearch, FiX } from "react-icons/fi";
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const search = formData.get("search");
        const category = formData.get("category");
        const emotionalTone = formData.get("emotionalTone");
        const sortBy = formData.get("sortBy");

        const params = new URLSearchParams(searchParams.toString());
        if (search) params.set("search", search);
        if (category !== "all") params.set("category", category);
        if (emotionalTone !== "all") params.set("emotionalTone", emotionalTone);
        if (sortBy) params.set("sortBy", sortBy);

        console.log('params', params)
        router.push(`?${params.toString()}`);
    };
    const handleDeleteFiltering = () => {
        router.push('?')

    }

    return (
        <div className="w-full max-w-7xl mx-auto">
            <form
                onSubmit={handleSubmit}
                className="bg-[#0d071f]/40 border border-white/6 rounded-2xl p-4 backdrop-blur-xl flex flex-col md:flex-row items-center gap-3 shadow-xl w-full"
            >
                {/* 1. Search Input — Custom Glassmorphic Design */}
                <div className="w-full md:flex-1 relative group">
                    {/* Search Icon */}
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-focus-within:bg-purple-500/20 group-focus-within:border-purple-500/40 group-focus-within:text-purple-300 transition-all duration-300 pointer-events-none">
                        <FiSearch className="w-3.5 h-3.5" />
                    </div>

                    {/* Native Input */}
                    <input
                        type="text"
                        name="search"
                        defaultValue={searchParams.get("search") || ""}
                        placeholder="Search lessons, topics, or authors..."
                        aria-label="Search lessons"
                        className="w-full h-11 pl-14 pr-4 rounded-xl bg-[#0d071f]/70 hover:bg-[#110930]/80 border border-white/8 hover:border-purple-500/30 focus:border-purple-500/60 focus:bg-[#110930] text-white placeholder-white/30 text-sm font-medium outline-none transition-all duration-300 shadow-inner"
                    />
                </div>

                {/* 2. Filter by Category */}
                <div className="w-full md:w-44 shrink-0">
                    <Select
                        name="category"
                        placeholder="Category"
                        defaultValue={searchParams.get("category") || "all"}
                        className="w-full"
                        aria-label="Filter by Category"
                    >
                        <Select.Trigger className="bg-[#11092c] border border-white/6 text-white rounded-xl">
                            <Select.Value />
                            <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover className="bg-[#0f0826] border border-white/10 rounded-xl text-white">
                            <ListBox>
                                {categories.map((cat) => (
                                    <ListBox.Item key={cat.id} id={cat.id} textValue={cat.label} className="hover:bg-purple-600/20 rounded-lg">
                                        {cat.label}
                                    </ListBox.Item>
                                ))}
                            </ListBox>
                        </Select.Popover>
                    </Select>
                </div>

                {/* 3. Filter by Emotional Tone */}
                <div className="w-full md:w-44 shrink-0">
                    <Select
                        name="emotionalTone"
                        placeholder="Emotional Tone"
                        defaultValue={searchParams.get("emotionalTone") || "all"}
                        className="w-full"
                        aria-label="Filter by Emotional Tone"
                    >
                        <Select.Trigger className="bg-[#11092c] border border-white/6 text-white rounded-xl">
                            <Select.Value />
                            <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover className="bg-[#0f0826] border border-white/10 rounded-xl text-white">
                            <ListBox>
                                {emotionalTones.map((tone) => (
                                    <ListBox.Item key={tone.id} id={tone.id} textValue={tone.label} className="hover:bg-purple-600/20 rounded-lg">
                                        {tone.label}
                                    </ListBox.Item>
                                ))}
                            </ListBox>
                        </Select.Popover>
                    </Select>
                </div>

                {/* 4. Sort Options */}
                <div className="w-full md:w-44 shrink-0">
                    <Select
                        name="sortBy"
                        placeholder="Sort By"
                        aria-label="Sort Options"
                        defaultValue={searchParams.get("sortBy") ? [searchParams.get("sortBy")] : []}
                        className="w-full"
                    >
                        <Select.Trigger className="bg-[#11092c] border border-white/6 text-white rounded-xl">
                            <Select.Value />
                            <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover className="bg-[#0f0826] border border-white/10 rounded-xl text-white">
                            <ListBox>
                                <ListBox.Item id="newest" textValue="Newest" className="hover:bg-purple-600/20 rounded-lg">Newest</ListBox.Item>
                                <ListBox.Item id="mostSaved" textValue="Most Saved" className="hover:bg-purple-600/20 rounded-lg">Most Saved</ListBox.Item>
                            </ListBox>
                        </Select.Popover>
                    </Select>
                </div>

                {/* 5. Submit Action Button */}
                <div className="w-full md:w-auto shrink-0 flex items-center gap-2">
                    <Button
                        type="submit"
                        className="w-full md:w-28 bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold h-10 rounded-xl flex items-center justify-center gap-2 border border-white/10 transition-all active:scale-[0.98]"
                    >
                        <FiSliders className="w-4 h-4" />
                        <span>Apply</span>
                    </Button>

                    {searchParams.size > 0 && (
                        <button
                            type="button"
                            onClick={handleDeleteFiltering}
                            className="group w-full md:w-auto px-3.5 h-10 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 hover:border-rose-400/60 text-rose-300 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 backdrop-blur-xl shadow-md transition-all duration-200 active:scale-95 cursor-pointer shrink-0"
                            title="Reset all filters"
                        >
                            <span className="w-4 h-4 rounded-md bg-rose-500/20 flex items-center justify-center text-rose-300 group-hover:rotate-90 transition-transform duration-300">
                                <IoCloseOutline className="w-3.5 h-3.5" />
                            </span>
                            <span>Clear</span>
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default FilteredLesson;