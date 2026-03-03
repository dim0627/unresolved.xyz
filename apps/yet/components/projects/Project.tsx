import { Github, Link } from 'lucide-react';
import Image from 'next/image';
import type { FC } from 'react';
import type { Project as ProjectType } from '../../types/content';

interface ProjectProps {
  project: ProjectType;
}

export const Project: FC<ProjectProps> = ({ project }) => {
  return (
    <div className={project.closed ? 'opacity-60' : ''}>
      <header className="flex items-start gap-4">
        {project.image && (
          <Image
            src={project.image}
            alt={project.title}
            width={48}
            height={48}
            className={`h-12 w-12 shrink-0 ${project.closed ? 'grayscale' : ''}`}
          />
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-xl">
              {project.title}
              {project.closed && (
                <span className="ml-2 rounded-full border border-base/30 px-2 py-0.5 align-middle font-normal text-xs">
                  Closed
                </span>
              )}
            </h3>
            <span className="ml-auto flex shrink-0 gap-2">
              {project.href && (
                <a href={project.href} aria-label={project.title}>
                  <Link size={15} />
                </a>
              )}
              {project.repositoryUrl && (
                <a
                  href={project.repositoryUrl}
                  rel="nofollow noreferrer"
                  target="_blank"
                  aria-label="Repository on GitHub"
                >
                  <Github size={15} />
                </a>
              )}
            </span>
          </div>
          <p className="text-base">{project.description}</p>
        </div>
      </header>
      <ul className="mt-2 flex list-none flex-wrap gap-2">
        {project.stacks.map((stack) => (
          <li
            key={stack}
            className="inline-block rounded-full border border-base/10 px-3 py-1 text-xs"
          >
            {stack}
          </li>
        ))}
      </ul>
    </div>
  );
};
