export interface Profile {
  fullName: string;
  description: string;
  thumbnailUrl: string;
  twitterUrl?: string | null;
  gitHubUrl?: string | null;
  linkedInUrl?: string | null;
  facebookUrl?: string | null;
  emailAddress?: string | null;
}

export interface Project {
  image?: string | null;
  title: string;
  description: string;
  stacks: string[];
  href?: string | null;
  repositoryUrl?: string | null;
  closed?: boolean;
}

export interface Career {
  /** lucide-static の SVG を `?raw` で読み込んだ文字列。ビルド時にインライン展開される。 */
  icon: string;
  companyName: string;
  stacks: string[];
  roles: string[];
  joinedAt: string;
  leavedAt?: string | null;
}
