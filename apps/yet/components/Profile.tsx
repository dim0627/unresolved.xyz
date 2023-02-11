import { FC } from "react";
import { FragmentType, useFragment, graphql } from "@graphql";

const ProfileFragment = graphql(/* GraphQL */ `
  fragment ProfileItem on Profile {
    id
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

interface Props {
  profile: FragmentType<typeof ProfileFragment>;
}

export const Profile: FC<Props> = (props) => {
  const profile = useFragment(ProfileFragment, props.profile);

  return <>{profile.fullName}</>;
};
