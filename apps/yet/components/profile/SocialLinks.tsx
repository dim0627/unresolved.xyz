import type { ProfileItemFragment } from '@graphql/graphql';
import type { FC } from 'react';
import type { IconType } from 'react-icons';
import {
  FiFacebook,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiTwitter,
} from 'react-icons/fi';

interface SocialLinksProps {
  profile: ProfileItemFragment;
}

export const SocialLinks: FC<SocialLinksProps> = ({ profile }) => {
  return (
    <ul className="flex list-none gap-4 max-md:justify-center">
      {profile.twitterUrl && (
        <Item href={profile.twitterUrl} Icon={FiTwitter} />
      )}
      {profile.gitHubUrl && <Item href={profile.gitHubUrl} Icon={FiGithub} />}
      {profile.linkedInUrl && (
        <Item href={profile.linkedInUrl} Icon={FiLinkedin} />
      )}
      {profile.facebookUrl && (
        <Item href={profile.facebookUrl} Icon={FiFacebook} />
      )}
      {profile.emailAddress && (
        <Item href={`mailto:${profile.emailAddress}`} Icon={FiMail} />
      )}
    </ul>
  );
};

interface ItemProps {
  href: string;
  Icon: IconType;
}

const Item: FC<ItemProps> = ({ href, Icon }) => {
  return (
    <li>
      <a
        href={href}
        rel="nofollow noreferrer"
        target="_blank"
        className="inline-flex rounded-2xl border border-base p-4 shadow-button"
      >
        <Icon size={20} />
      </a>
    </li>
  );
};
