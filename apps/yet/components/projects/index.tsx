import type { FC } from 'react';
import type { Project as ProjectType } from '../../types/content';
import { Project } from './Project';

interface Props {
  projects: ProjectType[];
}

export const Projects: FC<Props> = ({ projects }) => {
  return (
    <ul className="list-none columns-1 gap-6 sm:columns-2">
      {projects.map((project) => (
        <li key={project.title} className="mb-6 break-inside-avoid">
          <Project project={project} />
        </li>
      ))}
    </ul>
  );
};
