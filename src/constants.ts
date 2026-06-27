import { publicUrl } from './utils/publicUrl';

export const NAV_LINKS = [
  { label: 'Programs', href: '#pricing' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Results', href: '#transformations' },
  { label: "What you'll learn", href: '#learn' },
];

export const STATS = [
  { value: '10+', label: 'Transformations' },
  { value: '42K+', label: 'Tribe Members' },
  { value: '100%', label: 'Veg-Powered' },
];

export const FEATURES = [
  {
    title: 'Functional Aesthetics',
    description: "Don't just look strong. Be strong. Training protocols that build muscle that actually moves.",
    icon: 'Dumbbell',
  },
  {
    title: 'Vegetarian Engine',
    description: 'Master high-protein vegetarian dieting without boring meals or bloating. Pure performance fueling.',
    icon: 'Leaf',
  },
  {
    title: 'Short King Mentality',
    description: 'Leveraging your frame for maximum aesthetic impact. Confidence protocols for the modern man.',
    icon: 'Brain',
  },
  {
    title: 'Accountability Engine',
    description: '24/7 support system that ensures you never skip a beat. Failure is not an option here.',
    icon: 'Zap',
  },
];

export const RESULTS = [
  {
    title: 'Muscle Gain Mastery',
    subtitle: '69 Days Transformation',
    image: publicUrl('/images/1.png'),
  },
  {
    title: 'Muscle Architecture',
    subtitle: 'Vegetarian Power Gains',
    image: publicUrl('/images/2.png'),
  },
  {
    title: 'New Transformation',
    subtitle: '69 Days Protocol',
    image: publicUrl('/images/3.png'),
  },
];

export const PRICING = [
  {
    title: 'Flex Foundation',
    subtitle: 'Self-Paced Excellence',
    price: '₹999',
    period: '/one-time',
    features: [
      '69-Day Training Guide',
      'Vegetarian Nutrition Guide',
      'Exercise Video Library',
    ],
    cta: 'Start Foundation',
    recommended: false,
  },
  {
    title: 'Flex Cohort',
    subtitle: 'Team Performance Mentorship',
    price: '₹2,999',
    period: '/cohort',
    features: [
      'Weekly Live Q&A Sessions',
      'Private Discord Community',
      'Form Check Video Reviews',
      'Monthly Progress Audits',
    ],
    cta: 'Join the Cohort',
    recommended: true,
  },
  {
    title: 'Inner Circle VIP',
    subtitle: '1-on-1 Direct Access',
    price: '₹24,999',
    period: '/full-cycle',
    features: [
      'Direct WhatsApp Access',
      'Custom Supplement Stack',
      'Lifetime Updates Access',
    ],
    cta: 'Apply for VIP',
    recommended: false,
  },
];

export const HERO_SLIDES = [
  { id: 1, image: publicUrl('/images/1.png'), title: 'Muscle Gain Mastery' },
  { id: 2, image: publicUrl('/images/2.png'), title: 'Body Recomp: 69 Days' },
  { id: 4, image: publicUrl('/images/4.png'), title: 'Elite Transformation' },
  { id: 8, image: publicUrl('/images/8.png'), title: 'Mass Gain Protocol' },
  { id: 9, image: publicUrl('/images/9.png'), title: 'Peak Performance' },
];

export const COHORT_LEARNINGS = [
  {
    id: 1,
    title: "FlexProtocols",
    description: "Master the science of hypertrophy and biomechanics to build a powerful, functional physique.",
    topics: [
      "A-Z of Hypertrophy & Muscle Growth",
      "Advanced Form Correction & Biomechanics",
      "High-Intensity Interval (HIIT) Protocols",
      "Periodization for Natural Athletes",
      "Injury Prevention & Recovery Protocols"
    ],
    icons: ["Gym", "Home"],
    buttonLabel: "Join now"
  },
  {
    id: 2,
    title: "Vegetarian Fueling Strategy",
    topics: [
      "High-Protein Meal Planning",
      "Supplement Optimization",
      "Zero-Bloat Digestion",
      "Simple & Stupid Macro Tracking",
      "The Elite Grocery List",
      "Eating Out as a Vegetarian Athlete"
    ]
  },
  {
    id: 3,
    title: "The Flex Tribe Brotherhood",
    topics: [
      "24/7 Private Discord Access",
      "Daily Story Accountability",
      "Weekly Live Form Reviews",
      "Direct Big Brother Mentorship",
      "Monthly Guest Expert Workshops",
      "Exclusive In-Person Meetups"
    ]
  },
  {
    id: 4,
    title: "The Functional Blueprint",
    badge: "Elite",
    description: "Your ground-zero entry into calisthenics. Build raw, functional strength, fix your posture, and forge an athletic physique that actually performs in the real world.",
    topics: [
      "Calisthenics Fundamentals",
      "Handstand & Planche Progressions",
      "Mobility for Modern Men",
      "Posture Correction Protocols"
    ]
  },
  {
    id: 5,
    title: "Mindset & Discipline Protocols",
    description: "The psychological blueprint for long-term consistency. Build the mental toughness required to sustain an elite lifestyle.",
    topics: [
      "The 5 AM Protocol",
      "Dopamine Detox Strategies",
      "Stoic Resilience Training",
      "Building Unbreakable Habits"
    ]
  }
];

export const FAQ = [
  {
    question: "I’ve tried other fitness programs and quit after 2 weeks. Why is this different?",
    answer: "Because those programs just handed you a PDF and disappeared. They didn’t care if you succeeded. The Flex Protocol is a live, 69-day brotherhood. You are required to post daily proof of your workouts. If you skip, we notice. If you struggle, we fix it on the weekly live calls. We literally do not let you quit.",
  },
  {
    question: "I am a strict vegetarian. Can I actually build a good physique?",
    answer: "100%. I am fully vegetarian, and I built my entire physique without ever touching meat. You don't need boiled chicken to get shredded. The Vegetarian Fueling Strategy module gives you exact, plug-and-play meals using high-protein foods your mom already makes at home (oats, soya chunks, paneer, lentils).",
  },
  {
    question: "Do I need a fancy gym membership to do this?",
    answer: "No. The core of this program is functional calisthenics: mastering your own body weight. We provide hybrid workout options, but you can achieve 90% of the results at a local park, a basic neighborhood gym, or even in your bedroom.",
  },
  {
    question: "I am on the shorter side (5'3\" - 5'5\") and struggle with confidence. Will this help?",
    answer: "That is exactly why I built this. I am 5'3\". I know what it feels like to be overlooked. This entire protocol is designed to fix your posture, broaden your shoulders, and build a physique that commands respect and presence the second you walk into a room. Height is just a number; your frame is everything.",
  },
  {
    question: "What exactly happens on the \"Weekly Live Calls\"?",
    answer: "This isn't just a boring lecture. Every week, I get on a live video call with the cohort. We review your form videos from the Discord to make sure you aren't injuring yourself on muscle-ups or squats. We adjust your macros if you hit a plateau, and we tackle the mental excuses holding you back. It’s direct, 1-on-1 style mentorship in a group setting.",
  },
  {
    question: "What if I join and don't see any results?",
    answer: "Then I failed you as a big brother, and I will fix it for free. Read our Results Or We Work For Free Guarantee. If you complete the 69 days, post your daily proof, follow the diet, and don't transform, I will personally coach you for free until you do. I take all the risk. You just have to do the work.",
  },
];
