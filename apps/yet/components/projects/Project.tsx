import type { ProjectItemFragment } from '@graphql/graphql';
import type { FC } from 'react';
import { FiGithub, FiLink } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';

interface ProjectProps {
  project: ProjectItemFragment;
}

export const Project: FC<ProjectProps> = ({ project }) => {
  return (
    <div className="border-2 border-base rounded-3xl shadow-bordered">
      <div className="px-6 pt-4 pb-4">
        <header className="flex">
          <span className="text-[2rem] mt-2 mr-4 leading-8">{project.emoji}</span>
          <div>
            <h3 className="text-2xl font-bold">{project.title}</h3>
            <ReactMarkdown>{project.description}</ReactMarkdown>
          </div>
        </header>
        <ul className="flex gap-2 list-none flex-wrap mt-2">
          {project.stacks.map((stack) => (
            <li
              key={stack}
              className="inline-block py-1 px-3 text-[.7rem] border border-base/10 rounded-full"
            >
              {stack}
            </li>
          ))}
        </ul>
      </div>
      {(project.href || project.repositoryUrl) && (
        <footer className="px-6 py-4 border-t-2 border-dashed border-base">
          <ul className="flex gap-2 list-none">
            {project.href && (
              <li>
                <a
                  href={project.href}
                  aria-label={project.title}
                  className="inline-flex border border-base rounded-2xl shadow-button py-2 px-4"
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
                  className="inline-flex border border-base rounded-2xl shadow-button py-2 px-4"
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
