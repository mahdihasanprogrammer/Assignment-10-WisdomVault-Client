"use client";

import { uploadLessonImageToImgBB } from "@/lib/actions/lessons";
import { Button, FieldError, Form, Input, Label, TextArea, TextField, Select, ListBox, Tooltip } from "@heroui/react";
import Image from "next/image";
import { useState } from "react";
import { FiUploadCloud, FiTrash2, FiLoader, FiCheckCircle } from "react-icons/fi";

const AddLessonForm = ({ user }) => {
    const [lessonImage, setLessonImage] = useState('');
    const [uploading, setUploading] = useState(false);

    const categories = [
        { id: "personal-growth", label: "Personal Growth" },
        { id: "career", label: "Career" },
        { id: "relationships", label: "Relationships" },
        { id: "mindset", label: "Mindset" },
        { id: "mistakes-learned", label: "Mistakes Learned" },
    ];
    
    const emotionalTones = [
        { id: "motivational", label: "Motivational" },
        { id: "sad", label: "Sad" },
        { id: "realization", label: "Realization" },
        { id: "gratitude", label: "Gratitude" },
        { id: "hopeful", label: "Hopeful" },
        { id: "inspirational", label: "Inspirational" },
        { id: "reflective", label: "Reflective" },
        { id: "encouraging", label: "Encouraging" },
        { id: "heartfelt", label: "Heartfelt" },
        { id: "uplifting", label: "Uplifting" },
    ];
    
    const visibilities = [
        { id: "public", label: "Public - All users can see" },
        { id: "private", label: "Private - Only you can see" },
    ];
    
    const accessLevels = [
        { id: "free", label: "Free" },
        { id: "premium", label: "Premium" },
    ];

    const isPremiumUser = user?.isPremium === true;

    const handleLessonImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setUploading(true);
            const url = await uploadLessonImageToImgBB(file);
            setLessonImage(url);
        } catch (err) {
            console.log(err.message);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const form = new FormData(e.currentTarget);
            const formData = Object.fromEntries(form.entries());
            console.log('formdata', { ...formData, lessonImage });
        } catch (err) {
            console.log(err.message || 'something went wrong');
        }
    };

    return (
        <div className="max-w-4xl w-full mx-auto bg-white/4 border border-white/15 backdrop-blur-2xl rounded-3xl p-6 md:p-10 shadow-2xl shadow-black/40">
            {/* Form Header */}
            <div className="mb-8 border-b border-white/10 pb-5">
                <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
                    Create New <span className="text-purple-400">Wisdom Vault Logs</span>
                </h2>
                <p className="text-xs text-white/50 mt-1">
                    Document your life experiences, technical failures, or core breakthroughs securely.
                </p>
            </div>

            <Form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                {/* 2-Column Responsive Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    
                    {/* Left Columns Container */}
                    <div className="flex flex-col gap-5">
                        {/* Title Field */}
                        <TextField isRequired name="lessonTitle" type="text" className="w-full">
                            <Label className="text-sm font-bold text-white/90 mb-2 block tracking-wide">Lesson Title</Label>
                            <Input placeholder="E.g., Production DB Drop & What I Learned" className="bg-white/[0.07] hover:bg-white/1 border border-white/10 rounded-xl text-white text-sm transition-colors focus:border-purple-500/50" />
                            <FieldError className="text-xs text-rose-400 mt-1" />
                        </TextField>

                        {/* Category Dropdown */}
                        <Select isRequired className="w-full" name="category" placeholder="Select a domain">
                            <Label className="text-sm font-bold text-white/90 mb-2 block tracking-wide">Category</Label>
                            <Select.Trigger className="bg-white/[0.07] hover:bg-white/1 border border-white/10 rounded-xl text-white text-sm transition-colors">
                                <Select.Value />
                                <Select.Indicator />
                            </Select.Trigger>
                            <Select.Popover className="bg-[#120d2b] border border-white/15 rounded-xl shadow-xl">
                                <ListBox className="text-white/80 p-1">
                                    {categories.map(category => (
                                        <ListBox.Item key={category.id} id={category.id} textValue={category.label} className="hover:bg-purple-600/40 rounded-lg p-2 text-sm cursor-pointer transition-colors flex items-center justify-between">
                                            {category.label}
                                            <ListBox.ItemIndicator className="text-purple-400" />
                                        </ListBox.Item>
                                    ))}
                                </ListBox>
                            </Select.Popover>
                            <FieldError className="text-xs text-rose-400 mt-1" />
                        </Select>

                        {/* Emotional Tone Dropdown */}
                        <Select isRequired className="w-full" name="emotionalTone" placeholder="Core mindset during event">
                            <Label className="text-sm font-bold text-white/90 mb-2 block tracking-wide">Emotional Tone</Label>
                            <Select.Trigger className="bg-white/[0.07] hover:bg-white/1 border border-white/10 rounded-xl text-white text-sm transition-colors">
                                <Select.Value />
                                <Select.Indicator />
                            </Select.Trigger>
                            <Select.Popover className="bg-[#120d2b] border border-white/15 rounded-xl shadow-xl">
                                <ListBox className="text-white/80 p-1 max-h-60 overflow-y-auto">
                                    {emotionalTones.map(tone => (
                                        <ListBox.Item key={tone.id} id={tone.id} textValue={tone.label} className="hover:bg-purple-600/40 rounded-lg p-2 text-sm cursor-pointer transition-colors flex items-center justify-between">
                                            {tone.label}
                                            <ListBox.ItemIndicator className="text-purple-400" />
                                        </ListBox.Item>
                                    ))}
                                </ListBox>
                            </Select.Popover>
                            <FieldError className="text-xs text-rose-400 mt-1" />
                        </Select>
                    </div>

                    {/* Right Columns Container: Image Upload Box */}
                    <div className="flex flex-col h-full justify-between">
                        <Label className="text-sm font-bold text-white/90 mb-2 block tracking-wide">Visual Context (Optional)</Label>
                        
                        <div className="relative border-2 border-dashed border-white/15 hover:border-purple-500/50 rounded-2xl bg-white/2 hover:bg-white/4 h-full min-h-45 flex flex-col items-center justify-center p-4 transition-all group overflow-hidden">
                            {uploading ? (
                                <div className="flex flex-col items-center gap-2 text-purple-400">
                                    <FiLoader className="w-8 h-8 animate-spin" />
                                    <span className="text-xs font-semibold">Uploading to ImgBB...</span>
                                </div>
                            ) : lessonImage ? (
                                <div className="absolute inset-0 w-full h-full z-10">
                                    <Image src={lessonImage} alt="Uploaded Context" fill className="object-cover" />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                                        <button type="button" onClick={() => setLessonImage('')} className="bg-red-500 hover:bg-red-600 p-3 rounded-xl text-white transition-colors active:scale-95 shadow-lg shadow-black/40">
                                            <FiTrash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center text-center pointer-events-none space-y-2">
                                    <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 group-hover:text-purple-400 group-hover:bg-purple-500/20 transition-all duration-300">
                                        <FiUploadCloud className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-white/90 font-bold">Click to upload banner</p>
                                        <p className="text-[10px] text-white/40 mt-0.5">Supports PNG, JPG, WEBP up to 5MB</p>
                                    </div>
                                </div>
                            )}
                            
                            {!lessonImage && !uploading && (
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-20"
                                    onChange={handleLessonImageUpload}
                                />
                            )}
                        </div>
                    </div>
                </div>

                {/* Full Width Row: Description Textarea */}
                <TextField isRequired className="w-full">
                    <Label className="text-sm font-bold text-white/90 mb-2 block tracking-wide">Detailed Breakdown</Label>
                    <TextArea 
                        aria-label="Detailed notes"
                        placeholder="Provide detailed logs of the incident, retrospective analyses, or architectural adjustments made..."
                        rows={5}
                        style={{ resize: "vertical" }}
                        name="lessonDescription"
                        className="bg-white/[0.07] hover:bg-white/1 border border-white/10 rounded-xl text-white text-sm p-3 transition-colors"
                    />
                    <FieldError className="text-xs text-rose-400 mt-1" />
                </TextField>

                {/* Visibility and Subscription Constraints Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full pt-2">
                    {/* Visibility */}
                    <Select isRequired className="w-full" name="visibility" placeholder="Select access view">
                        <Label className="text-sm font-bold text-white/90 mb-2 block tracking-wide">Visibility</Label>
                        <Select.Trigger className="bg-white/[0.07] hover:bg-white/1 border border-white/10 rounded-xl text-white text-sm transition-colors">
                            <Select.Value />
                            <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover className="bg-[#120d2b] border border-white/15 rounded-xl shadow-xl">
                            <ListBox className="text-white/80 p-1">
                                {visibilities.map((visibility) => (
                                    <ListBox.Item key={visibility.id} id={visibility.id} textValue={visibility.label} className="hover:bg-purple-600/40 rounded-lg p-2 text-sm cursor-pointer transition-colors flex items-center justify-between">
                                        {visibility.label}
                                        <ListBox.ItemIndicator className="text-purple-400" />
                                    </ListBox.Item>
                                ))}
                            </ListBox>
                        </Select.Popover>
                        <FieldError className="text-xs text-rose-400 mt-1" />
                    </Select>

                    {/* Access Level (Premium Check) */}
                    <div className="w-full">
                        <Tooltip delay={0} isDisabled={isPremiumUser} className="bg-purple-950 text-purple-200 border border-purple-500/30 text-xs px-3 py-1.5 rounded-lg shadow-xl max-w-xs">
                            <div className="w-full">
                                <Select
                                    isRequired
                                    className="w-full"
                                    name="accessLevel"
                                    placeholder="Free, visible to all users"
                                    defaultSelectedKeys={["free"]}
                                    isDisabled={!isPremiumUser}
                                >
                                    <Label className="text-sm font-bold text-white/90 mb-2 tracking-wide flex items-center gap-1.5">
                                        Access Tier
                                        {!isPremiumUser && <span className="text-[9px] px-1.5 py-0.5 bg-amber-500/20 border border-amber-500/40 text-amber-400 rounded-md font-bold uppercase tracking-wide">Locked</span>}
                                    </Label>
                                    <Select.Trigger className={`bg-white/[0.07] border border-white/10 rounded-xl text-white text-sm transition-colors ${!isPremiumUser ? 'opacity-40 cursor-not-allowed' : 'hover:bg-white/1'}`}>
                                        <Select.Value />
                                        <Select.Indicator />
                                    </Select.Trigger>
                                    <Select.Popover className="bg-[#120d2b] border border-white/15 rounded-xl shadow-xl">
                                        <ListBox className="text-white/80 p-1">
                                            {accessLevels.map((level) => (
                                                <ListBox.Item key={level.id} id={level.id} textValue={level.label} className="hover:bg-purple-600/40 rounded-lg p-2 text-sm cursor-pointer transition-colors flex items-center justify-between">
                                                    {level.label}
                                                    <ListBox.ItemIndicator className="text-purple-400" />
                                                </ListBox.Item>
                                            ))}
                                        </ListBox>
                                    </Select.Popover>
                                    <FieldError className="text-xs text-rose-400 mt-1" />
                                </Select>
                                {!isPremiumUser && <input type="hidden" name="accessLevel" value="free" />}
                            </div>
                            <Tooltip.Content>
                                <p className="font-medium">Upgrade to Premium to monetize your custom lessons.</p>
                            </Tooltip.Content>
                        </Tooltip>
                    </div>
                </div>

                {/* Main Publish Button Only */}
                <div className="flex items-center justify-end pt-6 border-t border-white/10 mt-2">
                    <Button 
                        type="submit" 
                        className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white text-sm font-bold transition-all active:scale-[0.98] shadow-xl shadow-purple-500/20 border border-white/20 flex items-center gap-2 cursor-pointer"
                    >
                        <span>Publish Log</span>
                        <FiCheckCircle className="w-4 h-4" />
                    </Button>
                </div>

            </Form>
        </div>
    );
};

export default AddLessonForm;