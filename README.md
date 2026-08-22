# 🚀 Dhruv Chaudhari - Full Stack Developer Portfolio

A modern, interactive portfolio website built with React, TypeScript, and Tailwind CSS. Featuring smooth animations, responsive design, and project showcases with magnetic hover effects.

**[🌐 Live Demo][((https://mybasefolio.netlify.app))]** — Visit the live site

---

## ✨ Features

- **Interactive Hero Section** - Magnetic hover effect on profile image, stays positioned on right
- **Smooth Animations** - Fade-in effects, scroll-character text animations, and smooth transitions
- **Responsive Design** - Fully optimized for mobile, tablet, and desktop devices
- **Project Showcase** - Sticky card animations with scale effects on scroll
- **Skills Grid** - Beautiful skills section with organized layout
- **About Section** - Decorative elements with parallax support
- **Contact CTA** - Call-to-action buttons throughout the site
- **Modern UI** - Gradient text, dark theme, and polished aesthetics

---

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + PostCSS
- **Build Tool**: Vite
- **Animation**: Framer Motion
- **UI Components**: shadcn/ui
- **Development**: ESLint, Node.js

---

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio/app
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
app/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── FadeIn.tsx
│   │   ├── MagneticHover.tsx
│   │   ├── ContactCTA.tsx
│   │   └── ui/           # shadcn/ui components
│   ├── sections/         # Page sections
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   └── FooterSection.tsx
│   ├── hooks/            # Custom React hooks
│   │   └── useMagneticHover.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── public/               # Static assets
│   └── assets/
├── index.html
├── package.json
└── tailwind.config.js
```

---

## 🎨 Customization

### Update Personal Info
Edit the content in `/src/sections/` files:
- **HeroSection.tsx** - Main headline and nav
- **AboutSection.tsx** - Bio text and decorative images
- **SkillsSection.tsx** - Skills list
- **ProjectsSection.tsx** - Project portfolio items

### Add Projects
Update the `projects` array in `ProjectsSection.tsx`:
```typescript
const projects = [
  {
    number: '01',
    name: 'Your Project',
    category: 'Tech Stack',
    col1Images: ['/assets/image1.jpg', '/assets/image2.jpg'],
    col2Image: '/assets/image3.jpg',
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
Animates text character-by-character as the section comes into view.

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

### Deploy on Vercel (Recommended)
1. Push your repository to GitHub
2. Connect your GitHub repo to [Vercel](https://vercel.com)
3. Vercel will auto-deploy on every push

### Deploy on Netlify
1. Build the project: `npm run build`
2. Connect your Git repository to [Netlify](https://netlify.com)
3. Set build command: `npm run build`
4. Set publish directory: `dist`

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
- 🌐 Portfolio: [dhruvresum.netlify.app](https://your-portfolio-url.com)
- 💼 LinkedIn: [https://www.linkedin.com/in/dhruv-chaudhari-a49518320/](https://linkedin.com)
- 🐙 GitHub: [https://github.com/DhruvChaudhari130905](https://github.com)
- 📧 Email: dhruvchaudhari411@gmail.com

---

## 🙏 Acknowledgments

- Built with [React](https://react.dev)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Animations with [Framer Motion](https://www.framer.com/motion)
- UI Components from [shadcn/ui](https://ui.shadcn.com)

---

**Made with ❤️ by Dhruv Chaudhari**
