import { type FragmentType, graphql, useFragment } from '@graphql';
import Image from 'next/image';
import type { FC } from 'react';
import ReactMarkdown from 'react-markdown';
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
      <div className="flex h-[40vh] items-center max-md:block">
        <div>
          <div className="mb-6 flex items-center max-md:flex-col">
            <Image
              src={profile.thumbnail.url}
              alt={profile.fullName}
              width={128}
              height={128}
              className="mr-8 rounded-[12%] shadow-bordered max-md:mr-0"
            />
            <div>
              <h1 className="text-[3rem] max-md:mt-4">{profile.fullName}</h1>
              <div>{profile.description}</div>
            </div>
          </div>
          <SocialLinks profile={profile} />
        </div>
      </div>
      <div className="profile-detail mt-12">
        <ReactMarkdown
          components={{
            a: (props) => (
              <a target="_blank" rel="nofollow noreferrer" {...props} />
            ),
          }}
        >
          {profile.details}
        </ReactMarkdown>
      </div>
    </>
  );
};
