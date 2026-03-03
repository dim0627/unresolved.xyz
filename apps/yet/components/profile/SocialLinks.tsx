import {
  Facebook,
  Github,
  Linkedin,
  type LucideIcon,
  Mail,
  Twitter,
} from 'lucide-react';
import type { FC } from 'react';
import type { Profile } from '../../types/content';

interface SocialLinksProps {
  profile: Profile;
}

export const SocialLinks: FC<SocialLinksProps> = ({ profile }) => {
  return (
    <ul className="flex list-none gap-4 max-md:justify-center">
      {profile.twitterUrl && <Item href={profile.twitterUrl} Icon={Twitter} />}
      {profile.gitHubUrl && <Item href={profile.gitHubUrl} Icon={Github} />}
      {profile.linkedInUrl && (
        <Item href={profile.linkedInUrl} Icon={Linkedin} />
      )}
      {profile.facebookUrl && (
        <Item href={profile.facebookUrl} Icon={Facebook} />
      )}
      {profile.emailAddress && (
        <Item href={`mailto:${profile.emailAddress}`} Icon={Mail} />
      )}
    </ul>
  );
};

interface ItemProps {
  href: string;
  Icon: LucideIcon;
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
