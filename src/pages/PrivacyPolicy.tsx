import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Shield, Lock, FileText, UserCheck, Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import ContactModal from '../components/ContactModal';

const PrivacyPolicy = () => {
  const [isContactOpen, setIsContactOpen] = React.useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-surface-container-lowest text-white font-body selection:bg-primary-container selection:text-on-primary-fixed overflow-x-hidden">
      <nav className="fixed top-0 w-full z-50 bg-surface-container-lowest/60 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center px-4 sm:px-8 py-4">
          <Link to="/" className="text-lg sm:text-2xl font-black italic text-yellow-400 font-headline flex items-center gap-2">
            <ArrowLeft size={20} />
            FlexWithDhruvil
          </Link>
        </div>
      </nav>

      <main className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-8">
        <div className="max-w-[800px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-headline font-black mb-4 sm:mb-6 tracking-tight uppercase">
              PRIVACY <span className="text-yellow-400">&</span> POLICIES
            </h1>
            <p className="text-gray-400 text-lg font-body">Last Updated: March 2026</p>
          </motion.div>

          <div className="space-y-16">
            <section className="glass-monolith p-5 sm:p-8 rounded-2xl border border-white/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-yellow-400/10 flex items-center justify-center text-yellow-400">
                  <UserCheck size={24} />
                </div>
                <h2 className="text-2xl font-headline font-black uppercase tracking-tight">1. THE "BIG BROTHER" LEGAL DISCLAIMER</h2>
              </div>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Let’s be completely clear before we start: I am not a certified medical doctor, a clinical nutritionist, or a licensed physiotherapist. I am simply your big brother who spent years in the trenches figuring out how to master bodyweight mechanics, build an aesthetic physique on a strict vegetarian diet, and build unshakeable confidence.
                </p>
                <p>
                  The 69-Day Flex Protocol is built entirely on my personal experience and the exact frameworks I have used to successfully transform myself and my 1-on-1 clients. By joining this cohort, you understand that you are undertaking these workouts and dietary changes voluntarily. I am sharing what worked for me and my brothers. Always consult with a healthcare professional before starting any new training or diet protocol, especially if you have pre-existing injuries or health conditions.
                </p>
              </div>
            </section>

            <section className="glass-monolith p-5 sm:p-8 rounded-2xl border border-white/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-yellow-400/10 flex items-center justify-center text-yellow-400">
                  <Shield size={24} />
                </div>
                <h2 className="text-2xl font-headline font-black uppercase tracking-tight">2. THE "BROTHERHOOD" GUARANTEE & REFUND POLICY</h2>
              </div>
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p>
                  Let me be entirely transparent with you: I do not offer a standard "no questions asked" money-back guarantee. Why? Because a standard refund gives you an easy excuse to quit when things get hard. That is not what a big brother does. I don't want to just give your money back and watch you walk away exactly the same as when you started.
                </p>
                <div className="bg-yellow-400/5 border-l-4 border-yellow-400 p-6 rounded-r-xl">
                  <h3 className="text-yellow-400 font-headline font-bold uppercase mb-2">Our Promise: Results, Or We Work For Free.</h3>
                  <p>
                    If you complete the full 69 days, do the actual work, and do not see a visible transformation in your physique, strength, and posture... I will personally continue to coach you for FREE until you do. I will keep you in the Discord, I will keep reviewing your form, and I will adjust your diet personally at zero extra cost until we hit the goal.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-white font-headline font-bold uppercase">The Action-Taker Conditions:</h3>
                  <p className="text-sm text-gray-400 italic mb-4">I do not reward laziness. To qualify for this ongoing free coaching, you must actually put in the reps. You must prove that the system failed you, not that you failed the system.</p>
                  <ul className="space-y-3 list-disc pl-5 text-gray-300">
                    <li>You must complete the full 69 days of the protocol without quitting.</li>
                    <li>You must have posted your mandatory daily workout proof (via Instagram Stories tagging the brand, or in the designated Discord channel) every single day.</li>
                    <li>You must have strictly followed the Vegetarian Fueling Strategy and attended (or watched) the weekly live form-review sessions.</li>
                  </ul>
                </div>
                <p className="text-sm text-gray-400">
                  If you show up for yourself for 69 days, I will show up for you until the job is done. Period. Because of the digital nature of the video content and the live coaching provided, no cash refunds are issued.
                </p>
              </div>
            </section>

            <section className="glass-monolith p-5 sm:p-8 rounded-2xl border border-white/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-yellow-400/10 flex items-center justify-center text-yellow-400">
                  <Lock size={24} />
                </div>
                <h2 className="text-2xl font-headline font-black uppercase tracking-tight">3. PRIVACY POLICY</h2>
              </div>
              <div className="space-y-8 text-gray-300 leading-relaxed">
                <div>
                  <h3 className="text-white font-headline font-bold uppercase mb-3 flex items-center gap-2">
                    <span className="text-yellow-400">1.</span> What Information We Collect
                  </h3>
                  <p>
                    When you join the waitlist or enroll in The Flex Protocol, we collect your name, email address, WhatsApp number, and your current fitness goals. Inside the cohort, we also collect your before-and-after photos and daily workout videos strictly for accountability and form-correction purposes.
                  </p>
                </div>

                <div>
                  <h3 className="text-white font-headline font-bold uppercase mb-3 flex items-center gap-2">
                    <span className="text-yellow-400">2.</span> How We Use Your Data
                  </h3>
                  <p>
                    We use your email and WhatsApp number to send you program access links, daily motivation, cohort updates, and exclusive brand announcements. We will never sell, rent, or trade your personal information to third-party marketing companies.
                  </p>
                </div>

                <div>
                  <h3 className="text-white font-headline font-bold uppercase mb-3 flex items-center gap-2">
                    <span className="text-yellow-400">3.</span> Use of Transformation Photos
                  </h3>
                  <p>
                    We celebrate our brotherhood's wins. However, we will never use your before-and-after photos or video check-ins for public marketing or on our website without asking for your explicit written permission first. What happens in the Discord, stays in the Discord, unless you tell us otherwise.
                  </p>
                </div>

                <div>
                  <h3 className="text-white font-headline font-bold uppercase mb-3 flex items-center gap-2">
                    <span className="text-yellow-400">4.</span> Payment Security
                  </h3>
                  <p>
                    We do not store your credit card, debit card, or UPI details on our servers. All transactions are securely processed through our encrypted, third-party payment gateways (e.g., Razorpay, Stripe, or similar processors).
                  </p>
                </div>
              </div>
            </section>
          </div>

          <div className="mt-20 text-center">
            <Link 
              to="/"
              className="inline-flex items-center gap-2 text-yellow-400 font-headline font-bold uppercase tracking-widest hover:gap-4 transition-all"
            >
              <ArrowLeft size={18} />
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-surface-container-lowest py-10 border-t border-white/5 text-center">
        <div className="flex justify-center gap-8 mb-4">
          <Link to="/privacy-policy" className="text-xs text-gray-500 hover:text-yellow-400 transition-colors uppercase font-bold tracking-widest">Privacy Policy</Link>
          <Link to="/terms-and-conditions" className="text-xs text-gray-500 hover:text-yellow-400 transition-colors uppercase font-bold tracking-widest">Terms & Conditions</Link>
          <a
            href="https://wa.me/8200012647"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-500 hover:text-yellow-400 transition-colors uppercase font-bold tracking-widest"
          >
            Contact
          </a>
        </div>
        <div className="flex justify-center gap-6 mb-6">
          <a 
            href="https://www.instagram.com/flexwithdhruvil?igsh=YTc4NWE1cGJkMjNp&utm_source=qr" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-yellow-400 transition-colors"
          >
            <Instagram size={20} />
          </a>
          <a 
            href="https://www.youtube.com/@flexwithdhruvilp" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-yellow-400 transition-colors"
          >
            <Youtube size={20} />
          </a>
        </div>
        <p className="text-xs text-gray-500 font-body">
          © 2024 FlexWithDhruvil. All Rights Reserved.
        </p>
      </footer>

      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />
    </div>
  );
};

export default PrivacyPolicy;
