/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  fragment ProfileItem on Profile {\n    id\n    fullName\n    description\n    details\n    twitterUrl\n    gitHubUrl\n    linkedInUrl\n    facebookUrl\n    emailAddress\n  }\n": types.ProfileItemFragmentDoc,
    "\n  fragment ProjectItem on Project {\n    id\n    title\n    stacks\n    description\n    href\n    repositoryUrl\n  }\n": types.ProjectItemFragmentDoc,
    "\n  fragment CareerItem on Career {\n    id\n    companyName\n    stacks\n    roles\n    joinedAt\n    leavedAt\n  }\n": types.CareerItemFragmentDoc,
    "\n  query indexQuery {\n    profiles {\n      ...ProfileItem\n    }\n    projects {\n      ...ProjectItem\n    }\n    careers {\n      ...CareerItem\n    }\n  }\n": types.IndexQueryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ProfileItem on Profile {\n    id\n    fullName\n    description\n    details\n    twitterUrl\n    gitHubUrl\n    linkedInUrl\n    facebookUrl\n    emailAddress\n  }\n"): (typeof documents)["\n  fragment ProfileItem on Profile {\n    id\n    fullName\n    description\n    details\n    twitterUrl\n    gitHubUrl\n    linkedInUrl\n    facebookUrl\n    emailAddress\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ProjectItem on Project {\n    id\n    title\n    stacks\n    description\n    href\n    repositoryUrl\n  }\n"): (typeof documents)["\n  fragment ProjectItem on Project {\n    id\n    title\n    stacks\n    description\n    href\n    repositoryUrl\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CareerItem on Career {\n    id\n    companyName\n    stacks\n    roles\n    joinedAt\n    leavedAt\n  }\n"): (typeof documents)["\n  fragment CareerItem on Career {\n    id\n    companyName\n    stacks\n    roles\n    joinedAt\n    leavedAt\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query indexQuery {\n    profiles {\n      ...ProfileItem\n    }\n    projects {\n      ...ProjectItem\n    }\n    careers {\n      ...CareerItem\n    }\n  }\n"): (typeof documents)["\n  query indexQuery {\n    profiles {\n      ...ProfileItem\n    }\n    projects {\n      ...ProjectItem\n    }\n    careers {\n      ...CareerItem\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;