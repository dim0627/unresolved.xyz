import type { ProjectItemFragment } from '@graphql/graphql';
import type { FC } from 'react';
import { FiGithub, FiLink } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';

interface ProjectProps {
  project: ProjectItemFragment;
}

export const Project: FC<ProjectProps> = ({ project }) => {
  return (
    <div className="rounded-3xl border-2 border-base shadow-bordered">
      <div className="px-6 pt-4 pb-4">
        <header className="flex">
          <span className="mt-2 mr-4 text-[2rem] leading-8">
            {project.emoji}
          </span>
          <div>
            <h3 className="font-bold text-2xl">{project.title}</h3>
            <ReactMarkdown>{project.description}</ReactMarkdown>
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
                  <FiLink size={15} />
                </a>
              </li>
            )}
            {project.repositoryUrl && (
              <li>
                <a
                  href={project.repositoryUrl}
                  rel="nofollow noreferrer"
                  target="_blank"
                  aria-label="repository url"
                  className="inline-flex rounded-2xl border border-base px-4 py-2 shadow-button"
                >
                  <FiGithub size={15} />
                </a>
              </li>
            )}
          </ul>
        </footer>
      )}
    </div>
  );
};
