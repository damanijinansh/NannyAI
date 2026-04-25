import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Calendar, Clock, User, Heart, ShieldCheck, Sparkles, ArrowLeft } from 'lucide-react';
import { NannyProfile, CarePlanItem, FamilyInputs } from '../lib/types';

interface Props {
  profile: NannyProfile;
  carePlan: CarePlanItem[];
  inputs: FamilyInputs;
  onBack: () => void;
}

export function BookingConfirmation({ profile, carePlan, inputs, onBack }: Props) {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8 space-y-12 pb-24">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 font-bold hover:text-brand-dark transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform text-brand-primary" />
        Back to Results
      </button>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-[30px] flex items-center justify-center mx-auto shadow-xl shadow-emerald-100">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-serif text-brand-dark leading-tight">Booking Requested!</h1>
          <p className="text-xl text-gray-500 font-medium">Your heritage care consultation with {profile.name} is being processed.</p>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          {/* Summary Card */}
          <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-100 space-y-8">
            <h2 className="text-2xl font-serif text-brand-dark border-b border-gray-100 pb-4">Care Summary</h2>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-primary/20 rounded-2xl text-brand-dark">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Start Date</p>
                  <p className="text-lg font-bold text-gray-800">{inputs.date}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-primary/20 rounded-2xl text-brand-dark">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Shift Hours</p>
                  <p className="text-lg font-bold text-gray-800">{inputs.time} - {inputs.endTime}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-primary/20 rounded-2xl text-brand-dark">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Culture focus</p>
                  <p className="text-lg font-bold text-gray-800">{inputs.languages}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-primary/20 rounded-2xl text-brand-dark">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Safety Level</p>
                  <p className="text-lg font-bold text-emerald-600">Enterprise Verified</p>
                </div>
              </div>
            </div>
          </div>

          {/* Care Plan Snippet */}
          <div className="bg-brand-primary text-brand-dark rounded-[40px] p-8 space-y-6 shadow-xl shadow-brand-primary/10">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6" />
              <h3 className="text-xl font-serif">Daily Plan Finalized</h3>
            </div>
            <div className="space-y-4">
              {carePlan.slice(0, 3).map((item, i) => (
                <div key={i} className="flex gap-4 items-center bg-white/40 p-4 rounded-2xl border border-white/50">
                  <span className="font-black text-sm">{item.time}</span>
                  <span className="text-sm font-medium">{item.activity}</span>
                </div>
              ))}
              <p className="text-xs text-brand-dark/60 italic font-bold">+ {carePlan.length - 3} more scheduled activities</p>
            </div>
          </div>
        </div>

        {/* Nanny Sidebar */}
        <div className="space-y-8">
          <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 text-center space-y-4">
            <div className="w-20 h-20 bg-brand-primary rounded-full flex items-center justify-center mx-auto text-brand-dark">
              <User className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-xl font-serif text-brand-dark">{profile.name}</h3>
              <p className="text-xs font-bold text-gray-400">{profile.experience} Exp.</p>
            </div>
            <div className="pt-4 border-t border-gray-50">
              <p className="text-xs text-gray-500 leading-relaxed italic">
                "{profile.bio.substring(0, 80)}..."
              </p>
            </div>
          </div>

          <button 
            className="w-full py-5 bg-gray-900 text-white rounded-2xl font-black shadow-xl hover:shadow-2xl transition-all"
            onClick={() => window.print()}
          >
            Download Final Receipt
          </button>
        </div>
      </div>
    </div>
  );
}
