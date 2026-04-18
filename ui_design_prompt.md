# Website UI Design Prompt
## Clinical Decision Support System for Breast Cancer Detection

---

## 🎨 Design Direction: "Compassionate Medical Elegance"

**Core Aesthetic:** A refined, trustworthy healthcare interface that balances medical professionalism with compassionate design. Uses soft pink tones to evoke hope and care while maintaining clinical credibility through clean layouts and clear typography.

**Visual Inspiration:**
- Modern medical portals (clean, data-driven)
- Wellness apps (warm, approachable)
- Frosted glass morphism (contemporary, sophisticated)
- Editorial medical journals (authoritative, readable)

---

## 🌸 Design System Specifications

### **Color Palette**

**Primary Palette:**
```css
--primary-pink: #FF69B4;        /* Hot Pink - Main brand */
--soft-pink: #FFB6C1;           /* Light Pink - Backgrounds */
--rose-pink: #FFC0CB;           /* Pink - Cards, accents */
--deep-rose: #C71585;           /* Medium Violet Red - CTAs */
--blush: #FFF0F5;               /* Lavender Blush - Soft backgrounds */
```

**Neutral Palette:**
```css
--white: #FFFFFF;
--off-white: #FFF5F7;           /* Pinkish white */
--light-gray: #F8F9FA;
--medium-gray: #E9ECEF;
--border-gray: #DEE2E6;
--text-dark: #1F2937;
--text-medium: #6B7280;
--text-light: #9CA3AF;
```

**Semantic Colors:**
```css
--success: #10B981;             /* Green - Benign results */
--warning: #F59E0B;             /* Amber - Caution */
--danger: #EF4444;              /* Red - Malignant results */
--info: #3B82F6;                /* Blue - Information */
```

**Gradient Palette:**
```css
--gradient-primary: linear-gradient(135deg, #FF69B4 0%, #C71585 100%);
--gradient-soft: linear-gradient(135deg, #FFF0F5 0%, #FFB6C1 100%);
--gradient-overlay: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 100%);
```

### **Typography**

**Font Families:**
```css
--font-display: 'Playfair Display', serif;    /* Elegant headings */
--font-body: 'Inter', 'Source Sans Pro', sans-serif;  /* Readable body */
--font-accent: 'Crimson Text', serif;         /* Special emphasis */
--font-mono: 'JetBrains Mono', monospace;     /* Code/data */
```

**Type Scale:**
```css
--text-xs: 0.75rem;      /* 12px */
--text-sm: 0.875rem;     /* 14px */
--text-base: 1rem;       /* 16px */
--text-lg: 1.125rem;     /* 18px */
--text-xl: 1.25rem;      /* 20px */
--text-2xl: 1.5rem;      /* 24px */
--text-3xl: 1.875rem;    /* 30px */
--text-4xl: 2.25rem;     /* 36px */
--text-5xl: 3rem;        /* 48px */
--text-6xl: 3.75rem;     /* 60px */
```

