import type { InferGetStaticPropsType } from "next";
import { Projects } from "@components";
import { graphqlClient } from "@libs";
import { graphql } from "@graphql";

export default function Index(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <div>
      <h1>Web</h1>
      <Projects projects={props.projects} />
    </div>
  );
}

const ProfileFragment = graphql(/* GraphQL */ `
  fragment ProfileItem on Profile {
    id
    fullName
    description
    details
    twitterUrl
    gitHubUrl
    linkedInUrl
    facebookUrl
    emailAddress
  }
`);

const CareerFragment = graphql(/* GraphQL */ `
  fragment CareerItem on Career {
    id
    companyName
    stacks
    roles
    joinedAt
    leavedAt
  }
`);

const IndexQuery = graphql(/* GraphQL */ `
  query indexQuery {
    profiles {
      ...ProfileItem
    }
    projects {
      ...ProjectItem
    }
    careers {
      ...CareerItem
    }
  }
`);

export async function getStaticProps() {
  const { profiles, projects, careers } = await graphqlClient.request(
    IndexQuery
  );

  return {
    props: {
      projects,
      careers,
      profile: profiles[0],
    },
    revalidate: 60 * 60 * 12,
  };
}
