import React, { useState } from 'react';
import { NannyAdvice, NannyProfile } from '../lib/types';
import { motion, AnimatePresence } from 'motion/react';
import { Users, CalendarDays, ArrowLeft, CheckCircle2, User, Star, Clock, Globe, ShieldCheck, Heart, Sparkles } from 'lucide-react';

interface Props {
  advice: NannyAdvice;
  onReset: () => void;
  onBook: (profile: NannyProfile) => void;
}

export function AdviceDisplay({ advice, onReset, onBook }: Props) {
  const [selectedProfile, setSelectedProfile] = useState<NannyProfile | null>(null);

  const handleSelectProfile = (profile: NannyProfile) => {
    setSelectedProfile(profile === selectedProfile ? null : profile);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-8 space-y-12">
      <div className="flex items-center justify-between">
        <button
          onClick={onReset}
          className="flex items-center gap-2 text-brand-dark font-bold hover:underline group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-brand-primary" />
          Modify Search Criteria
        </button>
        <span className="text-[10px] uppercase tracking-widest font-black text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
          AI Verified Selection
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12"
      >
        {/* Profiles Section */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-primary/20 rounded-full text-brand-dark text-xs font-black uppercase tracking-widest mb-3">
                <Users className="w-3 h-3 text-brand-dark" />
                Expert Caregivers
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-brand-dark tracking-tight">Personalized Care Matches</h2>
            </div>
            <p className="text-gray-500 font-medium max-w-sm">
              We've identified {advice.profiles.length} candidates who align with your family's cultural and logistical needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advice.profiles.map((profile, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -5 }}
                className={`relative bg-white p-8 rounded-[40px] shadow-sm border-2 transition-all cursor-pointer flex flex-col ${
                  selectedProfile?.name === profile.name 
                    ? 'border-brand-primary ring-4 ring-brand-primary/5 shadow-xl' 
                    : 'border-gray-100 hover:border-brand-primary/30'
                }`}
                onClick={() => handleSelectProfile(profile)}
              >
                {selectedProfile?.name === profile.name && (
                  <div className="absolute top-4 right-4 bg-brand-primary text-white p-1 rounded-full">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                )}
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-brand-primary rounded-3xl flex items-center justify-center text-brand-dark relative">
                    <User className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif text-brand-dark leading-tight">{profile.name}</h3>
                    <div className="flex items-center gap-1 mt-1 text-emerald-600 font-bold text-sm">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      {profile.experience} Experience
                    </div>
                  </div>
                </div>

                <div className="space-y-4 flex-1">
                  <div className="p-4 bg-gray-50 rounded-2xl space-y-2">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Globe className="w-3 h-3" /> Cultural Alignment
                    </p>
                    <p className="text-xs font-bold text-gray-700 leading-relaxed">{profile.alignment}</p>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 italic">
                      "{profile.bio}"
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {profile.competencies.split(',').slice(0, 3).map((tag, i) => (
                        <span key={i} className="text-[10px] font-bold px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full border border-indigo-100">
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button 
                  className={`mt-8 w-full py-4 rounded-2xl font-black text-sm transition-all ${
                    selectedProfile?.name === profile.name 
                      ? 'bg-brand-primary text-brand-dark shadow-lg shadow-brand-primary/20' 
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {selectedProfile?.name === profile.name ? 'Shortlisted' : 'View Details & Choose'}
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Selected Profile Detail (Conditional) */}
        <AnimatePresence>
          {selectedProfile && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-brand-primary text-brand-dark rounded-[48px] p-10 md:p-16 shadow-2xl relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -mr-32 -mt-32" />
                <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <h2 className="text-5xl font-serif italic text-brand-dark">Why {selectedProfile.name} is a Match</h2>
                      <p className="text-xl text-brand-dark/80 leading-relaxed">
                        {selectedProfile.whyMatch}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="bg-brand-dark/5 p-6 rounded-3xl backdrop-blur-md border border-brand-dark/10">
                        <ShieldCheck className="w-6 h-6 mb-3 text-brand-dark" />
                        <h4 className="font-bold mb-1 text-brand-dark">Safety Checked</h4>
                        <p className="text-xs text-brand-dark/70">Verified certifications and background checks.</p>
                      </div>
                      <div className="bg-brand-dark/5 p-6 rounded-3xl backdrop-blur-md border border-brand-dark/10">
                        <Heart className="w-6 h-6 mb-3 text-brand-dark" />
                        <h4 className="font-bold mb-1 text-brand-dark">Philosophy Sync</h4>
                        <p className="text-xs text-brand-dark/70">Caregiving values align with your family principles.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white text-gray-900 rounded-[40px] p-10 space-y-8">
                    <h3 className="text-2xl font-serif text-brand-dark">Full Competencies</h3>
                    <div className="grid grid-cols-1 gap-4">
                      {selectedProfile.competencies.split(',').map((skill, i) => (
                        <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                          <span className="font-bold text-gray-700">{skill.trim()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Care Plan Section */}
        <section className="bg-white p-8 md:p-12 rounded-[48px] shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 border-b border-gray-100 pb-8 mb-10">
            <div className="p-3 bg-brand-primary text-brand-dark rounded-2xl">
              <CalendarDays className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-4xl font-serif text-brand-dark">Daily Care Blueprint</h2>
              <p className="text-gray-500 font-medium tracking-tight">Structured routine designed for cultural and developmental synchronization.</p>
            </div>
          </div>
          
          <div className="relative space-y-8 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-brand-secondary pb-4">
            {advice.carePlan.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-12 flex flex-col md:flex-row md:items-start gap-4 md:gap-12 group"
              >
                {/* Timeline Node */}
                <div className="absolute left-0 top-1.5 w-10 h-10 bg-white border-4 border-brand-primary rounded-full flex items-center justify-center z-10 group-hover:scale-110 transition-all shadow-sm">
                  <div className="w-2.5 h-2.5 bg-brand-dark rounded-full" />
                </div>

                <div className="w-32 flex-shrink-0 pt-2">
                  <div className="flex items-center gap-2 text-brand-dark font-black text-lg">
                    <Clock className="w-4 h-4 text-brand-primary" />
                    {item.time}
                  </div>
                </div>

                <div className="flex-1 space-y-3 p-6 bg-gray-50 rounded-3xl border border-transparent group-hover:border-brand-primary/10 group-hover:bg-white group-hover:shadow-xl transition-all">
                  <h4 className="text-xl font-bold text-gray-900 tracking-tight">{item.activity}</h4>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-bold ring-1 ring-emerald-100">
                    <Sparkles className="w-3 h-3" />
                    Cultural Note: {item.culturalNote}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </motion.div>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-12">
        <button
          onClick={() => window.print()}
          className="px-10 py-5 bg-gray-900 text-white rounded-full font-black text-lg hover:shadow-2xl transition-all active:scale-95"
        >
          Download PDF Report
        </button>
        {selectedProfile && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => onBook(selectedProfile)}
            className="px-12 py-5 bg-emerald-600 text-white rounded-full font-black text-xl hover:bg-emerald-700 hover:shadow-[0_20px_40px_-10px_rgba(5,150,105,0.4)] transition-all flex items-center gap-3"
          >
            Finalize & Book {selectedProfile.name.split(' ')[0]}
            <CheckCircle2 className="w-6 h-6" />
          </motion.button>
        )}
      </div>
    </div>
  );
}
