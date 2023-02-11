import { graphqlClient } from "@libs";
import { graphql } from "src/gql";
import { Button } from "ui";

export default function Web() {
  return (
    <div>
      <h1>Web</h1>
      <Button />
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

const ProjectFragment = graphql(/* GraphQL */ `
  fragment ProjectItem on Project {
    id
    title
    stacks
    description
    href
    repositoryUrl
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
  const res = await graphqlClient.request(IndexQuery);

  return {
    props: {}, // will be passed to the page component as props
  };
}
