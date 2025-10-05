# TourTogether Design Guidelines

## Design Approach: Productivity-Inspired Minimalism

**Selected Approach**: Design System (Apple HIG + Linear-inspired aesthetics)  
**Rationale**: As a utility-focused trip planning tool, the app prioritizes clarity, organization, and ease of use. Drawing from Linear's clean typography and Apple's content-first philosophy ensures the interface stays out of the way while making itinerary creation and sharing effortless.

**Core Principles**:
- Information clarity over decoration
- Generous whitespace for breathing room
- Card-based organization for clear content separation
- Immediate visual hierarchy through typography

---

## Color Palette

### Light Mode
- **Background**: 0 0% 99% (off-white)
- **Surface/Cards**: 0 0% 100% (pure white)
- **Borders**: 220 13% 91% (soft gray)
- **Primary**: 210 100% 50% (bright blue - travel-inspired)
- **Text Primary**: 220 20% 20% (near black)
- **Text Secondary**: 220 10% 50% (medium gray)

### Dark Mode
- **Background**: 220 20% 12% (deep charcoal)
- **Surface/Cards**: 220 18% 16% (elevated surface)
- **Borders**: 220 10% 25% (subtle borders)
- **Primary**: 210 100% 60% (lighter blue for contrast)
- **Text Primary**: 0 0% 95% (off-white)
- **Text Secondary**: 220 8% 65% (muted gray)

---

## Typography

**Font Family**: Inter (Google Fonts)
- **Headings**: 600-700 weight, tight tracking
- **Body**: 400 weight, relaxed line-height (1.6)
- **Labels/Meta**: 500 weight, uppercase for section labels

**Scale**:
- Hero/Page Title: text-4xl (36px)
- Section Headers: text-2xl (24px)
- Card Titles: text-lg (18px)
- Body Text: text-base (16px)
- Meta/Labels: text-sm (14px)
- Captions: text-xs (12px)

---

## Layout System

**Spacing Primitives**: Use Tailwind units of **2, 4, 6, 8, 12, 16**
- Micro spacing: p-2, gap-2 (between related items)
- Component padding: p-4, p-6 (card interiors)
- Section spacing: py-8, py-12 (vertical rhythm)
- Page margins: px-4 (mobile), px-8 (desktop)

**Container Strategy**:
- Max-width: max-w-6xl for main content
- Centered: mx-auto
- Responsive padding: px-4 md:px-6 lg:px-8

**Grid Patterns**:
- Itinerary list: Single column, stacked cards
- Daily activities: Vertical timeline layout
- Trip overview: 2-column on desktop (details + map/image)

---

## Component Library

### Navigation
- **Header**: Fixed top bar with logo, simple nav (Create Trip, How It Works)
- Minimal chrome, border-bottom on scroll
- Mobile: Hamburger menu for secondary links

### Cards
- **Trip Card**: Rounded corners (rounded-lg), shadow-sm, hover:shadow-md transition
- White background (light mode), elevated surface (dark mode)
- Clear title, dates, destination with icons
- Share button prominent in top-right

### Forms
- **Input Fields**: Clean borders (border-gray-300), focus:ring-2 ring-primary
- Labels above inputs, helper text below
- Generous padding (p-3)
- Date pickers: Native HTML5 styled consistently

### Buttons
- **Primary**: bg-primary, white text, rounded-lg, px-6 py-3
- **Secondary**: border-2 border-primary, text-primary, bg-transparent
- **Icon Buttons**: Circular or square with padding, hover:bg-gray-100

### Timeline/Itinerary Display
- **Daily Section**: Date header with divider line
- **Activity Items**: Left-aligned time, card for each activity
- Visual timeline with dots/lines connecting activities
- Location badges with map pin icons

### Shareable Link Component
- Copy-to-clipboard input with auto-select
- Success toast notification on copy
- QR code generation for easy mobile sharing

---

## Icons

**Library**: Heroicons (via CDN)
- Calendar for dates
- MapPin for locations
- Clock for times
- Share for sharing functionality
- Plus for adding items
- Copy for link copying

---

## Images

### Hero Section
- **Large hero image**: Inspirational travel scene (mountains, beach, cityscape)
- Overlay with semi-transparent gradient (bottom to top, dark to transparent)
- Centered headline and CTA over image
- Height: 60vh on desktop, 50vh on mobile

### Trip Cards
- **Optional thumbnail**: Small landscape image (aspect-ratio-video) showing destination
- Fallback: Subtle gradient background with destination icon

### Empty States
- Friendly illustration for "No trips yet" state
- Minimal, line-art style consistent with clean aesthetic

---

## Animations

**Minimal & Purposeful Only**:
- Page transitions: Subtle fade-in on route change (150ms)
- Card hover: Gentle shadow elevation (200ms ease)
- Button feedback: Scale on click (transform scale-95, 100ms)
- Toast notifications: Slide-in from top (300ms)

**No**: Auto-playing carousels, parallax effects, or decorative animations

---

## Key Screens/Layouts

### Home/Landing
- Hero with travel image, headline "Plan trips together, effortlessly"
- CTA: "Create Your First Trip"
- 3 feature highlights (Create, Share, Collaborate) in horizontal cards
- Example itinerary preview

### Create/Edit Trip
- Clean form with logical sections
- Trip basics (name, dates, destination)
- Add daily activities with inline forms
- Live preview panel on desktop (2-column split)

### View Shared Itinerary
- Full itinerary display, read-only
- Prominent trip details at top
- Timeline view of all days/activities
- Export/print options
- "Create Your Own" CTA at bottom

### Trip List (My Trips)
- Grid of trip cards (1 column mobile, 2-3 columns desktop)
- Filter/sort options (by date, destination)
- Quick actions: Share, Edit, Delete

---

**Design Philosophy**: Every element serves the user's goal of quickly creating, viewing, and sharing beautiful trip itineraries. The design is invisible—focusing attention on the content while providing delightful, friction-free interactions.