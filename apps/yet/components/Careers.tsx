import { FC } from "react";
import { FragmentType, useFragment, graphql } from "@graphql";

const CareerFragment = graphql(/* GraphQL */ `
  fragment CareerItem on Career {
    id
    companyName
    stacks
    roles
    joinedAt
    leavedAt
  }
`);

interface Props {
  careers: FragmentType<typeof CareerFragment>[];
}

export const Careers: FC<Props> = (props) => {
  const careers = useFragment(CareerFragment, props.careers);

  return <>{careers.map((p) => p.id)}</>;
};
