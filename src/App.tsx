import { HeroSection } from '@/sections/HeroSection';
import { MarqueeSection } from '@/sections/MarqueeSection';
import { AboutSection } from '@/sections/AboutSection';
import { SkillsSection } from '@/sections/SkillsSection';
import { ProjectsSection } from '@/sections/ProjectsSection';
import { FooterSection } from '@/sections/FooterSection';

function App() {
  return (
    <main style={{ 
      overflowX: 'clip', 
      background: '#0C0C0C',
      contain: 'layout style paint',
    }}>
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <FooterSection />
    </main>
  );
}

export default App;
