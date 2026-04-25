import { useState, useEffect } from 'react';
import { doc, setDoc, serverTimestamp, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './lib/firebase';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, LogOut, ArrowRight, Loader2, Sparkles, Shield, HeartHandshake } from 'lucide-react';
import { InputSection } from './components/InputSection';
import { AdviceDisplay } from './components/AdviceDisplay';
import { LandingPage } from './components/LandingPage';
import { BookingConfirmation } from './components/BookingConfirmation';
import { FamilyInputs, NannyAdvice, NannyProfile } from './lib/types';
import { generateNannyMatch } from './services/gemini';

export default function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionUser, setSessionUser] = useState<any>(null);
  const [isHome, setIsHome] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [advice, setAdvice] = useState<NannyAdvice | null>(null);
  const [familyInputs, setFamilyInputs] = useState<FamilyInputs | null>(null);
  const [selectedNanny, setSelectedNanny] = useState<NannyProfile | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check for existing session on load
  useEffect(() => {
    const savedUser = localStorage.getItem('applet_user_session');
    if (savedUser) {
      setSessionUser(JSON.parse(savedUser));
      setIsHome(true);
      setShowLanding(false);
    }
  }, []);

  const handleCheckIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;
    
    setLoading(true);
    setError(null);
    try {
      const cleanPhone = `+${phoneNumber.replace(/\D/g, '')}`;
      
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('phoneNumber', '==', cleanPhone));
      const querySnapshot = await getDocs(q);
      
      let userData: any;

      if (!querySnapshot.empty) {
        const existingDoc = querySnapshot.docs[0];
        userData = existingDoc.data();
      } else {
        const newUserId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        userData = {
          uid: newUserId,
          phoneNumber: cleanPhone,
          displayName: 'Parent User',
          lastSeen: serverTimestamp(),
          createdAt: serverTimestamp(),
        };
        await setDoc(doc(db, 'users', newUserId), userData);
      }

      localStorage.setItem('applet_user_session', JSON.stringify(userData));
      setSessionUser(userData);
      setIsHome(true);
      setShowLanding(false);
    } catch (err) {
      console.error("Error during check-in:", err);
      setError("Failed to save to database. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('applet_user_session');
    setSessionUser(null);
    setIsHome(false);
    setShowLanding(true);
    setAdvice(null);
    setFamilyInputs(null);
    setSelectedNanny(null);
    setPhoneNumber('');
  };

  const handleMatchingSubmit = async (inputs: FamilyInputs) => {
    setIsGenerating(true);
    setError(null);
    setFamilyInputs(inputs);
    try {
      const result = await generateNannyMatch(inputs);
      setAdvice(result);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError("Failed to generate advice. Please check your connection and try again.");
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBooking = (profile: NannyProfile) => {
    setSelectedNanny(profile);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setAdvice(null);
    setSelectedNanny(null);
    setError(null);
  };

  // --- RENDERING LOGIC ---

  // 1. Initial State: Landing Page
  if (showLanding && !isHome) {
    return <LandingPage onStart={() => setShowLanding(false)} />;
  }

  // 2. Secondary State: Phone Identification
  if (!isHome) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <motion.div 
          layout
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-10 rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] max-w-md w-full border border-gray-100 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-brand-primary"></div>
          
          <div className="text-center mb-10">
            <div className="bg-brand-primary w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl rotate-3">
              <Phone className="w-10 h-10 text-brand-dark" />
            </div>
            <h2 className="text-4xl font-black text-brand-dark tracking-tight mb-3">Identification</h2>
            <p className="text-gray-500 font-medium">Connect your profile to begin the NannyMatch consultation.</p>
          </div>

          <form onSubmit={handleCheckIn} className="space-y-8">
            <div className="space-y-3">
              <label className="block text-sm font-bold text-gray-700 ml-1">Phone Number</label>
              <PhoneInput
                country={'us'}
                value={phoneNumber}
                onChange={setPhoneNumber}
                containerClass="!w-full"
                inputClass="!w-full !h-16 !rounded-2xl !border-gray-200 !bg-gray-50 !text-xl !font-bold !pl-16 focus:!ring-4 focus:!ring-brand-primary/20 focus:!border-brand-primary !transition-all"
                buttonClass="!rounded-l-2xl !bg-gray-50 !border-gray-200 !w-14"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !phoneNumber}
              className="group relative w-full py-5 bg-brand-primary text-brand-dark font-black text-lg rounded-2xl hover:bg-brand-primary/90 transition-all hover:translate-y-[-2px] active:translate-y-[1px] shadow-[0_20px_40px_-10px_rgba(242,195,185,0.3)] disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin text-brand-dark/80" />
              ) : (
                <>
                  Begin Consultation
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </>
              )}
            </button>
            <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
              Private Database Session • Secure Access
            </p>
          </form>

          <button 
            onClick={() => setShowLanding(true)}
            className="w-full mt-8 text-sm font-bold text-gray-400 hover:text-indigo-600 transition-colors flex items-center justify-center gap-2"
          >
            ← Back to Brand Story
          </button>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-xs font-bold text-center">
              {error}
            </div>
          )}
        </motion.div>
      </div>
    );
  }

  // 3. Main State: Application
  return (
    <div className="min-h-screen bg-brand-accent flex flex-col pb-20">
      {/* Top Navbar */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-brand-primary p-2 rounded-xl text-brand-dark">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="font-black text-xl tracking-tight text-brand-dark">NannyMatch AI</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:block text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
            User: {sessionUser.phoneNumber}
          </span>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-red-600 transition-colors bg-gray-100 px-4 py-2 rounded-xl"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto w-full pt-10">
        <AnimatePresence mode="wait">
          {selectedNanny && advice && familyInputs ? (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <BookingConfirmation 
                profile={selectedNanny} 
                carePlan={advice.carePlan} 
                inputs={familyInputs} 
                onBack={() => setSelectedNanny(null)} 
              />
            </motion.div>
          ) : !advice ? (
            <motion.div
              key="input"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <InputSection onSubmit={handleMatchingSubmit} isLoading={isGenerating} />
              
              <section className="max-w-4xl mx-auto px-6 mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                    <Shield className="w-6 h-6 text-brand-primary" />
                  </div>
                  <h4 className="font-semibold text-brand-dark">Vetted Excellence</h4>
                  <p className="text-sm text-gray-500">Profiles are analyzed against rigorous safety benchmarks.</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                    <HeartHandshake className="w-6 h-6 text-brand-primary" />
                  </div>
                  <h4 className="font-semibold text-brand-dark">Cultural Synergy</h4>
                  <p className="text-sm text-gray-500">Deep matching for language, diet, and family values.</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                    <Sparkles className="w-6 h-6 text-brand-primary" />
                  </div>
                  <h4 className="font-semibold text-brand-dark">Bespoke Care</h4>
                  <p className="text-sm text-gray-500">Daily plans that honor your specific parenting philosophy.</p>
                </div>
              </section>
            </motion.div>
          ) : (
            <motion.div
              key="advice"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AdviceDisplay 
                advice={advice} 
                onReset={handleReset} 
                onBook={handleBooking}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <div className="max-w-4xl mx-auto px-6 mt-4">
            <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-center font-bold">
              {error}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
