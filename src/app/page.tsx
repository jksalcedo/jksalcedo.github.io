import PageFooter from '@/components/page-footer';
import PageHeader from '@/components/page-header';
import AboutSection from '@/components/sections/about';
import ContactSection from '@/components/sections/contact';
import HeroSection from '@/components/sections/hero';
import RepositoriesSection from '@/components/sections/repositories';
import SkillsSection from '@/components/sections/skills';
import { getPinnedRepos, getUser } from '@/lib/github';
import FadeInSection from '@/components/fade-in-section';

export default async function Home() {
  // Fetch data in parallel
  const [user, repos] = await Promise.all([
    getUser('jksalcedo'),
    getPinnedRepos('jksalcedo')
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <PageHeader />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16 sm:py-24 space-y-24 md:space-y-32">
          <FadeInSection>
            <HeroSection user={user} />
          </FadeInSection>
          <FadeInSection>
            <AboutSection />
          </FadeInSection>
          <FadeInSection>
            <RepositoriesSection repos={repos} />
          </FadeInSection>
          <FadeInSection>
            <SkillsSection repos={repos} />
          </FadeInSection>
          <FadeInSection>
            <ContactSection />
          </FadeInSection>
        </div>
      </main>
      <PageFooter />
    </div>
  );
}
