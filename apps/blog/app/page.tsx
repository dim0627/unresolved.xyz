import { ContentfulService } from "@libs";
import { List } from "./list";
import { Metadata } from "next";

export const revalidate = 60 * 60; // revalidate every hour

export default async function Page() {
  const client = new ContentfulService();
  const posts = await client.getPosts();

  return <List items={posts.items} />;
}

export const metadata: Metadata = {
  title: "blog.unresolved.xyz",
};