**Font Weights:**
```css
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### **Spacing System**
```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
```

### **Border Radius**
```css
--radius-sm: 0.375rem;   /* 6px - Small elements */
--radius-md: 0.5rem;     /* 8px - Cards, buttons */
--radius-lg: 0.75rem;    /* 12px - Large cards */
--radius-xl: 1rem;       /* 16px - Modals */
--radius-2xl: 1.5rem;    /* 24px - Hero sections */
--radius-full: 9999px;   /* Circular */
```

### **Shadows**
```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
--shadow-pink: 0 10px 30px rgba(255, 105, 180, 0.2);
--shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
```

### **Glassmorphism Effects**
```css
--glass-white: rgba(255, 255, 255, 0.7);
--glass-pink: rgba(255, 182, 193, 0.3);
--backdrop-blur: blur(10px);
--backdrop-blur-lg: blur(20px);
```

---

## 📄 Page-by-Page Design Specifications

### **1. LANDING PAGE** (`/`)

**Layout Structure:**
```
┌─────────────────────────────────────────────────────────────────┐
│                         HEADER (Fixed)                           │
│  🎀 Logo              Home  About  Features  Contact  [Login]   │
└─────────────────────────────────────────────────────────────────┘
│                                                                   │
│                    HERO SECTION (Full viewport)                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Left 50%: Text Content                                  │   │
│  │  ─────────────────────                                   │   │
│  │  H1: "AI-Powered Breast Cancer Detection"              │   │
│  │      (Playfair Display, 60px, Deep Rose)                │   │
│  │                                                           │   │
│  │  Tagline: "Empowering Doctors with Explainable AI"     │   │
│  │  (Inter, 20px, Medium Gray)                             │   │
│  │                                                           │   │
│  │  [Get Started →] [Learn More]                           │   │
│  │   (Deep Rose)     (Outline)                             │   │
│  │                                                           │   │
│  │────────────────────────────────────────────────────────│   │
│  │  Right 50%: Hero Visual                                 │   │
│  │  • Animated medical illustration OR                     │   │
│  │  • Abstract AI neural network visualization             │   │
│  │  • Soft pink gradient background                        │   │
│  │  • Floating particle effects                            │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│                    FEATURES SECTION                              │
│  ┌───────────────────────────────────────────────────────┐      │
│  │           "What Makes Us Different"                    │      │
│  │     (Centered H2, Playfair Display, 48px)              │      │
│  │                                                          │      │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐           │      │
│  │  │   Icon   │  │   Icon   │  │   Icon   │           │      │
│  │  │    🧠    │  │    🔍    │  │    📊    │           │      │
│  │  │          │  │          │  │          │           │      │
│  │  │ AI Model │  │Explainable│  │ Secure  │           │      │
│  │  │          │  │    AI     │  │  Data   │           │      │
│  │  │AdaBoost  │  │SHAP+LIME │  │ Privacy │           │      │
│  │  └──────────┘  └──────────┘  └──────────┘           │      │
│  │                                                          │      │
│  │  (Glass cards with pink gradient borders)               │      │
│  └───────────────────────────────────────────────────────┘      │
│                                                                   │
│                    HOW IT WORKS SECTION                          │
│  ┌───────────────────────────────────────────────────────┐      │
│  │              "Simple 3-Step Process"                   │      │
│  │                                                          │      │
│  │   1 ──→  2 ──→  3                                     │      │
│  │  Input   AI      Get                                   │      │
│  │  Data  Analysis Results                               │      │
│  │                                                          │      │
│  │  (Timeline with animated connecting lines)             │      │
│  └───────────────────────────────────────────────────────┘      │
│                                                                   │
│                    STATISTICS SECTION                            │
│  ┌───────────────────────────────────────────────────────┐      │
│  │  Background: Soft pink gradient                        │      │
│  │                                                          │      │
│  │    95%        500+       99.9%      24/7              │      │
│  │  Accuracy   Patients   Uptime    Support             │      │
│  │                                                          │      │
│  │  (Animated counter numbers)                            │      │
│  └───────────────────────────────────────────────────────┘      │
│                                                                   │
│                    CTA SECTION                                   │
│  ┌───────────────────────────────────────────────────────┐      │
│  │  "Ready to Transform Breast Cancer Detection?"        │      │
│  │                                                          │      │
│  │         [Create Account] [Contact Us]                 │      │
│  │                                                          │      │
│  │  Background: Deep rose gradient                        │      │
│  └───────────────────────────────────────────────────────┘      │
│                                                                   │
│                         FOOTER                                   │
│  ┌───────────────────────────────────────────────────────┐      │
│  │  About | Privacy | Terms | Contact                    │      │
│  │  © 2025 Breast Cancer CDSS                            │      │
│  │  Powered by Explainable AI                            │      │
│  └───────────────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────────┘
```

**Specific Design Elements:**

**Hero Section:**
- Background: Soft gradient from `#FFF0F5` to `#FFFFFF`
- Overlay: Subtle pink particles (CSS animations)
- H1 Typography: Playfair Display, 60px, Deep Rose (#C71585), font-weight: 700
- Tagline: Inter, 20px, Medium Gray (#6B7280)
- Primary CTA: Deep Rose background, white text, 16px padding, shadow-lg, hover: lift effect
- Secondary CTA: Transparent background, Deep Rose border/text, hover: filled

**Feature Cards:**
- Background: Glass effect (rgba(255, 255, 255, 0.7))
- Border: 2px solid pink with gradient
- Border radius: 1rem
- Padding: 2rem
- Shadow: shadow-pink on hover
- Icon: 64px, Primary Pink color
- Title: Crimson Text, 24px, Text Dark
- Description: Inter, 16px, Text Medium
- Transition: transform 0.3s ease, shadow 0.3s ease
- Hover: transform: translateY(-8px), enhanced shadow

---

### **2. LOGIN PAGE** (`/login`)

**Layout:**
```
┌─────────────────────────────────────────────────────────┐
│  Background: Full-screen soft pink gradient             │
│  ┌─────────────────────────────────────────────┐       │
│  │     CENTER CARD (Max-width: 450px)          │       │
│  │     Background: Glass white                  │       │
│  │     Border radius: xl                        │       │
│  │     Padding: 3rem                            │       │
│  │     Shadow: shadow-xl                        │       │
│  │                                               │       │
│  │     🎀 Logo (Center, 80px)                  │       │
│  │                                               │       │
│  │     "Welcome Back"                           │       │
│  │     H2, Playfair Display, 36px, Deep Rose   │       │
│  │                                               │       │
│  │     "Sign in to access your dashboard"      │       │
│  │     Text-medium, 16px                        │       │
│  │                                               │       │
│  │     ┌────────────────────────────┐          │       │
│  │     │ 📧 Email Address            │          │       │
│  │     │ [input field]              │          │       │
│  │     └────────────────────────────┘          │       │
│  │                                               │       │
│  │     ┌────────────────────────────┐          │       │
│  │     │ 🔒 Password                 │          │       │
│  │     │ [input field]              │          │       │
│  │     └────────────────────────────┘          │       │
│  │                                               │       │
│  │     [ ] Remember me    Forgot Password?     │       │
│  │                                               │       │
│  │     [  Sign In  ]                           │       │
│  │     (Full width button, Deep Rose)          │       │
│  │                                               │       │
│  │     ─────────── or ───────────              │       │
│  │                                               │       │
│  │     Don't have an account? Sign up          │       │
│  │     (Link, Primary Pink)                    │       │
│  │                                               │       │
│  └─────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────┘
```

**Form Input Styling:**
```css
input {
  background: #FFFFFF;
  border: 2px solid #E9ECEF;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  transition: all 0.3s ease;
}

input:focus {
  border-color: #FF69B4;
  outline: none;
  box-shadow: 0 0 0 3px rgba(255, 105, 180, 0.1);
}

button {
  background: linear-gradient(135deg, #FF69B4 0%, #C71585 100%);
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0.875rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(255, 105, 180, 0.3);
}
```

---

### **3. PATIENT DASHBOARD** (`/patient/dashboard`)

**Layout:**
```
┌──────────────────────────────────────────────────────────────┐
│  HEADER (Sticky top)                                          │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ 🎀 Logo    Patient Dashboard      🔔 👤 Jane Doe      │  │
│  └────────────────────────────────────────────────────────┘  │
├──────────────────────────────────────────────────────────────┤
│  MAIN CONTENT (Padding: 2rem)                                │
│                                                               │
│  Welcome back, Jane! 👋                                      │
│  (H3, Playfair Display, 32px)                                │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │           QUICK STATS (3 Cards in Row)                │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐          │   │
│  │  │   📋     │  │    🩺    │  │    📅    │          │   │
│  │  │ Records  │  │ Last Test│  │  Next    │          │   │
│  │  │    5     │  │ 2 weeks  │  │ Appt     │          │   │
│  │  │          │  │   ago    │  │ Feb 15   │          │   │
│  │  └──────────┘  └──────────┘  └──────────┘          │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │        RECENT PREDICTIONS                             │   │
│  │  ┌─────────────────────────────────────────────────┐ │   │
│  │  │ Date       Result    Confidence    [View]       │ │   │
│  │  │─────────────────────────────────────────────────│ │   │
│  │  │ Jan 15     Benign    95.2%        [Details]     │ │   │
│  │  │ Dec 10     Benign    92.8%        [Details]     │ │   │
│  │  └─────────────────────────────────────────────────┘ │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │        MEDICAL TIMELINE                               │   │
│  │  (Vertical timeline with dates and events)            │   │
│  │  • Jan 15, 2025 - Screening Test                     │   │
│  │  • Dec 10, 2024 - Follow-up                          │   │
│  │  • Nov 05, 2024 - Initial Consultation               │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
├──────────────────────────────────────────────────────────────┤
│  FOOTER                                                       │
└──────────────────────────────────────────────────────────────┘
```

**Card Styling:**
- Background: White with pink gradient border-top (4px)
- Border radius: lg
- Padding: 1.5rem
- Shadow: shadow-md, hover: shadow-lg
- Transition: transform 0.2s, shadow 0.2s
- Hover: translateY(-4px)

---

### **4. DOCTOR DASHBOARD** (`/doctor/dashboard`)

**Layout:**
```
┌────────────────────────────────────────────────────────────────┐
│  HEADER (Sticky)                                                │
│  🎀 Logo  Dr. Dashboard  [Search Patients...]  🔔 👤 Dr. Smith│
└────────────────────────────────────────────────────────────────┘
├─────────┬──────────────────────────────────────────────────────┤
│SIDEBAR  │  MAIN CONTENT AREA                                   │
│         │                                                       │
│ 📊 Dash │  Overview Tab                                        │
│ 👥 Pat  │  ┌─────────┬─────────┬─────────┬─────────┐         │
│ 🤖 AI   │  │ Total   │ This    │ Accuracy│ Active  │         │
│ 📈 Anal │  │Patients │  Month  │  Rate   │ Cases   │         │
│ ⚙️ Set  │  │  248    │   12    │  95.2%  │   18    │         │
│         │  └─────────┴─────────┴─────────┴─────────┘         │
│         │                                                       │
│         │  Recent Activity Feed                                │
│         │  ┌──────────────────────────────────────────┐       │
│         │  │ • Prediction run for Patient #145        │       │
│         │  │   2 hours ago                            │       │
│         │  │ • New patient registered                 │       │
│         │  │   5 hours ago                            │       │
│         │  │ • Medical record updated                 │       │
│         │  │   1 day ago                              │       │
│         │  └──────────────────────────────────────────┘       │
│         │                                                       │
│         │  Prediction Trends Chart                             │
│         │  [Line chart showing predictions over time]          │
│         │                                                       │
└─────────┴──────────────────────────────────────────────────────┘
```

**Sidebar Design:**
- Width: 240px
- Background: Linear gradient (Deep Rose to Primary Pink)
- Color: White
- Active item: Lighter background with left border
- Icons: 24px, matched with text
- Hover: Background opacity change

---

### **5. AI PREDICTION INTERFACE** (`/doctor/predict`)

**Layout:**
```
┌──────────────────────────────────────────────────────────────┐
│  AI Prediction Tool                                           │
│  (H2, Playfair Display, 40px, Deep Rose)                     │
│                                                               │
│  Step 1: Select Patient                                      │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ [Search patient by name or ID...]                      │ │
│  │                                                          │ │
│  │ Selected: Jane Doe (ID: #00145)                        │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                               │
│  Step 2: Input Clinical Features                             │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Feature Input Form (30 features in grid)              │ │
│  │  ┌──────────────┬──────────────┬──────────────┐       │ │
│  │  │ Radius Mean  │ Texture Mean │ Perimeter M  │       │ │
│  │  │ [____17.5__] │ [____21.3__] │ [____115.2_] │       │ │
│  │  └──────────────┴──────────────┴──────────────┘       │ │
│  │  (Continues for all 30 features...)                    │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                               │
│  [Run Prediction] (Large Deep Rose button)                   │
│                                                               │
│  ────────────────────────────────────────                   │
│                                                               │
│  RESULTS (Appears after prediction)                          │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Prediction Result                                      │ │
│  │  ┌──────────────────────────────────────────────────┐  │ │
│  │  │           BENIGN ✓                                │  │ │
│  │  │     (Large, Green, centered)                      │  │ │
│  │  │                                                    │  │ │
│  │  │  Confidence: 95.2%                                │  │ │
│  │  │  [Gauge chart visualization]                      │  │ │
│  │  └──────────────────────────────────────────────────┘  │ │
│  │                                                          │ │
│  │  Explainable AI Insights                                │ │
│  │  ┌──────────────────────────────────────────────────┐  │ │
│  │  │  SHAP Force Plot                                  │  │ │
│  │  │  [Interactive visualization]                      │  │ │
│  │  └──────────────────────────────────────────────────┘  │ │
│  │                                                          │ │
│  │  ┌──────────────────────────────────────────────────┐  │ │
│  │  │  Top Contributing Features                        │  │ │
│  │  │  1. Concave Points Mean: +0.34                   │  │ │
│  │  │  2. Worst Perimeter: +0.28                       │  │ │
│  │  │  3. Worst Radius: +0.21                          │  │ │
│  │  │  (Bar chart)                                      │  │ │
│  │  └──────────────────────────────────────────────────┘  │ │
│  │                                                          │ │
│  │  [Save to Records] [Generate PDF Report] [New Pred]    │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

---

## 🎭 Animation & Interaction Guidelines

### **Page Transitions**
```css
.page-enter {
  opacity: 0;
  transform: translateY(20px);
}

.page-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
}
```

### **Button Interactions**
- Hover: Lift 2px, enhanced shadow
- Active: Scale 0.98
- Ripple effect on click
- Loading state: Spinner inside button

### **Card Hover Effects**
- Default: shadow-md
- Hover: shadow-xl, translateY(-6px)
- Transition: 0.3s ease-in-out

### **Form Focus States**
- Border color change to Primary Pink
- Subtle glow (box-shadow)
- Label color change

### **Loading States**
- Skeleton screens with pink gradient shimmer
- Spinner: Pink circular loader
- Progress bars: Pink gradient fill

---

## 🔤 Component-Specific Styles

### **Header Component**
```css
.header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 105, 180, 0.1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 1rem 2rem;
}

