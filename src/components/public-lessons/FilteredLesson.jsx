"use client";

import { Select, ListBox, Button,  SearchField } from "@heroui/react";
import { FiSliders } from "react-icons/fi";
import { useRouter, useSearchParams } from "next/navigation";

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

        router.push(`?${params.toString()}`);
    };

    return (
        <div className="w-full max-w-7xl mx-auto">
            <form
                onSubmit={handleSubmit}
                className="bg-[#0d071f]/40 border border-white/6 rounded-2xl p-4 backdrop-blur-xl flex flex-col md:flex-row items-center gap-3 shadow-xl w-full"
            >
                {/* 1. Search Input (Takes more space) */}
                <div className="w-full md:flex-1 min-w-70">
                    <SearchField
                    defaultValue={searchParams.get("search") || ""}
                    aria-label="search lessons"
                    name="search">

                        <SearchField.Group>
                            <SearchField.SearchIcon />
                            <SearchField.Input className="w-70" placeholder="Search..." />
                            <SearchField.ClearButton />
                        </SearchField.Group>
                    </SearchField>
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
                <div className="w-full md:w-auto shrink-0">
                    <Button
                        type="submit"
                        className="w-full md:w-28 bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold h-10 rounded-xl flex items-center justify-center gap-2 border border-white/10 transition-all active:scale-[0.98]"
                    >
                        <FiSliders className="w-4 h-4" />
                        <span>Apply</span>
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default FilteredLesson;