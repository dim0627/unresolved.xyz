import Image from 'next/image';
import type { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import type { Profile as ProfileType } from '../../types/content';
import { SocialLinks } from './SocialLinks';

interface ProfileProps {
  profile: ProfileType;
}

export const Profile: FC<ProfileProps> = ({ profile }) => {
  return (
    <>
      <div className="py-24">
        <div>
          <div className="mb-6 flex items-center max-md:flex-col">
            <Image
              src={profile.thumbnailUrl}
              alt={profile.fullName}
              width={128}
              height={128}
              className="mr-8 rounded-2xl shadow-bordered max-md:mr-0"
            />
            <div>
              <h1 className="text-5xl max-md:mt-4">{profile.fullName}</h1>
              <div>{profile.description}</div>
            </div>
          </div>
          <SocialLinks profile={profile} />
        </div>
      </div>
      <div className="mt-12">
        <ReactMarkdown
          components={{
            h2: (props) => <h2 className="mt-8 mb-4 text-xl" {...props} />,
            p: (props) => <p className="my-4" {...props} />,
            ul: (props) => (
              <ul className="pl-6 [list-style:revert]" {...props} />
            ),
            ol: (props) => (
              <ol className="pl-6 [list-style:revert]" {...props} />
            ),
            a: (props) => (
              <a
                className="underline"
                target="_blank"
                rel="nofollow noreferrer"
                {...props}
              />
            ),
          }}
        >
          {profile.details}
        </ReactMarkdown>
      </div>
    </>
  );
};
