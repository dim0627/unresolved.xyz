import { FC } from "react";
import { FragmentType, useFragment, graphql } from "@graphql";
import { Career } from "./Career";
import { containerStyle } from "./index.css";

const CareerFragment = graphql(/* GraphQL */ `
  fragment CareerItem on Career {
    id
    emoji
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

  return (
    <div className={containerStyle}>
      {careers.map((career) => (
        <Career key={career.id} career={career} />
      ))}
    </div>
  );
};
