import { ProjectItemFragment } from "@graphql/graphql";
import { FC } from "react";
import { FiGithub, FiLink } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import {
  containerStyle,
  titleStyle,
  emojiStyle,
  headerStyle,
  bodyStyle,
  footerStyle,
} from "./Project.css";
import {
  stacksStyle,
  stackItemStyle,
  linksStyle,
  linkItemStyle,
} from "./Project.css";

interface ProjectProps {
  project: ProjectItemFragment;
}

export const Project: FC<ProjectProps> = ({ project }) => {
  return (
    <div className={containerStyle}>
      <div className={bodyStyle}>
        <header className={headerStyle}>
          <span className={emojiStyle}>{project.emoji}</span>
          <div>
            <h3 className={titleStyle}>{project.title}</h3>
            <ReactMarkdown>{project.description}</ReactMarkdown>
          </div>
        </header>
        <ul className={stacksStyle}>
          {project.stacks.map((stack) => (
            <li key={stack} className={stackItemStyle}>
              {stack}
            </li>
          ))}
        </ul>
      </div>
      {(project.href || project.repositoryUrl) && (
        <footer className={footerStyle}>
          <ul className={linksStyle}>
            {project.href && (
              <li>
                <a
                  href={project.href}
                  aria-label={project.title}
                  className={linkItemStyle}
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
                  className={linkItemStyle}
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
