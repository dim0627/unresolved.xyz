import { Careers, Footer, Profile, Projects, Section } from '@components';
import { graphql } from '@graphql';
import { graphqlClient } from '@libs';
import type { InferGetStaticPropsType } from 'next';
import Head from 'next/head';

export default function Index(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  return (
    <>
      <Head>
        <title>dtsuji@dim0627 - Portfolio</title>
      </Head>
      <Section>
        <Profile profile={props.profile} />
      </Section>
      <Section title="Projects">
        <Projects projects={props.projects} />
      </Section>
      <Section title="Careers">
        <Careers careers={props.careers} />
      </Section>
      <Footer />
    </>
  );
}

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

export async function getStaticProps() {
  const { profiles, projects, careers } =
    await graphqlClient.request(IndexQuery);

  return {
    props: {
      projects,
      careers,
      profile: profiles[0],
    },
    revalidate: 60 * 60 * 12,
  };
}
