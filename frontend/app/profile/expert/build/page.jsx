'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Star, Briefcase, BadgeCheck, 
  ArrowUpRight, MessageSquare, Search, Plus, X,
  User, Image as ImageIcon, IndianRupee, Layers, 
  Award, Zap, CheckCircle2
} from 'lucide-react';
import { Input } from '@/app/components/ui/input';
import { Checkbox } from '@/app/components/ui/checkbox';

const gradients = [
  "from-blue-600 to-violet-600",
  "from-emerald-500 to-teal-600",
  "from-orange-400 to-rose-500",
];

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 }
};

export default function AgentBuilder() {
  const [formData, setFormData] = useState({
    id: 1,
    name: "Alex Rivera",
    avatar: "AR",
    location: "Mumbai, IN",
    rating: "4.9",
    specialty: "Legal Advisor",
    experience: "8+ Years Exp",
    projects: "124",
    reviews: "89",
    price: "4999",
    verified: true,
    available: true,
    tags: ["Contract Law", "IP Rights"],
    tagInput: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Helper for Shadcn UI Checkbox which doesn't use standard e.target
  const handleCheckboxChange = (name, checked) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && formData.tagInput.trim()) {
      e.preventDefault();
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.tagInput.trim()],
        tagInput: ""
      }));
    }
  };

  const removeTag = (index) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-10 mt-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        
        {/* LEFT SIDE: FORM */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Build Your Agent Card</h2>
          
          <div className="space-y-5">
            {/* Name & Avatar */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 z-10" />
                  <Input 
                    name="name" value={formData.name} onChange={handleChange}
                    className="pl-12 h-14 bg-white/50 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 transition-all text-base"
                  />
                </div>
              </div>
              <div className="relative">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Avatar Initials</label>
                <div className="relative">
                  <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 z-10" />
                  <Input 
                    name="avatar" maxLength={2} value={formData.avatar} onChange={handleChange}
                    className="pl-12 h-14 bg-white/50 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 transition-all text-base"
                  />
                </div>
              </div>
            </div>

            {/* Specialty & Location */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Specialty</label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 z-10" />
                  <Input 
                    name="specialty" value={formData.specialty} onChange={handleChange}
                    className="pl-12 h-14 bg-white/50 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 transition-all text-base"
                  />
                </div>
              </div>
              <div className="relative">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 z-10" />
                  <Input 
                    name="location" value={formData.location} onChange={handleChange}
                    className="pl-12 h-14 bg-white/50 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 transition-all text-base"
                  />
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4">
              <div className="relative">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Projects</label>
                <div className="relative">
                  <Layers className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10" />
                  <Input 
                    name="projects" type="number" value={formData.projects} onChange={handleChange}
                    className="pl-10 h-14 bg-white/50 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 transition-all text-base"
                  />
                </div>
              </div>
              <div className="relative">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Price</label>
                <div className="relative">
                  <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10" />
                  <Input 
                    name="price" type="number" value={formData.price} onChange={handleChange}
                    className="pl-10 h-14 bg-white/50 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 transition-all text-base"
                  />
                </div>
              </div>
              <div className="relative">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Rating</label>
                <div className="relative">
                  <Star className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10" />
                  <Input 
                    name="rating" step="0.1" type="number" value={formData.rating} onChange={handleChange}
                    className="pl-10 h-14 bg-white/50 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 transition-all text-base"
                  />
                </div>
              </div>
            </div>

            {/* Tags Input */}
            <div className="relative">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Skills & Tags</label>
              <div className="relative">
                <Plus className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 z-10" />
                <Input 
                  name="tagInput" value={formData.tagInput} onChange={handleChange} onKeyDown={handleAddTag}
                  placeholder="Type skill and press Enter"
                  className="pl-12 h-14 bg-white/50 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 transition-all text-base"
                />
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.tags.map((tag, idx) => (
                  <span key={idx} className="flex items-center gap-1.5 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-xs font-medium border border-blue-100">
                    {tag} <X size={14} className="cursor-pointer hover:text-blue-800" onClick={() => removeTag(idx)} />
                  </span>
                ))}
              </div>
            </div>

            {/* Toggles */}
            <div className="flex flex-col sm:flex-row gap-6 pt-2 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
              <label className="flex items-center gap-3 cursor-pointer group">
                <Checkbox 
                  checked={formData.verified} 
                  onCheckedChange={(val) => handleCheckboxChange('verified', val)} 
                  className="w-5 h-5 rounded-md border-slate-300 data-[state=checked]:bg-blue-600" 
                />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-700 flex items-center gap-1.5">
                    Verified <BadgeCheck className="w-4 h-4 text-blue-500" />
                  </span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-tighter">Display trust badge</span>
                </div>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer group">
                <Checkbox 
                  checked={formData.available} 
                  onCheckedChange={(val) => handleCheckboxChange('available', val)} 
                  className="w-5 h-5 rounded-md border-slate-300 data-[state=checked]:bg-emerald-600" 
                />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-700 flex items-center gap-1.5">
                    Available <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  </span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-tighter">Show online status</span>
                </div>
              </label>
            </div>

            <button className="group w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition-all mt-4 shadow-xl flex items-center justify-center gap-2 overflow-hidden relative">
              <span className="relative z-10">Build Card Now</span>
              <Zap className="w-4 h-4 relative z-10 group-hover:fill-yellow-400 group-hover:text-yellow-400 transition-colors" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>

        {/* RIGHT SIDE: LIVE PREVIEW */}
        <div className="lg:sticky lg:top-10">
          <div className="mb-6 flex items-center gap-3">
             <div className="h-px flex-1 bg-slate-200 lg:block hidden" />
             <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-blue-200">
               Live Preview
             </span>
             <div className="h-px flex-1 bg-slate-200 lg:block hidden" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={JSON.stringify(formData)}
              initial="hidden"
              animate="visible"
              variants={scaleIn}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* YOUR ORIGINAL CARD COMPONENT START */}
              <div className="max-w-[400px] mx-auto group relative rounded-2xl border border-white/50 bg-white/55 backdrop-blur-xl shadow-[0_8px_32px_rgba(59,130,246,0.06)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.12)] hover:border-blue-200/60 hover:-translate-y-1 transition-all duration-500 overflow-hidden">
                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-blue-400 to-sky-400 opacity-0 group-hover:opacity-[0.06] blur-3xl transition-opacity duration-700" />

                <div className="p-6 relative z-10">
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3.5">
                      <div className="relative">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradients[0]} flex items-center justify-center text-white text-lg font-bold shadow-lg`}>
                          {formData.avatar || "AA"}
                        </div>
                        {formData.available && (
                          <div className="absolute -bottom-1 -right-1 w-4.5 h-4.5 bg-emerald-400 border-2 border-white rounded-full" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-[16px] font-semibold text-gray-900 flex items-center gap-1.5">
                          {formData.name || "Untitled Agent"}
                          {formData.verified && <BadgeCheck className="w-4 h-4 text-blue-500" />}
                        </h3>
                        <p className="text-sm text-gray-400 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" /> {formData.location || "Earth"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-semibold text-amber-700">{formData.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 bg-blue-50/80 text-blue-700 text-xs font-medium px-3 py-1.5 rounded-lg">
                      <Briefcase className="w-3 h-3" /> {formData.specialty}
                    </span>
                    <span className="text-xs text-gray-400">{formData.experience}</span>
                  </div>

                  <div className="flex items-center gap-4 mb-5 pb-5 border-b border-gray-100">
                    <div className="text-center flex-1">
                      <div className="text-lg font-bold text-gray-900">{formData.projects}</div>
                      <div className="text-[11px] text-gray-400 uppercase tracking-wide">Projects</div>
                    </div>
                    <div className="w-px h-8 bg-gray-100" />
                    <div className="text-center flex-1">
                      <div className="text-lg font-bold text-gray-900">{formData.reviews}</div>
                      <div className="text-[11px] text-gray-400 uppercase tracking-wide">Reviews</div>
                    </div>
                    <div className="w-px h-8 bg-gray-100" />
                    <div className="text-center flex-1">
                      <div className="text-lg font-bold text-gray-900">₹{formData.price}</div>
                      <div className="text-[11px] text-gray-400 uppercase tracking-wide">Per Project</div>
                    </div>
                  </div>

                  <div className="flex gap-1.5 mb-5 flex-wrap">
                    {formData.tags.map((t) => (
                      <span key={t} className="text-[11px] font-medium text-gray-500 bg-gray-50 px-2.5 py-1 rounded-md">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2.5">
                    <button className="flex-1 bg-gradient-to-r from-blue-600 to-sky-500 text-white py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-1.5 shadow-lg shadow-blue-500/20">
                      Connect <ArrowUpRight className="w-4 h-4" />
                    </button>
                    <button className="w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 bg-white shadow-sm">
                      <MessageSquare className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </div>
              </div>
              {/* YOUR ORIGINAL CARD COMPONENT END */}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}