# FlexProtocol — Integration Guide

## Files delivered

| File | What it does |
|------|-------------|
| `src/pages/Auth.tsx` | Real Supabase auth (email + Google + GitHub), password strength meter, scanning focus animation, forgot-password flow |
| `src/context/AuthContext.tsx` | React context that wraps the app — provides `useAuth()` hook anywhere |
| `src/main.tsx` | Updated to wrap `<App>` in `<AuthProvider>` |
| `src/components/AnimatedBeamsBackground.tsx` | Optimised: GPU blur, IntersectionObserver, mouse attraction, reduced-motion, 120Hz-safe |
| `src/components/CursorSparkTrail.tsx` | Gold spark particles on cursor (CodePen effect 1 equivalent) |
| `src/components/HeadlineReveal.tsx` | Scanner sweep + neon glow on h1 (CodePen effect 2 equivalent) |

---

## Step 1 — Supabase project setup

### Enable OAuth providers
In your Supabase dashboard → Authentication → Providers:
- Enable **Google**: add Client ID + Secret from Google Cloud Console
- Enable **GitHub**: add Client ID + Secret from GitHub Developer Settings

### Run this SQL in Supabase SQL editor

```sql
-- Pre-registrations table (already exists? Run only missing parts)
CREATE TABLE IF NOT EXISTS pre_registrations (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name        text NOT NULL,
  email       text NOT NULL,
  phone       text,
  plan        text NOT NULL,
  goal        text,
  experience  text,
  message     text,
  created_at  timestamptz DEFAULT now(),
  UNIQUE(email)
);

-- Enable Row Level Security
ALTER TABLE pre_registrations ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public form)
CREATE POLICY "anon_insert" ON pre_registrations
  FOR INSERT TO anon WITH CHECK (true);

-- Block anonymous reads (admin-only via service role)
CREATE POLICY "service_read" ON pre_registrations
  FOR SELECT TO service_role USING (true);
```

---

## Step 2 — Update Home.tsx auth state

Replace the `isAuthenticated` local state in `Home.tsx` with the context:

```tsx
// REMOVE these lines:
const [isAuthenticated, setIsAuthenticated] = useState(false);
useEffect(() => {
  setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
}, []);
const handleLogout = () => {
  localStorage.removeItem('isAuthenticated');
  setIsAuthenticated(false);
  window.location.reload();
};

// ADD at the top of the component:
import { useAuth } from '../context/AuthContext';
const { isAuthenticated, signOut } = useAuth();
// Replace handleLogout calls with: signOut()
```

---

## Step 3 — Add CursorSparkTrail to hero

In `Home.tsx`, find the hero `<section>` and add:

```tsx
import CursorSparkTrail from '../components/CursorSparkTrail';

// Inside the hero section (it already has relative + overflow-x-hidden):
<section className="min-h-screen flex flex-col items-center justify-center ... relative">
  <CursorSparkTrail />    {/* ← add this line */}
  {/* ... rest of hero content ... */}
</section>
```

---

## Step 4 — Add HeadlineReveal

In `Home.tsx`, replace the `<h1>` block inside the hero with:

```tsx
import HeadlineReveal from '../components/HeadlineReveal';

// Replace the entire <motion.div> containing the h1:
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.1 }}
  className="max-w-4xl mb-8 sm:mb-12"
>
  <HeadlineReveal />
  <motion.p
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.6, duration: 0.8 }}   // ← delay after scan completes
    className="text-[10px] sm:text-sm md:text-base font-headline font-bold uppercase tracking-[0.2em] text-gray-400"
  >
    The Only Fitness Cohort That Actually Forces You to Grow.
  </motion.p>
</motion.div>
```

---

## Step 5 — .env variables needed

Make sure your `.env` has:

```env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJI...
```

For Google/GitHub OAuth to work, add your site URL to:
**Supabase dashboard → Authentication → URL Configuration → Site URL**
e.g. `http://localhost:5173` for dev, and your production domain.

---

## What each improvement fixes

| Issue | Before | After |
|-------|--------|-------|
| Auth security | `localStorage = 'true'` = anyone logs in | Real JWT via Supabase |
| Session persistence | Lost on reload | Supabase auto-refreshes tokens |
| Social login | Buttons existed, did nothing | Google + GitHub OAuth wired |
| Forgot password | Missing | Email reset flow via Supabase |
| Background perf | `ctx.filter` per frame (CPU) | CSS `filter` (GPU compositor) |
| Mobile jank | Animation runs off-screen | IntersectionObserver pauses it |
| 120Hz monitors | Speed tied to frame count | Speed tied to `performance.now()` |
| Hero engagement | Static background | Mouse-attracted beams + spark trail |
| First impression | Plain text fade-in | Scanner reveal + neon glow settle |
