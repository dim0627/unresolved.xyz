import { Github, Link } from 'lucide-react';
import Image from 'next/image';
import type { FC } from 'react';
import type { Project as ProjectType } from '../../types/content';

interface ProjectProps {
  project: ProjectType;
}

export const Project: FC<ProjectProps> = ({ project }) => {
  return (
    <div
      className={`rounded-3xl border-2 shadow-bordered ${project.closed ? 'border-base/40' : 'border-base'}`}
    >
      <div className={`px-6 pt-4 pb-4 ${project.closed ? 'opacity-60' : ''}`}>
        <header className="flex">
          {project.image && (
            <Image
              src={project.image}
              alt={project.title}
              width={48}
              height={48}
              className={`mt-2 mr-4 h-12 w-12 ${project.closed ? 'grayscale' : ''}`}
            />
          )}
          <div>
            <h3 className="font-bold text-xl">
              {project.title}
              {project.closed && (
                <span className="ml-2 rounded-full border border-base/30 px-2 py-0.5 align-middle font-normal text-xs">
                  Closed
                </span>
              )}
            </h3>
            <p className="text-base">{project.description}</p>
          </div>
        </header>
        <ul className="mt-2 flex list-none flex-wrap gap-2">
          {project.stacks.map((stack) => (
            <li
              key={stack}
              className="inline-block rounded-full border border-base/10 px-3 py-1 text-[.7rem]"
            >
              {stack}
            </li>
          ))}
        </ul>
      </div>
      {(project.href || project.repositoryUrl) && (
        <footer className="border-base border-t-2 border-dashed px-6 py-4">
          <ul className="flex list-none gap-2">
            {project.href && (
              <li>
                <a
                  href={project.href}
                  aria-label={project.title}
                  className="inline-flex rounded-2xl border border-base px-4 py-2 shadow-button"
                >
                  <Link size={15} />
                </a>
              </li>
            )}
            {project.repositoryUrl && (
              <li>
                <a
                  href={project.repositoryUrl}
                  rel="nofollow noreferrer"
                  target="_blank"
                  aria-label="Repository on GitHub"
                  className="inline-flex rounded-2xl border border-base px-4 py-2 shadow-button"
                >
                  <Github size={15} />
                </a>
              </li>
            )}
          </ul>
        </footer>
      )}
    </div>
  );
};
