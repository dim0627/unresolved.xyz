import { type FragmentType, graphql, useFragment } from '@graphql';
import Image from 'next/image';
import type { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  detailStyle,
  headingStyle,
  heroStyle,
  nameStyle,
  thumbnailStyle,
} from './index.css';
import { SocialLinks } from './SocialLinks';

export const ProfileFragment = graphql(/* GraphQL */ `
  fragment ProfileItem on Profile {
    id
    thumbnail {
      url
    }
    fullName
    description
    details
    twitterUrl
    gitHubUrl
    linkedInUrl
    facebookUrl
    emailAddress
  }
`);

interface ProfileProps {
  profile: FragmentType<typeof ProfileFragment>;
}

export const Profile: FC<ProfileProps> = (props) => {
  const profile = useFragment(ProfileFragment, props.profile);

  return (
    <>
      <div className={heroStyle}>
        <div>
          <div className={headingStyle}>
            <Image
              src={profile.thumbnail.url}
              alt={profile.fullName}
              width={128}
              height={128}
              className={thumbnailStyle}
            />
            <div>
              <h1 className={nameStyle}>{profile.fullName}</h1>
              <div>{profile.description}</div>
            </div>
          </div>
          <SocialLinks profile={profile} />
        </div>
      </div>
      <ReactMarkdown
        components={{
          a: ({ node, ...props }) => (
            <a target="_blank" rel="nofollow noreferrer" {...props} />
          ),
        }}
        className={detailStyle}
      >
        {profile.details}
      </ReactMarkdown>
    </>
  );
};
