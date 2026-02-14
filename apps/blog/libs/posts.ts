import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { Post } from '../types/post';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export function getPosts(): Post[] {
  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith('.md'));

  const posts: Post[] = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const filePath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      date: data.date,
      tags: data.tags || [],
      body: content,
      draft: data.draft ?? false,
    };
  });

  return posts
    .filter((p) => !p.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPost(slug: string): Post | undefined {
  const filePath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return undefined;
  }

  const fileContents = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title,
    date: data.date,
    tags: data.tags || [],
    body: content,
    draft: data.draft ?? false,
  };
}

export function getAllPostSlugs(): string[] {
  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith('.md'));
  return fileNames.map((f) => f.replace(/\.md$/, ''));
}
