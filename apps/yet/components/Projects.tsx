import { FC } from "react";
import { FragmentType, useFragment, graphql } from "@graphql";

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
