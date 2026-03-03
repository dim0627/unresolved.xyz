import type { FC } from 'react';
import type { Project as ProjectType } from '../../types/content';
import { Project } from './Project';

interface Props {
  projects: ProjectType[];
}

export const Projects: FC<Props> = ({ projects }) => {
  return (
    <div className="flex flex-col gap-8">
      {projects.map((project) => (
        <div key={project.title}>
          <Project project={project} />
        </div>
      ))}
    </div>
  );
};
