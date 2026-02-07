import { type FragmentType, graphql, useFragment } from '@graphql';
import type { FC } from 'react';
import { Project } from './Project';

const ProjectFragment = graphql(/* GraphQL */ `
  fragment ProjectItem on Project {
    id
    emoji
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

  return (
    <ul className="list-none columns-1 gap-6 sm:columns-2">
      {projects.map((project) => (
        <li key={project.id} className="mb-6 break-inside-avoid">
          <Project project={project} />
        </li>
      ))}
    </ul>
  );
};
