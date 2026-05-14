import React, { useState, FormEvent, useEffect, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ShieldCheck, Clock, Zap } from 'lucide-react';
import { supabase } from '../utils/supabase';

export interface PreRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: string;
  planPrice: string;
}

export default function PreRegisterModal({ isOpen, onClose, selectedPlan, planPrice }: PreRegisterModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '+91 ',
    goal: '',
    experience: '',
    message: '',
    vipReason: '',
  });

  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
      setFormData(prev => ({
        ...prev,
        goal: '',
        experience: '',
        message: '',
        vipReason: '',
      }));
    }
  }, [isOpen, selectedPlan]);

  const isVip = selectedPlan === 'Inner Circle VIP';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('registrations')
        .insert({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          plan: selectedPlan,
          goal: formData.goal,
          experience: formData.experience,
          message: isVip && formData.vipReason
            ? `VIP Reason: ${formData.vipReason}\n\nMessage: ${formData.message}`
            : formData.message,
        });

      if (error) {
        throw error;
      }

      setIsSuccess(true);
    } catch (err: any) {
      console.error('Submission failed:', err);
      alert(`Failed to submit: ${err.message || JSON.stringify(err)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-lg bg-surface-container-low border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          <div className="flex items-center justify-between p-6 border-b border-white/5 bg-surface-container">
            <div>
              {isVip && (
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-yellow-400/20 text-yellow-400 text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded flex items-center gap-1">
                    <Zap size={10} /> Selective
                  </span>
                </div>
              )}
              <h2 className="text-xl font-headline font-black text-white">
                {isVip ? 'Apply for Inner Circle' : 'Registration'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={20} className="text-gray-400" />
            </button>
          </div>

          <div className="overflow-y-auto p-6 scrollbar-hide">
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center"
              >
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} className="text-green-500" />
                </div>
                <h3 className="text-2xl font-headline font-black text-white mb-2">
                  🎉 {isVip ? "Application Received!" : "You're In!"}
                </h3>
                <p className="text-gray-400 mb-8 max-w-sm mx-auto">
                  {isVip
                    ? "Your VIP application is currently under review. Our team will contact you within 24 hours."
                    : "Your registration was successful. Our team will contact you shortly with the next steps."}
                </p>
                <button
                  onClick={onClose}
                  className="bg-white text-black px-8 py-3 rounded-full font-headline font-bold uppercase text-sm"
                >
                  Close
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="bg-primary-container/10 p-4 rounded-xl border border-primary-container/20 mb-6">
                  <p className="text-sm font-medium text-gray-300">
                    👉 You are {isVip ? 'applying' : 'registering'} for: <br />
                    <span className="text-yellow-400 text-lg font-headline font-black block mt-1">
                      {selectedPlan} <span className="opacity-70 text-sm">({planPrice})</span>
                    </span>
                  </p>
                  {isVip && (
                    <p className="text-xs text-yellow-500 mt-2 font-bold uppercase tracking-wider">
                      This is a selective program. Our team will review your application.
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">NAME</label>
                    <input
                      required
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400/30 focus:border-yellow-400/50 transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Phone Number</label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 9876543210"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400/30 focus:border-yellow-400/50 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400/30 focus:border-yellow-400/50 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Fitness Goal</label>
                    <select
                      required
                      name="goal"
                      value={formData.goal}
                      onChange={handleChange}
                      className="w-full bg-surface-container-high border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/30 focus:border-yellow-400/50 transition-all appearance-none"
                    >
                      <option value="" disabled>Select your goal</option>
                      <option value="Fat Loss">Fat Loss & Leaning</option>
                      <option value="Muscle Gain">Muscle & Strength Gain</option>
                      <option value="Body Recomp">Body Recomposition</option>
                      <option value="Aesthetics">Pure Aesthetics</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Experience Level</label>
                    <select
                      required
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full bg-surface-container-high border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/30 focus:border-yellow-400/50 transition-all appearance-none"
                    >
                      <option value="" disabled>Select experience</option>
                      <option value="Beginner">Beginner (0-1 year)</option>
                      <option value="Intermediate">Intermediate (1-3 years)</option>
                      <option value="Advanced">Advanced (3+ years)</option>
                    </select>
                  </div>
                </div>

                {isVip && (
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-yellow-400 ml-1">Why should we select you?</label>
                    <textarea
                      required
                      name="vipReason"
                      value={formData.vipReason}
                      onChange={handleChange}
                      placeholder="Tell us why you deserve to be in the limited VIP inner circle..."
                      rows={2}
                      className="w-full bg-white/5 border border-yellow-400/20 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all resize-none"
                    />
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Message (Optional)</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Any specific injuries or details we should know?"
                    rows={2}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400/30 focus:border-yellow-400/50 transition-all resize-none"
                  />
                </div>

                <div className="pt-4 flex flex-col gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black py-4 rounded-xl font-headline font-black uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? 'Processing...' : isVip ? 'Apply for VIP →' : 'Complete Registration →'}
                  </button>
                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                    <ShieldCheck size={12} />
                    Secured by Flex Protocol
                  </div>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
