import { Careers, Footer, Profile, Projects, Section } from '@components';
import { getCareers, getProfile, getProjects } from '@libs';

export default function Page() {
  const profile = getProfile();
  const projects = getProjects();
  const careers = getCareers();

  return (
    <>
      <Section>
        <Profile profile={profile} />
      </Section>
      <Section title="Projects">
        <Projects projects={projects} />
      </Section>
      <Section title="Careers">
        <Careers careers={careers} />
      </Section>
      <Footer />
    </>
  );
}
