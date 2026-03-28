import { Link } from 'lucide-react';

// Github brand icon (removed from lucide-react v1.x)
const GithubIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <title>GitHub</title>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

import Image from 'next/image';
import type { FC } from 'react';
import type { Project as ProjectType } from '../../types/content';

interface ProjectProps {
  project: ProjectType;
}

export const Project: FC<ProjectProps> = ({ project }) => {
  return (
    <div className={project.closed ? 'opacity-60' : ''}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        {project.image && (
          <Image
            src={project.image}
            alt={project.title}
            width={64}
            height={64}
            className={`h-16 w-16 shrink-0 ${project.closed ? 'grayscale' : ''}`}
          />
        )}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-bold text-2xl">
              {project.title}
              {project.closed && (
                <span className="ml-2 rounded-full border border-base/30 px-2 py-0.5 align-middle font-normal text-xs">
                  Closed
                </span>
              )}
            </h3>
            <span className="ml-auto flex shrink-0 gap-2">
              {project.href && (
                <a
                  href={project.href}
                  aria-label={project.title}
                  className="rounded-full bg-base/5 p-3"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Link size={15} />
                </a>
              )}
              {project.repositoryUrl && (
                <a
                  href={project.repositoryUrl}
                  rel="nofollow noreferrer"
                  target="_blank"
                  aria-label="Repository on GitHub"
                  className="rounded-full bg-base/5 p-3"
                >
                  <GithubIcon size={15} />
                </a>
              )}
            </span>
          </div>
          <p className="text-base">{project.description}</p>
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
      </div>
    </div>
  );
};
