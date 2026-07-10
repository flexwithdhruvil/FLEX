import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Scale, Users, ShieldAlert, CreditCard, Activity, Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import ContactModal from '../components/ContactModal';

const TermsAndConditions = () => {
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
              TERMS <span className="text-yellow-400">&</span> CONDITIONS
            </h1>
            <p className="text-gray-400 text-lg font-body">Last Updated: March 2026</p>
          </motion.div>

          <div className="space-y-16">
            <section className="glass-monolith p-5 sm:p-8 rounded-2xl border border-white/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-yellow-400/10 flex items-center justify-center text-yellow-400">
                  <Users size={24} />
                </div>
                <h2 className="text-2xl font-headline font-black uppercase tracking-tight">1. The Brotherhood Code of Conduct (Community Rules)</h2>
              </div>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  The Flex Tribe Discord is a place for growth, accountability, and respect. By joining this cohort, you agree to the following rules. If you violate them, you will be permanently removed from the program and the Discord server immediately, with zero refund:
                </p>
                <ul className="space-y-4 list-none">
                  <li className="flex gap-3">
                    <span className="text-yellow-400 font-bold">No Disrespect:</span>
                    <span>Bullying, harassment, or putting down another member's physique or progress will result in an instant ban. We are here to build each other up.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-yellow-400 font-bold">No Spam or Self-Promotion:</span>
                    <span>You are not allowed to use the community to sell your own products, services, or crypto schemes.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-yellow-400 font-bold">Confidentiality:</span>
                    <span>What is shared in the Discord (progress photos, personal struggles) stays in the Discord. Leaking another member's photos or information is grounds for immediate removal.</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="glass-monolith p-5 sm:p-8 rounded-2xl border border-white/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-yellow-400/10 flex items-center justify-center text-yellow-400">
                  <ShieldAlert size={24} />
                </div>
                <h2 className="text-2xl font-headline font-black uppercase tracking-tight">2. The Accountability "Strike" System</h2>
              </div>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  This program requires a mandatory daily check-in (via Instagram Story tagging the brand or a dedicated Discord upload).
                </p>
                <p>
                  If you fail to upload your daily proof without a valid, pre-communicated reason, you will receive a "Strike."
                </p>
                <div className="bg-red-500/10 border-l-4 border-red-500 p-6 rounded-r-xl">
                  <p className="text-red-400 font-bold">
                    Accumulating 3 unexcused strikes means you are not taking the protocol seriously. We reserve the right to revoke your access to the live weekly coaching calls if you refuse to do the daily work.
                  </p>
                </div>
              </div>
            </section>

            <section className="glass-monolith p-5 sm:p-8 rounded-2xl border border-white/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-yellow-400/10 flex items-center justify-center text-yellow-400">
                  <Scale size={24} />
                </div>
                <h2 className="text-2xl font-headline font-black uppercase tracking-tight">3. Intellectual Property (Don't Steal The Blueprint)</h2>
              </div>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  When you purchase any tier of the 69-Day Flex Protocol, you are buying a single, non-transferable license for personal use.
                </p>
                <p>
                  You are strictly prohibited from downloading, screen-recording, sharing, or reselling the video lectures, the Vegetarian Fueling Strategy PDFs, or the workout splits.
                </p>
                <p className="text-yellow-400 font-bold">
                  Sharing your login credentials with friends or uploading the content to other websites will result in immediate account termination and potential legal action.
                </p>
              </div>
            </section>

            <section className="glass-monolith p-5 sm:p-8 rounded-2xl border border-white/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-yellow-400/10 flex items-center justify-center text-yellow-400">
                  <CreditCard size={24} />
                </div>
                <h2 className="text-2xl font-headline font-black uppercase tracking-tight">4. Payments and Billing</h2>
              </div>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  All payments for the 69-Day Flex Protocol are one-time, upfront payments.
                </p>
                <p>
                  Because you gain immediate access to proprietary digital frameworks, workout routines, and diet plans upon purchase, all sales are final and we do not offer cash refunds (please refer to our "Results Or We Work For Free" Guarantee for our conditional transformation policy).
                </p>
                <p className="text-red-400 font-bold">
                  Filing a fraudulent chargeback with your bank or credit card company after consuming the digital content will result in a permanent ban from all future Flexwithdhruvil programs and events.
                </p>
              </div>
            </section>

            <section className="glass-monolith p-5 sm:p-8 rounded-2xl border border-white/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-yellow-400/10 flex items-center justify-center text-yellow-400">
                  <Activity size={24} />
                </div>
                <h2 className="text-2xl font-headline font-black uppercase tracking-tight">5. Assumption of Risk (Liability Waiver)</h2>
              </div>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Calisthenics, weightlifting, and physical training carry an inherent risk of injury.
                </p>
                <p>
                  By participating in the 69-Day Flex Protocol, you acknowledge that you are voluntarily participating in these activities and assume all risk of injury to yourself.
                </p>
                <p>
                  You agree to release, discharge, and hold harmless Dhruvil, the co-founders, and the Flexwithdhruvil brand from any and all liability, claims, or causes of action arising out of any injury, physical or mental, that you may sustain during the execution of this protocol. If a movement causes pain, you agree to stop immediately and seek medical advice.
                </p>
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

export default TermsAndConditions;
