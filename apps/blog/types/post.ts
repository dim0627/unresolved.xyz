export interface Post {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  body: string;
  draft?: boolean;
}
