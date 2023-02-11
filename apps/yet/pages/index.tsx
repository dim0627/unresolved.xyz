import type { InferGetStaticPropsType } from "next";
import { Profile, Projects, Careers } from "@components";
import { graphqlClient } from "@libs";
import { graphql } from "@graphql";

export default function Index(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <div>
      <h1>Web</h1>
      <Profile profile={props.profile} />
      <Projects projects={props.projects} />
      <Careers careers={props.careers} />
    </div>
  );
}

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
