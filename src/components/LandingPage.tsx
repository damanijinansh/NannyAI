import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Globe, ShieldCheck, ArrowRight, Baby, Users, Star } from 'lucide-react';
import { cn } from '../lib/utils';

interface Props {
  onStart: () => void;
}

export function LandingPage({ onStart }: Props) {
  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 md:pt-32 md:pb-48">
        <div className="absolute inset-x-0 top-0 h-96 bg-brand-secondary/30 -z-10 blur-3xl opacity-50" />
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/20 rounded-full text-brand-dark font-bold text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Culturally Intelligent Childcare</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif text-brand-dark leading-tight">
              Where Global <span className="italic">Heritage</span> Meets Local <span className="italic">Heart</span>.
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              NannyMatch AI isn't just a directory. It's a bridge. We match your family with care experts who share your language, values, and traditions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onStart}
                className="px-10 py-5 bg-brand-primary text-brand-dark rounded-full font-bold text-lg hover:bg-brand-primary/90 transition-all shadow-xl shadow-brand-primary/20 flex items-center justify-center gap-2 group"
              >
                Begin Your Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-10 py-5 bg-gray-50 text-gray-700 rounded-full font-bold text-lg hover:bg-gray-100 transition-all">
                Our Methodology
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="bg-brand-secondary py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-serif text-brand-dark">The NannyMatch Story</h2>
              <div className="w-20 h-1 bg-brand-primary" />
              <p className="text-lg text-gray-700 leading-relaxed">
                Founded on the belief that childcare is the most intimate form of service, we realized that standard matchmaking was missing the soul. Families aren't just looking for "help"—they are looking for someone who reinforces the cultural fabric of their home.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our founders, a team of educators and cultural anthropologists, built NannyMatch AI to decode the nuances of background, language, and philosophy, ensuring every child grows up with a mirror of their heritage and a window to the world.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm transform translate-y-8">
                <Globe className="w-10 h-10 text-brand-dark mb-4" />
                <h4 className="font-bold text-xl mb-2 text-brand-dark">50+ Languages</h4>
                <p className="text-sm text-gray-500">Bilingual immersive care for early language development.</p>
              </div>
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm">
                <ShieldCheck className="w-10 h-10 text-brand-dark mb-4" />
                <h4 className="font-bold text-xl mb-2 text-brand-dark">Elite Vetting</h4>
                <p className="text-sm text-gray-500">Beyond background checks: deep experience verification.</p>
              </div>
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm transform translate-y-8">
                <Users className="w-10 h-10 text-brand-dark mb-4" />
                <h4 className="font-bold text-xl mb-2 text-brand-dark">Cultural Fit</h4>
                <p className="text-sm text-gray-500">Matching with caregivers who share your family values.</p>
              </div>
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm">
                <Baby className="w-10 h-10 text-brand-dark mb-4" />
                <h4 className="font-bold text-xl mb-2 text-brand-dark">Child First</h4>
                <p className="text-sm text-gray-500">Pedagogical alignment from Montessori to RIE.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diversity & Values Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-16">
          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="text-4xl md:text-5xl font-serif text-brand-dark">Our Values are Global</h2>
            <p className="text-xl text-gray-600">We celebrate the diversity of parenting styles and cultural traditions that make every home unique.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Inclusivity by Design",
                desc: "We actively source and support caregivers from diverse ethnic, religious, and cultural backgrounds.",
                icon: <Globe className="w-6 h-6" />
              },
              {
                title: "Legacy Preservation",
                desc: "We prioritize matching families with caregivers who can sustain their native language and traditions.",
                icon: <Heart className="w-6 h-6" />
              },
              {
                title: "Expertise & Empathy",
                desc: "We balance high-level childcare certifications with the warmth and emotional intelligence your child deserves.",
                icon: <Star className="w-6 h-6" />
              }
            ].map((value, i) => (
              <div key={i} className="group p-10 border border-gray-100 rounded-[3rem] hover:bg-brand-primary hover:text-brand-dark transition-all duration-500 text-left">
                <div className="bg-brand-secondary group-hover:bg-white/40 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors">
                  <div className="text-brand-dark">
                    {value.icon}
                  </div>
                </div>
                <h4 className="text-2xl font-bold mb-4 tracking-tight text-brand-dark">{value.title}</h4>
                <p className="text-gray-500 group-hover:text-brand-dark/80 leading-relaxed font-medium">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Banner */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-around items-center gap-12 opacity-50 grayscale invert">
           <span className="text-2xl font-black italic">VOGUE</span>
           <span className="text-2xl font-black italic">Parenting</span>
           <span className="text-2xl font-black italic">Forbes</span>
           <span className="text-2xl font-black italic">NYT</span>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-brand-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent)]" />
        <div className="max-w-4xl mx-auto px-6 text-center space-y-10 relative z-10">
          <h2 className="text-5xl md:text-6xl font-serif text-brand-dark">Your Perfect Care Match Awaits.</h2>
          <p className="text-xl text-brand-dark/80 max-w-2xl mx-auto">
            Ready to find the caregiver who resonates with your family's story? Let's begin the consulting process.
          </p>
          <button
            onClick={onStart}
            className="px-12 py-6 bg-brand-dark text-white rounded-full font-black text-xl hover:bg-brand-dark/90 transition-all shadow-2xl flex items-center justify-center gap-3 mx-auto"
          >
            Start Matching Session
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-gray-100 text-center space-y-6">
        <div className="flex items-center justify-center gap-2">
          <div className="bg-brand-primary p-2 rounded-xl text-brand-dark">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="font-black text-2xl tracking-tight text-brand-dark">NannyMatch AI</span>
        </div>
        <p className="text-gray-400 font-medium text-sm">© 2026 NannyMatch Global. All rights reserved.</p>
      </footer>
    </div>
  );
}
