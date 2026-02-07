import { Careers, Footer, Profile, Projects, Section } from '@components';
import { graphql } from '@graphql';
import { graphqlClient } from '@libs';

export const revalidate = 43200;

const IndexQuery = graphql(/* GraphQL */ `
  query indexQuery {
    profiles {
      ...ProfileItem
    }
    projects(orderBy: position_DESC) {
      ...ProjectItem
    }
    careers(orderBy: joinedAt_ASC) {
      ...CareerItem
    }
  }
`);

export default async function Page() {
  const { profiles, projects, careers } =
    await graphqlClient.request(IndexQuery);

  return (
    <>
      <Section>
        <Profile profile={profiles[0]} />
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
