# Flex Protocol: Elite Fitness Transformation ⚡️

![Flex Protocol Banner](/public/images/3.png)

Flex Protocol is a high-performance digital fitness experience designed for the elite. It combines cutting-edge motion design, minimalist luxury aesthetics, and a robust technical stack to deliver a seamless transformation journey.

## 🌟 Key Features

- **Luxury Interaction Layer**: Mouse-aware 3D tilt effects, magnetic CTA buttons, and dynamic spotlight illumination on every card.
- **Cinematic Atmosphere**: Triple-layer parallax background with atmospheric golden fog and animated beam backgrounds.
- **Elite Experience**: Minimalist design focused on evidence-based results and professional curriculum delivery.
- **High Performance**: Built with React 19, Vite, and Motion (formerly Framer Motion) for silky-smooth 60FPS interactions.
- **Secure Architecture**: Integrated with Supabase for robust authentication and real-time data management.

## 🛠 Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Animation**: Motion (Framer Motion)
- **Styling**: Vanilla CSS (Modern CSS Nesting & Variables)
- **Backend/DB**: Supabase (PostgreSQL & Auth)
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/flexwithdhruvil/FLEX.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env.local` file in the root:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## 🗄 Database Setup

To enable the registration system, run the following SQL in your Supabase SQL Editor:

```sql
-- Create the registrations table
CREATE TABLE public.registrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    plan TEXT,
    goal TEXT,
    experience TEXT,
    message TEXT
);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (anon access for registration)
CREATE POLICY "Allow public registration" 
ON public.registrations 
FOR INSERT 
WITH CHECK (true);
```

## 📸 Gallery

<div align="center">
  <img src="/public/images/1.png" width="30%" />
  <img src="/public/images/2.png" width="30%" />
  <img src="/public/images/4.png" width="30%" />
</div>

---

**Flex Protocol** is more than a fitness site—it's a statement. Built for those who demand the best.
