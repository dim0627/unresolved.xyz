import { FC } from "react";
import { graphql } from "@graphql";
import { FragmentType, useFragment } from "../src/gql/fragment-masking";

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

interface Props {
  projects: FragmentType<typeof ProjectFragment>[];
}

export const Projects: FC<Props> = (props) => {
  const projects = useFragment(ProjectFragment, props.projects);

  return <>{projects.map((p) => p.id)}</>;
};
