"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  Button, FieldError, Form, Input, Label, ListBox, 
  Modal, Surface, TextArea, TextField, Select, Tooltip 
} from "@heroui/react";
import { FiCheckCircle, FiEdit3, FiLoader, FiTrash2, FiUploadCloud } from "react-icons/fi";
import { toast } from "sonner";
import { updateLesson, uploadLessonImageToImgBB } from "@/lib/actions/lessons";
import { router } from "better-auth/api";
import { useRouter } from "next/navigation";

// Static options moved outside to prevent re-allocation on every render loop
const CATEGORIES = [
  { id: "personal-growth", label: "Personal Growth" },
  { id: "career", label: "Career" },
  { id: "relationships", label: "Relationships" },
  { id: "mindset", label: "Mindset" },
  { id: "mistakes-learned", label: "Mistakes Learned" },
];

const EMOTIONAL_TONES = [
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

const VISIBILITIES = [
  { id: "public", label: "Public - All users can see" },
  { id: "private", label: "Private - Only you can see" },
];

const ACCESS_LEVELS = [
  { id: "free", label: "Free" },
  { id: "premium", label: "Premium" },
];

export function EditLessonsFormWithModal({ lesson, user }) {
  const [lessonImage, setLessonImage] = useState(lesson.lessonImage || "");
  const [uploading, setUploading] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const router = useRouter();

  const isPremiumUser = user?.isPremium === true;

  const handleLessonImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const url = await uploadLessonImageToImgBB(file);
      setLessonImage(url);
    } catch (err) {
      toast.error(err.message || "Image upload failed!");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsPublishing(true);
      
      const form = e.currentTarget;
      const formData = new FormData(form);
      const formValues = Object.fromEntries(formData.entries());

      const updateFormData = {
        ...formValues,
        lessonImage: lessonImage,
      };

      const result = await updateLesson(lesson._id, updateFormData);
       if(result.modifiedCount > 0){
        toast.success("Lesson updated successfully!")
       router.refresh()
    }
   
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <Modal>
      <Button 
        title="Edit Lesson" 
        size="sm" 
        isIconOnly 
        className="bg-purple-500/10 border border-purple-500/20 text-purple-400 hover:bg-purple-500/20 rounded-xl h-8 w-8 cursor-pointer transition-colors"
      >
        <FiEdit3 className="w-3.5 h-3.5" />
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-2xl bg-[#0f0a24] border border-white/10 rounded-2xl overflow-hidden">
            <Modal.CloseTrigger />
            
            <Modal.Header className="px-6 pt-6 pb-2">
              <Modal.Heading className="text-xl font-bold text-white">Edit Lesson Log</Modal.Heading>
              <p className="mt-1 text-xs leading-5 text-white/50">
                Update details, adjustments, retrospect structures, and the context media properties of your lesson.
              </p>
            </Modal.Header>

            <Modal.Body className="p-6">
              <Surface variant="default" className="bg-transparent border-0 p-0">
                <Form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  
                  {/* Top Row: Fields & Image Upload Split */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                    
                    {/* Left fields side */}
                    <div className="flex flex-col gap-4">
                      {/* Title Field */}
                      <TextField name="lessonTitle" type="text" className="w-full" isDisabled={isPublishing} defaultValue={lesson.lessonTitle}>
                        <Label className="text-xs font-bold text-white/80 mb-1.5 block tracking-wide">Lesson Title</Label>
                        <Input placeholder="E.g., Production DB Drop..." className="bg-white/6 hover:bg-white/9 border border-white/10 rounded-xl text-white text-sm focus:border-purple-500/50" />
                        <FieldError className="text-xs text-rose-400 mt-1" />
                      </TextField>

                      {/* Category Dropdown */}
                      <Select className="w-full" name="category" placeholder="Select a domain" isDisabled={isPublishing} defaultValue={lesson.category}>
                        <Label className="text-xs font-bold text-white/80 mb-1.5 block tracking-wide">Category</Label>
                        <Select.Trigger className="bg-white/6 hover:bg-white/9 border border-white/10 rounded-xl text-white text-sm">
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover className="bg-[#120d2b] border border-white/15 rounded-xl shadow-xl">
                          <ListBox className="text-white/80 p-1">
                            {CATEGORIES.map(cat => (
                              <ListBox.Item key={cat.id} id={cat.id} className="hover:bg-purple-600/40 rounded-lg p-2 text-sm cursor-pointer transition-colors flex items-center justify-between">
                                {cat.label}
                                <ListBox.ItemIndicator className="text-purple-400" />
                              </ListBox.Item>
                            ))}
                          </ListBox>
                        </Select.Popover>
                        <FieldError className="text-xs text-rose-400 mt-1" />
                      </Select>

                      {/* Emotional Tone Dropdown */}
                      <Select className="w-full" name="emotionalTone" placeholder="Core mindset" isDisabled={isPublishing} defaultValue={lesson.emotionalTone}>
                        <Label className="text-xs font-bold text-white/80 mb-1.5 block tracking-wide">Emotional Tone</Label>
                        <Select.Trigger className="bg-white/6 hover:bg-white/9 border border-white/10 rounded-xl text-white text-sm">
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover className="bg-[#120d2b] border border-white/15 rounded-xl shadow-xl">
                          <ListBox className="text-white/80 p-1 max-h-48 overflow-y-auto">
                            {EMOTIONAL_TONES.map(tone => (
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

                    {/* Right Side: Image Banner Container */}
                    <div className="flex flex-col">
                      <Label className="text-xs font-bold text-white/80 mb-1.5 block tracking-wide">Visual Context (Optional)</Label>
                      
                      <div className={`relative border-2 border-dashed border-white/15 rounded-2xl bg-white/3 flex-1 min-h-45 flex flex-col items-center justify-center p-4 transition-all group overflow-hidden ${isPublishing ? "opacity-50 pointer-events-none" : "hover:border-purple-500/50 hover:bg-white/5"}`}>
                        {uploading ? (
                          <div className="flex flex-col items-center gap-2 text-purple-400">
                            <FiLoader className="w-7 h-7 animate-spin" />
                            <span className="text-[11px] font-medium">Uploading to ImgBB...</span>
                          </div>
                        ) : lessonImage ? (
                          <div className="absolute inset-0 w-full h-full z-10">
                            <Image src={lessonImage} alt="Uploaded Context" fill className="object-cover" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                              <button type="button" onClick={() => setLessonImage('')} className="bg-red-500 hover:bg-red-600 p-2.5 rounded-xl text-white transition-colors active:scale-95 shadow-md">
                                <FiTrash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center text-center space-y-2 pointer-events-none">
                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 group-hover:text-purple-400 group-hover:bg-purple-500/20 transition-all duration-300">
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

                  </div>

                  {/* Mid Row: Description Full Width */}
                  <TextField className="w-full" isDisabled={isPublishing} defaultValue={lesson.lessonDescription}>
                    <Label className="text-xs font-bold text-white/80 mb-1.5 block tracking-wide">Detailed Breakdown</Label>
                    <TextArea 
                      aria-label="Detailed notes"
                      placeholder="Provide detailed logs of the incident, retrospective analyses..."
                      rows={4}
                      style={{ resize: "vertical" }}
                      name="lessonDescription"
                      className="bg-white/6 hover:bg-white/9 border border-white/10 rounded-xl text-white text-sm p-3 focus:border-purple-500/50"
                    />
                    <FieldError className="text-xs text-rose-400 mt-1" />
                  </TextField>

                  {/* Bottom Row: Visibility and Locking Tier Constraints */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                    <Select className="w-full" name="visibility" placeholder="Select visibility" isDisabled={isPublishing} defaultValue={lesson.visibility}>
                      <Label className="text-xs font-bold text-white/80 mb-1.5 block tracking-wide">Visibility</Label>
                      <Select.Trigger className="bg-white/6 hover:bg-white/9 border border-white/10 rounded-xl text-white text-sm">
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>
                      <Select.Popover className="bg-[#120d2b] border border-white/15 rounded-xl shadow-xl">
                        <ListBox className="text-white/80 p-1">
                          {VISIBILITIES.map(v => (
                            <ListBox.Item key={v.id} id={v.id} textValue={v.label} className="hover:bg-purple-600/40 rounded-lg p-2 text-sm cursor-pointer transition-colors flex items-center justify-between">
                              {v.label}
                              <ListBox.ItemIndicator className="text-purple-400" />
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                      <FieldError className="text-xs text-rose-400 mt-1" />
                    </Select>

                    <div className="w-full">
                      <Tooltip delay={0} isDisabled={isPremiumUser} className="bg-purple-950 text-purple-200 border border-purple-500/30 text-xs px-3 py-1.5 rounded-lg max-w-xs shadow-2xl">
                        <div className="w-full">
                          <Select
                            defaultValue={lesson.accessLevel || "free"}
                            className="w-full"
                            name="accessLevel"
                            placeholder="Free, open access"
                            isDisabled={!isPremiumUser || isPublishing}
                          >
                            <Label className="text-xs font-bold text-white/80 mb-1.5 tracking-wide flex items-center gap-1.5">
                              Access Tier
                              {!isPremiumUser && <span className="text-[9px] px-1.5 py-0.5 bg-amber-500/20 border border-amber-500/40 text-amber-400 rounded-md font-bold uppercase">Locked</span>}
                            </Label>
                            <Select.Trigger className={`bg-white/6 border border-white/10 rounded-xl text-white text-sm ${!isPremiumUser ? 'opacity-40 cursor-not-allowed' : 'hover:bg-white/9'}`}>
                              <Select.Value />
                              <Select.Indicator />
                            </Select.Trigger>
                            <Select.Popover className="bg-[#120d2b] border border-white/15 rounded-xl shadow-xl">
                              <ListBox className="text-white/80 p-1">
                                {ACCESS_LEVELS.map(level => (
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
                          <p className="font-medium">Upgrade to Premium to restrict and monetize your lessons.</p>
                        </Tooltip.Content>
                      </Tooltip>
                    </div>
                  </div>

                  {/* Submission Row */}
                  <div className="flex items-center justify-end pt-4 border-t border-white/10 mt-2">
                    <Button 
                      slot='close'
                      type="submit" 
                      disabled={isPublishing}
                      className="px-6 py-2.5 rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white text-sm font-bold transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-purple-500/10 cursor-pointer"
                    >
                      {isPublishing ? (
                        <>
                          <span>Updating Log...</span>
                          <FiLoader className="w-4 h-4 animate-spin" />
                        </>
                      ) : (
                        <>
                          <span>Update Log</span>
                          <FiCheckCircle className="w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </div>

                </Form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}