.logo {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #C71585;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-link {
  color: #6B7280;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #FF69B4;
}

.nav-link.active {
  color: #C71585;
  border-bottom: 2px solid #C71585;
}
```

### **Card Component**
```css
.card {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border-top: 4px solid transparent;
  border-image: linear-gradient(to right, #FF69B4, #C71585) 1;
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 25px rgba(255, 105, 180, 0.15);
}

.card-title {
  font-family: 'Crimson Text', serif;
  font-size: 1.5rem;
  color: #1F2937;
  margin-bottom: 0.5rem;
}

.card-content {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: #6B7280;
  line-height: 1.6;
}
```

### **Button Variants**
```css
/* Primary Button */
.btn-primary {
  background: linear-gradient(135deg, #FF69B4 0%, #C71585 100%);
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0.875rem 2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(255, 105, 180, 0.3);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: #C71585;
  border: 2px solid #C71585;
  border-radius: 0.5rem;
  padding: 0.875rem 2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: #C71585;
  color: white;
}

/* Success Button */
.btn-success {
  background: #10B981;
  color: white;
  /* Similar structure */
}

/* Danger Button */
.btn-danger {
  background: #EF4444;
  color: white;
  /* Similar structure */
}
```

### **Table Styling**
```css
.table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: white;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.table thead {
  background: linear-gradient(135deg, #FFF0F5 0%, #FFB6C1 100%);
}

.table th {
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #C71585;
  border-bottom: 2px solid #FF69B4;
}

.table td {
  padding: 1rem;
  border-bottom: 1px solid #F8F9FA;
  color: #1F2937;
}

.table tbody tr:hover {
  background: #FFF5F7;
}
```

### **Badge Component**
```css
.badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
}

.badge-benign {
  background: #D1FAE5;
  color: #065F46;
}

.badge-malignant {
  background: #FEE2E2;
  color: #991B1B;
}

.badge-pending {
  background: #FEF3C7;
  color: #92400E;
}
```

---

## 📐 Responsive Breakpoints

```css
/* Mobile First Approach */

/* Small devices (phones) */
@media (max-width: 640px) {
  .container { padding: 1rem; }
  .grid { grid-template-columns: 1fr; }
  h1 { font-size: 2rem; }
}

/* Medium devices (tablets) */
@media (min-width: 768px) {
  .container { padding: 1.5rem; }
  .grid { grid-template-columns: repeat(2, 1fr); }
}

/* Large devices (desktops) */
@media (min-width: 1024px) {
  .container { max-width: 1200px; margin: 0 auto; }
  .grid { grid-template-columns: repeat(3, 1fr); }
}

/* Extra large devices */
@media (min-width: 1280px) {
  .container { max-width: 1400px; }
}
```

---

## ✨ Special UI Elements

### **Progress Indicator**
```css
.progress-bar {
  width: 100%;
  height: 8px;
  background: #F8F9FA;
  border-radius: 9999px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #FF69B4 0%, #C71585 100%);
  border-radius: 9999px;
  transition: width 0.3s ease;
}
```

### **Tooltip**
```css
.tooltip {
  position: relative;
}

.tooltip-content {
  position: absolute;
  background: #1F2937;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  white-space: nowrap;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
}

.tooltip:hover .tooltip-content {
  opacity: 1;
}
```

### **Modal Dialog**
```css
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-content {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  max-width: 600px;
  width: 90%;
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.3);
  animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## 🎨 Accessibility Considerations

1. **Color Contrast:** All text meets WCAG 2.1 AA standards (4.5:1 for normal text)
2. **Focus Indicators:** Visible focus states for all interactive elements
3. **ARIA Labels:** Proper labeling for screen readers
4. **Keyboard Navigation:** Tab order and keyboard shortcuts
5. **Alt Text:** Descriptive alt text for all images
6. **Form Validation:** Clear error messages with visual indicators
7. **Semantic HTML:** Proper heading hierarchy and landmarks

---

## 💎 Final Design Notes

**Key Principles:**
1. **Trust through Transparency:** Every prediction shows XAI explanations
2. **Compassionate Aesthetics:** Soft colors, rounded corners, gentle animations
3. **Medical Professionalism:** Clean layouts, clear typography, data-first approach
4. **Responsive Excellence:** Mobile-first design that works everywhere
5. **Performance:** Fast loading, smooth interactions, optimized assets

**Avoid:**
- ❌ Harsh contrasts or aggressive colors
- ❌ Cluttered layouts
- ❌ Generic stock medical images
- ❌ Overly playful or unprofessional elements
- ❌ Poor readability

**Embrace:**
- ✅ Soft gradients and glassmorphism
- ✅ Generous white space
- ✅ Meaningful micro-interactions
- ✅ Data visualizations that tell stories
- ✅ Elegant typography hierarchy

---

This design system creates a distinctive, trustworthy, and compassionate healthcare interface that stands out from generic medical portals while maintaining the professionalism required for a clinical decision support system.
