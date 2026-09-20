"use client";

import { createLesson, uploadLessonImageToImgBB } from "@/lib/actions/lessons";
import { Button, FieldError, Form, Input, Label, TextArea, TextField, Tooltip } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiUploadCloud, FiTrash2, FiLoader, FiCheckCircle, FiEye, FiChevronDown } from "react-icons/fi";
import { toast } from "sonner";
import LessonCard from "@/components/public-lessons/LessonCard";

const AddLessonForm = ({ user }) => {
  const [lessonImage, setLessonImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const router = useRouter();

  // Live preview form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('personal-growth');
  const [emotionalTone, setEmotionalTone] = useState('motivational');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState('public');
  const [accessLevel, setAccessLevel] = useState('free');

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
      toast.success("Image uploaded successfully!");
    } catch (err) {
      console.error(err.message);
      toast.error("Image upload failed!");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsPublishing(true);

      const formEl = e.currentTarget;
      const formData = new FormData(formEl);
      const formValues = Object.fromEntries(formData.entries());

      const updateFormData = {
        ...formValues,
        status: "Pending",
        isFeatured: false,
        lessonImage: lessonImage,
        creatorId: user?.id,
        creatorName: user?.name,
        creatorEmail: user?.email,
        creatorImage: user?.image
      };

      const result = await createLesson(updateFormData);

      if (result?.insertedId) {
        toast.success("Lesson created successfully!");
        router.push(`/dashboard/my-lessons`);
      }
    } catch (err) {
      console.error(err.message);
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      
      {/* LEFT COLUMN: FORM WRAPPER */}
      <div className="lg:col-span-2 bg-[#0c071e]/80 border border-white/10 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl space-y-6">
        
        {/* Form Header */}
        <div className="border-b border-white/10 pb-5">
          <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
            Create New <span className="text-purple-400">Wisdom Vault Log</span>
          </h2>
          <p className="text-xs text-white/50 mt-1">
            Document your life experiences, technical failures, or core breakthroughs securely.
          </p>
        </div>

        <Form onSubmit={handleSubmit} className="flex flex-col gap-6">
          
          {/* Title Field */}
          <TextField isRequired name="lessonTitle" type="text" className="w-full" isDisabled={isPublishing}>
            <Label className="text-sm font-bold text-white/90 mb-2 block tracking-wide">Lesson Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.g., Production DB Drop & What I Learned"
              className="bg-white/[0.07] hover:bg-white/10 border border-white/10 rounded-xl text-white text-sm transition-colors focus:border-purple-500/50"
            />
            <FieldError className="text-xs text-rose-400 mt-1" />
          </TextField>

          {/* 2-Column Fast Glass Selects */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
            
            {/* Category Select */}
            <div className="w-full space-y-2">
              <Label className="text-sm font-bold text-white/90 block tracking-wide">Category</Label>
              <div className="relative w-full">
                <select
                  required
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  disabled={isPublishing}
                  aria-label="Category"
                  className="w-full h-11 pl-4 pr-10 rounded-xl bg-[#130b32] hover:bg-[#180e3d] border border-white/10 hover:border-purple-500/30 focus:border-purple-500/60 text-white text-sm font-medium appearance-none outline-none cursor-pointer transition-all shadow-inner"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id} className="bg-[#0f0826] text-white py-2">
                      {cat.label}
                    </option>
                  ))}
                </select>
                <FiChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400 pointer-events-none" />
              </div>
            </div>

            {/* Emotional Tone Select */}
            <div className="w-full space-y-2">
              <Label className="text-sm font-bold text-white/90 block tracking-wide">Emotional Tone</Label>
              <div className="relative w-full">
                <select
                  required
                  name="emotionalTone"
                  value={emotionalTone}
                  onChange={(e) => setEmotionalTone(e.target.value)}
                  disabled={isPublishing}
                  aria-label="Emotional Tone"
                  className="w-full h-11 pl-4 pr-10 rounded-xl bg-[#130b32] hover:bg-[#180e3d] border border-white/10 hover:border-purple-500/30 focus:border-purple-500/60 text-white text-sm font-medium appearance-none outline-none cursor-pointer transition-all shadow-inner"
                >
                  {emotionalTones.map((tone) => (
                    <option key={tone.id} value={tone.id} className="bg-[#0f0826] text-white py-2">
                      {tone.label}
                    </option>
                  ))}
                </select>
                <FiChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400 pointer-events-none" />
              </div>
            </div>

          </div>

          {/* Description Textarea */}
          <TextField isRequired className="w-full" isDisabled={isPublishing}>
            <Label className="text-sm font-bold text-white/90 mb-2 block tracking-wide">Detailed Breakdown</Label>
            <TextArea
              aria-label="Detailed notes"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide detailed logs of the incident, retrospective analyses, or architectural adjustments made..."
              rows={5}
              style={{ resize: "vertical" }}
              name="lessonDescription"
              className="bg-white/[0.07] hover:bg-white/10 border border-white/10 rounded-xl text-white text-sm p-3 transition-colors"
            />
            <FieldError className="text-xs text-rose-400 mt-1" />
          </TextField>

          {/* Image Upload Box */}
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-bold text-white/90 block tracking-wide">Visual Context Banner (Optional)</Label>
            <div className={`relative border-2 border-dashed border-white/15 rounded-2xl bg-white/[0.02] h-40 flex flex-col items-center justify-center p-4 transition-all group overflow-hidden ${isPublishing ? "opacity-50 pointer-events-none" : "hover:border-purple-500/50 hover:bg-white/[0.04]"}`}>
              {uploading ? (
                <div className="flex flex-col items-center gap-2 text-purple-400">
                  <FiLoader className="w-7 h-7 animate-spin" />
                  <span className="text-xs font-semibold">Uploading to ImgBB...</span>
                </div>
              ) : lessonImage ? (
                <div className="absolute inset-0 w-full h-full z-10">
                  <Image src={lessonImage} alt="Uploaded Context" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                    <button type="button" onClick={() => setLessonImage('')} className="bg-red-500 hover:bg-red-600 p-2.5 rounded-xl text-white transition-colors active:scale-95 shadow-lg">
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center pointer-events-none space-y-1.5">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 group-hover:text-purple-400 group-hover:bg-purple-500/20 transition-all duration-300">
                    <FiUploadCloud className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-white/90 font-bold">Click to upload banner</p>
                    <p className="text-[10px] text-white/40 mt-0.5">PNG, JPG, WEBP up to 5MB</p>
                  </div>
                </div>
              )}

              {!lessonImage && !uploading && !isPublishing && (
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-20"
                  onChange={handleLessonImageUpload}
                />
              )}
            </div>
          </div>

          {/* Visibility & Access Tier */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full pt-2">
            
            {/* Visibility Select */}
            <div className="w-full space-y-2">
              <Label className="text-sm font-bold text-white/90 block tracking-wide">Visibility</Label>
              <div className="relative w-full">
                <select
                  required
                  name="visibility"
                  value={visibility}
                  onChange={(e) => setVisibility(e.target.value)}
                  disabled={isPublishing}
                  aria-label="Visibility"
                  className="w-full h-11 pl-4 pr-10 rounded-xl bg-[#130b32] hover:bg-[#180e3d] border border-white/10 hover:border-purple-500/30 focus:border-purple-500/60 text-white text-sm font-medium appearance-none outline-none cursor-pointer transition-all shadow-inner"
                >
                  {visibilities.map((v) => (
                    <option key={v.id} value={v.id} className="bg-[#0f0826] text-white py-2">
                      {v.label}
                    </option>
                  ))}
                </select>
                <FiChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400 pointer-events-none" />
              </div>
            </div>

            {/* Access Tier Select */}
            <div className="w-full space-y-2">
              <Tooltip delay={0} isDisabled={isPremiumUser} className="bg-purple-950 text-purple-200 border border-purple-500/30 text-xs px-3 py-1.5 rounded-lg shadow-xl max-w-xs">
                <div className="w-full space-y-2">
                  <Label className="text-sm font-bold text-white/90 tracking-wide flex items-center gap-1.5">
                    Access Tier
                    {!isPremiumUser && <span className="text-[9px] px-1.5 py-0.5 bg-amber-500/20 border border-amber-500/40 text-amber-400 rounded-md font-bold uppercase tracking-wide">Locked</span>}
                  </Label>
                  <div className="relative w-full">
                    <select
                      required
                      name="accessLevel"
                      value={accessLevel}
                      onChange={(e) => setAccessLevel(e.target.value)}
                      disabled={!isPremiumUser || isPublishing}
                      aria-label="Access Tier"
                      className={`w-full h-11 pl-4 pr-10 rounded-xl bg-[#130b32] border border-white/10 text-white text-sm font-medium appearance-none outline-none transition-all shadow-inner ${!isPremiumUser ? 'opacity-40 cursor-not-allowed' : 'hover:bg-[#180e3d] cursor-pointer hover:border-purple-500/30'}`}
                    >
                      {accessLevels.map((level) => (
                        <option key={level.id} value={level.id} className="bg-[#0f0826] text-white py-2">
                          {level.label}
                        </option>
                      ))}
                    </select>
                    <FiChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400 pointer-events-none" />
                  </div>
                  {!isPremiumUser && <input type="hidden" name="accessLevel" value="free" />}
                </div>
                <Tooltip.Content>
                  <p className="font-medium">Upgrade to Premium to monetize your custom lessons.</p>
                </Tooltip.Content>
              </Tooltip>
            </div>

          </div>

          {/* Submit Trigger */}
          <div className="flex items-center justify-end pt-6 border-t border-white/10 mt-2">
            <Button
              type="submit"
              disabled={isPublishing}
              className="px-8 py-3.5 rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white text-sm font-bold transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-purple-500/20 border border-white/20 flex items-center gap-2 cursor-pointer"
            >
              {isPublishing ? (
                <>
                  <span>Publishing Log...</span>
                  <FiLoader className="w-4 h-4 animate-spin" />
                </>
              ) : (
                <>
                  <span>Publish Log</span>
                  <FiCheckCircle className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>

        </Form>
      </div>

      {/* RIGHT COLUMN: REAL-TIME LIVE CARD PREVIEW */}
      <div className="lg:col-span-1 space-y-4 sticky top-28">
        <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-widest bg-purple-500/10 border border-purple-500/20 px-3 py-2 rounded-xl w-fit shadow-md">
          <FiEye className="w-4 h-4 text-purple-400 animate-pulse" />
          <span>Real-time Feed Preview</span>
        </div>

        <div className="transform transition-all duration-300">
          <LessonCard
            lesson={{
              _id: "preview-id",
              lessonTitle: title || "Your Lesson Title Will Appear Here",
              lessonDescription: description || "Detailed logs, retrospectives, or key takeaways written in the form will render here live as a public card...",
              category: category || "personal-growth",
              emotionalTone: emotionalTone || "motivational",
              accessLevel: accessLevel || "free",
              creatorName: user?.name || "Your Name",
              creatorImage: user?.image,
              createdAt: new Date().toISOString(),
              lessonImage: lessonImage
            }}
          />
        </div>
      </div>

    </div>
  );
};

export default AddLessonForm;