import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { supabase } from '../utils/supabase';


function Toast({ message, type }: { message: string; type: 'success' | 'error' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.96 }}
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl border text-sm font-medium ${
        type === 'success'
          ? 'bg-green-500/10 border-green-500/30 text-green-400'
          : 'bg-red-500/10 border-red-500/30 text-red-400'
      }`}
    >
      {type === 'success'
        ? <CheckCircle2 size={16} />
        : <AlertCircle size={16} />}
      {message}
    </motion.div>
  );
}



















const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);


export default function Auth() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);


  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');


  const [focusedField, setFocusedField] = useState<string | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setIsLoading(false);
    if (error) {
      showToast(
        error.message === 'Invalid login credentials'
          ? 'Wrong email or password. Try again.'
          : error.message,
        'error'
      );
    } else {
      showToast('Welcome back! Taking you home…', 'success');
      setTimeout(() => navigate('/'), 900);
    }
  };

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password || !username) return;
    if (password.length < 6) {
      showToast('Password must be at least 6 characters.', 'error');
      return;
    }
    setIsLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
        emailRedirectTo: `${window.location.origin}/`,
      },
    });

    setIsLoading(false);
    if (error) {
      showToast(error.message, 'error');
    } else {
      showToast('Account created! Check your email to confirm.', 'success');
      setActiveTab('signin');
    }
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/` },
    });
  };

  const handleGitHubLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: `${window.location.origin}/` },
    });
  };


  const Field = ({
    id, label, type, value, onChange, placeholder, right,
  }: {
    id: string; label: string; type: string; value: string;
    onChange: (v: string) => void; placeholder: string; right?: React.ReactNode;
  }) => (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">
        {label}
      </label>
      <div
        className={`relative overflow-hidden rounded-xl transition-all duration-300 ${
          focusedField === id ? 'ring-2 ring-yellow-400/30' : ''
        }`}
      >
        <input
          id={id}
          type={type}
          required
          value={value}
          placeholder={placeholder}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocusedField(id)}
          onBlur={() => setFocusedField(null)}
          className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-4 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-yellow-400/40 focus:bg-white/[0.08] transition-all duration-300"
        />
        {right && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">{right}</div>
        )}
        {}
        {focusedField === id && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 0.55, ease: 'easeInOut' }}
            className="absolute bottom-0 left-0 h-[1.5px] w-full bg-gradient-to-r from-transparent via-yellow-400 to-transparent pointer-events-none"
          />
        )}
      </div>
    </div>
  );


  const SubmitBtn = ({ label }: { label: string }) => (
    <button
      type="submit"
      disabled={isLoading}
      className="w-full py-4 bg-gradient-to-r from-indigo-accent to-violet-accent rounded-xl text-white font-syne font-bold shadow-lg shadow-indigo-accent/20 hover:shadow-indigo-accent/40 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 relative overflow-hidden flex items-center justify-center gap-2"
    >
      {isLoading
        ? <><Loader2 size={16} className="animate-spin" /> Working…</>
        : label}
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="grid-background absolute inset-0 z-0 opacity-40" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      {}
      <AnimatePresence>
        {toast && <Toast key="toast" message={toast.message} type={toast.type} />}
      </AnimatePresence>

      {}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-8 left-8 z-20"
      >
        <Link
          to="/"
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
        >
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-all">
            <ArrowLeft size={20} />
          </div>
          <span className="font-syne text-sm uppercase tracking-widest font-bold">Back</span>
        </Link>
      </motion.div>

      {}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-8 z-10"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-accent to-violet-accent flex items-center justify-center shadow-lg shadow-indigo-accent/20">
          <span className="text-white font-syne text-xl font-bold">F</span>
        </div>
        <h1 className="text-2xl font-syne tracking-tighter text-white">FlexProtocol</h1>
      </motion.div>

      {}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[420px] bg-card-bg/80 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl relative z-10 overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-accent/50 to-transparent" />

        <div className="p-8">
          {}
          <div className="relative flex p-1 bg-navy-bg/50 rounded-2xl mb-8 border border-white/5">
            <motion.div
              className="absolute top-1 bottom-1 left-1 bg-indigo-accent/20 border border-indigo-accent/30 rounded-xl z-0"
              initial={false}
              animate={{ x: activeTab === 'signin' ? 0 : '100%', width: 'calc(50% - 4px)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
            {(['signin', 'signup'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative z-10 flex-1 py-2.5 text-sm font-syne transition-colors duration-300 ${
                  activeTab === tab ? 'text-white' : 'text-white/40'
                }`}
              >
                {tab === 'signin' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'signin' ? (
              <motion.div
                key="signin"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h2 className="text-2xl font-syne text-white mb-1">Welcome back</h2>
                  <p className="text-white/50 text-sm">Enter your credentials to continue</p>
                </div>

                {}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="flex items-center justify-center gap-2 py-3 px-4 bg-white/5 border border-white/10 rounded-xl text-sm font-medium text-white/70 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-300"
                  >
                    <GoogleIcon /> Google
                  </button>
                  <button
                    type="button"
                    onClick={handleGitHubLogin}
                    className="flex items-center justify-center gap-2 py-3 px-4 bg-white/5 border border-white/10 rounded-xl text-sm font-medium text-white/70 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-300"
                  >
                    <GitHubIcon /> GitHub
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <div className="h-[1px] flex-1 bg-white/5" />
                  <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">or with email</span>
                  <div className="h-[1px] flex-1 bg-white/5" />
                </div>

                <form className="space-y-4" onSubmit={handleLogin}>
                  <Field
                    id="signin-email" label="Email" type="email"
                    value={email} onChange={setEmail} placeholder="you@example.com"
                  />
                  <Field
                    id="signin-password" label="Password" type={showPassword ? 'text' : 'password'}
                    value={password} onChange={setPassword} placeholder="••••••••"
                    right={
                      <button type="button" onClick={() => setShowPassword(p => !p)}
                        className="text-white/40 hover:text-white transition-colors p-1">
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    }
                  />
                  <div className="text-right">
                    <button
                      type="button"
                      onClick={async () => {
                        if (!email) { showToast('Enter your email first.', 'error'); return; }
                        const { error } = await supabase.auth.resetPasswordForEmail(email, {
                          redirectTo: `${window.location.origin}/auth`,
                        });
                        if (error) showToast(error.message, 'error');
                        else showToast('Reset link sent! Check your inbox.', 'success');
                      }}
                      className="text-[10px] uppercase tracking-widest text-indigo-accent font-bold hover:text-violet-accent transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <SubmitBtn label="Sign In →" />
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="signup"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h2 className="text-2xl font-syne text-white mb-1">Create account</h2>
                  <p className="text-white/50 text-sm">Join the elite community</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="flex items-center justify-center gap-2 py-3 px-4 bg-white/5 border border-white/10 rounded-xl text-sm font-medium text-white/70 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-300"
                  >
                    <GoogleIcon /> Google
                  </button>
                  <button
                    type="button"
                    onClick={handleGitHubLogin}
                    className="flex items-center justify-center gap-2 py-3 px-4 bg-white/5 border border-white/10 rounded-xl text-sm font-medium text-white/70 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-300"
                  >
                    <GitHubIcon /> GitHub
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <div className="h-[1px] flex-1 bg-white/5" />
                  <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">or with email</span>
                  <div className="h-[1px] flex-1 bg-white/5" />
                </div>

                <form className="space-y-4" onSubmit={handleSignup}>
                  <Field
                    id="signup-username" label="Username" type="text"
                    value={username} onChange={setUsername} placeholder="flexwarrior69"
                  />
                  <Field
                    id="signup-email" label="Email Address" type="email"
                    value={email} onChange={setEmail} placeholder="you@example.com"
                  />
                  <Field
                    id="signup-password" label="Password" type={showPassword ? 'text' : 'password'}
                    value={password} onChange={setPassword} placeholder="Min. 6 characters"
                    right={
                      <button type="button" onClick={() => setShowPassword(p => !p)}
                        className="text-white/40 hover:text-white transition-colors p-1">
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    }
                  />
                  {}
                  {password.length > 0 && (
                    <div className="space-y-1">
                      <div className="flex gap-1">
                        {[1,2,3,4].map(i => (
                          <div key={i} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                            password.length >= i * 3
                              ? i <= 1 ? 'bg-red-400' : i <= 2 ? 'bg-yellow-400' : i <= 3 ? 'bg-blue-400' : 'bg-green-400'
                              : 'bg-white/10'
                          }`} />
                        ))}
                      </div>
                      <p className="text-[10px] text-white/30 ml-1">
                        {password.length < 4 ? 'Too short' : password.length < 7 ? 'Weak' : password.length < 10 ? 'Good' : 'Strong'}
                      </p>
                    </div>
                  )}
                  <SubmitBtn label="Create Account →" />
                  <p className="text-[10px] text-white/30 text-center leading-relaxed">
                    By signing up you agree to our{' '}
                    <Link to="/terms-and-conditions" className="text-indigo-accent hover:underline">Terms</Link>
                    {' & '}
                    <Link to="/privacy-policy" className="text-indigo-accent hover:underline">Privacy Policy</Link>
                  </p>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
