# 🚀 Dhruv Chaudhari - Full Stack Developer Portfolio

A modern, interactive portfolio website built with React, TypeScript, and Tailwind CSS. Featuring smooth animations, responsive design, and scroll-driven project showcases.

**[🌐 Live Demo](https://dhruvresum.netlify.app)** — Visit the live site

---

## ✨ Features

- **Interactive Hero Section** - Giant name with a cut-out illustrated portrait layered in front of it, mouse-driven depth parallax, and a dimmed 3D Spline background (desktop only; phones and reduced-motion users get a lightweight gradient)
- **Live Elements** - Availability badge with a live Pune clock, "Updated X ago" badges on project cards and a "Recently on GitHub" list, all pulled from the public GitHub API (cached 10 minutes, hidden if GitHub is unreachable)
- **Interactive Details** - Continuously drifting project marquee, 3D cursor tilt on project screenshots, staggered skill tags and a copy-email button
- **Floating Section Nav** - Appears after the hero with an animated active-section indicator and scroll progress bar
- **Magnetic CTAs** - Contact buttons drift toward the cursor with a light sweep on hover
- **Smooth Animations** - Fade-in effects, word-by-word scroll text reveal, and smooth transitions
- **Responsive Design** - Fully optimized for mobile, tablet, and desktop devices
- **Project Showcase** - Sticky card animations with scale effects on scroll
- **Skills** - Skill areas with the tools for each shown as tags
- **About Section** - Decorative elements with scroll parallax
- **Contact CTA** - Call-to-action buttons throughout the site
- **Modern UI** - Gradient text, dark theme, and polished aesthetics

---

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS + PostCSS
- **Build Tool**: Vite
- **Animation**: Framer Motion
- **Icons**: lucide-react
- **3D**: Spline viewer (hero background)
- **Development**: ESLint, Node.js

---

## 📦 Installation

### Prerequisites
- Node.js (v20 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/DhruvChaudhari130905/My-Portfolio.git
   cd My-Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:3000`

4. **Build for production**
   ```bash
   npm run build
   ```

---

## 📁 Project Structure

```
My-Portfolio/
├── src/
│   ├── components/        # Reusable components
│   │   ├── ContactCTA.tsx
│   │   ├── FadeIn.tsx
│   │   ├── FloatingNav.tsx
│   │   ├── LiveProjectButton.tsx
│   │   ├── MagneticHover.tsx
│   │   ├── RevealText.tsx
│   │   └── ScrollCharacterText.tsx
│   ├── sections/         # Page sections
│   │   ├── HeroSection.tsx
│   │   ├── MarqueeSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   └── FooterSection.tsx
│   ├── hooks/            # Custom React hooks
│   │   ├── useMagneticHover.ts
│   │   └── useScrollOffset.ts
│   ├── lib/              # Shared constants (nav links, easing)
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── public/               # Static assets
│   ├── assets/           # Images (WebP for project shots & decorations)
│   └── favicon.svg
├── index.html
├── package.json
└── tailwind.config.js
```

---

## 🎨 Customization

### Update Personal Info
Edit the content in `/src/sections/` files:
- **HeroSection.tsx** - Main headline and portrait
- **FooterSection.tsx** - Contact links (LinkedIn, email, GitHub)
- **src/lib/nav.ts** - Navigation links
- **AboutSection.tsx** - Bio text and decorative images
- **SkillsSection.tsx** - Skills list
- **ProjectsSection.tsx** - Project portfolio items

### Add Projects
Update the `projects` array in `ProjectsSection.tsx`:
```typescript
const projects: Project[] = [
  {
    number: '01',
    name: 'Your Project',
    category: 'Tech Stack',
    liveUrl: 'https://your-project.example.com', // button is hidden when empty
    platform: 'web', // 'web': 16:9 screenshots, 'mobile': portrait phone screens
    images: ['assets/main.webp', 'assets/side-1.webp', 'assets/side-2.webp'],
  },
  // Add more projects...
];
```

### Modify Styling
- Colors and theme: `tailwind.config.js`
- Global styles: `src/index.css`
- Component-specific styles: Use Tailwind classes in component files

---

## 🎯 Key Components

### MagneticHover
Creates a magnetic hover effect where elements follow cursor movement within a defined radius.

### ScrollCharacterText
Lights text up word by word as it scrolls through the viewport.

### FadeIn
Smoothly fades elements in with customizable delay and direction.

---

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Small**: 640px - 768px
- **Medium**: 768px - 1024px
- **Large**: 1024px+

---

## 🚀 Deployment

The live site is hosted on Netlify.

### Deploy on Netlify
1. Connect your Git repository to [Netlify](https://netlify.com)
2. Set build command: `npm run build`
3. Set publish directory: `dist`

### Deploy on Vercel
1. Connect your GitHub repo to [Vercel](https://vercel.com)
2. Vercel detects Vite automatically and deploys on every push

---

## 🔧 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
```

---

## 📝 About

This portfolio website showcases my work as a **Full Stack Developer** specializing in:
- Frontend Development (React, Next.js, TypeScript)
- Backend Engineering (Node.js, Express, Python)
- Database Design (PostgreSQL, MongoDB)
- AI & Machine Learning Integration
- DevOps & Cloud Deployment

---

## 🤝 Contributing

This is a personal portfolio project, but feel free to fork it and use it as a template for your own!

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👤 Author

**Dhruv Chaudhari**
- 🌐 Portfolio: [dhruvresum.netlify.app](https://dhruvresum.netlify.app)
- 💼 LinkedIn: [dhruv-chaudhari-a49518320](https://www.linkedin.com/in/dhruv-chaudhari-a49518320/)
- 🐙 GitHub: [DhruvChaudhari130905](https://github.com/DhruvChaudhari130905)
- 📧 Email: [dhruvchaudhari411@gmail.com](mailto:dhruvchaudhari411@gmail.com)

---

## 🙏 Acknowledgments

- Built with [React](https://react.dev)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Animations with [Framer Motion](https://www.framer.com/motion)
- Icons from [Lucide](https://lucide.dev)
- 3D scene with [Spline](https://spline.design)

---

**Made with ❤️ by Dhruv Chaudhari**
