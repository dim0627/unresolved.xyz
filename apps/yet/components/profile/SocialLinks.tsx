import {
  FiMail,
  FiFacebook,
  FiLinkedin,
  FiGithub,
  FiTwitter,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { FC } from "react";
import { container, item } from "./SocialLinks.css";
import { ProfileItemFragment } from "@graphql/graphql";

interface SocialLinksProps {
  profile: ProfileItemFragment;
}

export const SocialLinks: FC<SocialLinksProps> = ({ profile }) => {
  return (
    <ul className={container}>
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
      <a href={href} rel="nofollow noreferrer" target="_blank" className={item}>
        <Icon size={20} />
      </a>
    </li>
  );
};
