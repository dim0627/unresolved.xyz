import { type FragmentType, graphql, useFragment } from '@graphql';
import type { FC } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
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
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 2 }}>
      <Masonry className="list-none" gutter="1.5rem">
        {projects.map((project) => (
          <li key={project.id}>
            <Project project={project} />
          </li>
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};
