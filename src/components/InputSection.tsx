import React, { useState } from 'react';
import { FamilyInputs } from '../lib/types';
import { Baby, Calendar, ShieldCheck, Languages, Utensils, Heart, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface Props {
  onSubmit: (inputs: FamilyInputs) => void;
  isLoading: boolean;
}

export function InputSection({ onSubmit, isLoading }: Props) {
  const [inputs, setInputs] = useState<FamilyInputs>({
    childAge: 'Infant',
    date: '2026-05-01',
    time: '08:00',
    endTime: '17:00',
    safetyRequirements: 'CPR/First Aid certification, minimum 5 years experience with infants.',
    languages: 'Hindi, Gujarati',
    dietaryHabits: 'Strictly Vegetarian, traditional Sattvic diet preferred.',
    caregivingStyle: 'Attachment parenting with a focus on Montessori-style independent play.',
    coreValuesSkills: 'Emphasis on preserving Gujarati heritage and folk songs.',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(inputs);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-6 md:p-8 space-y-8"
    >
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-serif text-brand-dark tracking-tight">Indian Heritage Care Portal</h2>
        <p className="text-gray-600 max-w-2xl mx-auto font-medium">
          Advanced matching for families seeking culturally aligned, linguistically expert caregivers from the Indian subcontinent.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-[32px] card-shadow border border-gray-100">
        <div className="md:col-span-2 border-b border-gray-100 pb-4 mb-2">
          <h3 className="font-serif text-xl flex items-center gap-2 text-brand-dark">
            <Calendar className="w-5 h-5 text-brand-primary" /> Logistical Requirements
          </h3>
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest font-bold text-gray-400 flex items-center gap-2 ml-1">
            <Baby className="w-4 h-4 text-brand-primary" /> Age Category
          </label>
          <select
            name="childAge"
            value={inputs.childAge}
            onChange={handleChange}
            className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary outline-hidden transition-all font-bold text-gray-700"
            required
          >
            <option value="Infant">Infant (0 - 11 months)</option>
            <option value="Toddler">Toddler (1 - 3 years)</option>
            <option value="Preschool">Preschool (4 - 5 years)</option>
            <option value="School Age">School Age (6 - 10 years)</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest font-bold text-gray-400 flex items-center gap-2 ml-1">
            <Calendar className="w-4 h-4 text-brand-primary" /> Start Date
          </label>
          <input
            type="date"
            name="date"
            value={inputs.date}
            onChange={handleChange}
            className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary outline-hidden transition-all font-bold text-gray-700"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest font-bold text-gray-400 flex items-center gap-2 ml-1">
            <Sparkles className="w-4 h-4 text-brand-primary" /> Preferred Start Time
          </label>
          <select
            name="time"
            value={inputs.time}
            onChange={handleChange}
            className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary outline-hidden transition-all font-bold text-gray-700"
            required
          >
            {Array.from({ length: 24 }).map((_, i) => {
              const hour = i.toString().padStart(2, '0');
              return (
                <option key={hour} value={`${hour}:00`}>
                  {hour}:00
                </option>
              );
            })}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest font-bold text-gray-400 flex items-center gap-2 ml-1">
            <Calendar className="w-4 h-4 text-brand-primary" /> Preferred End Time
          </label>
          <select
            name="endTime"
            value={inputs.endTime}
            onChange={handleChange}
            className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary outline-hidden transition-all font-bold text-gray-700"
            required
          >
            {Array.from({ length: 24 }).map((_, i) => {
              const hour = i.toString().padStart(2, '0');
              return (
                <option key={hour} value={`${hour}:00`}>
                  {hour}:00
                </option>
              );
            })}
          </select>
        </div>

        <div className="md:col-span-2 space-y-2">
          <label className="text-xs uppercase tracking-widest font-bold text-gray-400 flex items-center gap-2 ml-1">
            <ShieldCheck className="w-4 h-4 text-brand-primary" /> Safety/Experience Non-Negotiables
          </label>
          <textarea
            name="safetyRequirements"
            value={inputs.safetyRequirements}
            onChange={handleChange}
            className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary outline-hidden transition-all min-h-[100px] font-bold text-gray-700"
            placeholder="e.g. CPR certified, experienced with newborn safety"
            required
          />
        </div>

        <div className="md:col-span-2 border-b border-gray-100 pb-4 mt-4 mb-2">
          <h3 className="font-serif text-xl flex items-center gap-2 text-brand-dark">
            <Sparkles className="w-5 h-5 text-brand-primary" /> Indian Subcontinent Cultural Focus
          </h3>
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest font-bold text-gray-400 flex items-center gap-2 ml-1">
            <Languages className="w-4 h-4 text-brand-primary" /> Indian Languages Desired
          </label>
          <input
            name="languages"
            value={inputs.languages}
            onChange={handleChange}
            className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary outline-hidden transition-all font-bold text-gray-700"
            placeholder="e.g. Hindi, Tamil, Telugu, Marathi"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest font-bold text-gray-400 flex items-center gap-2 ml-1">
            <Utensils className="w-4 h-4 text-brand-primary" /> Dietary Habits/Restrictions
          </label>
          <input
            name="dietaryHabits"
            value={inputs.dietaryHabits}
            onChange={handleChange}
            className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary outline-hidden transition-all font-bold text-gray-700"
            placeholder="e.g. Pure Veg, Jain, Halal"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest font-bold text-gray-400 flex items-center gap-2 ml-1">
            <Heart className="w-4 h-4 text-brand-primary" /> Caregiving Philosophy
          </label>
          <input
            name="caregivingStyle"
            value={inputs.caregivingStyle}
            onChange={handleChange}
            className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary outline-hidden transition-all font-bold text-gray-700"
            placeholder="e.g. Traditional Indian values, Modern Montessori"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest font-bold text-gray-400 flex items-center gap-2 ml-1">
            <Sparkles className="w-4 h-4 text-brand-primary" /> Heritage Skills Desired
          </label>
          <input
            name="coreValuesSkills"
            value={inputs.coreValuesSkills}
            onChange={handleChange}
            className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary outline-hidden transition-all font-bold text-gray-700"
            placeholder="e.g. Classical music, Folklore storytelling"
            required
          />
        </div>

        <div className="md:col-span-2 pt-6">
          <button
            type="submit"
            disabled={isLoading}
            className={cn(
              "w-full py-4 rounded-full font-semibold transition-all flex items-center justify-center gap-2 shadow-lg",
              isLoading 
                ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                : "bg-brand-primary text-brand-dark font-black hover:bg-brand-primary/90 active:scale-[0.98]"
            )}
          >
            {isLoading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-5 h-5 border-2 border-brand-dark/30 border-t-brand-dark rounded-full"
                />
                Consulting Expert Advisor...
              </>
            ) : (
              <>
                Generate Expert Matching Analysis
                <Sparkles className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
