export interface Profile {
  fullName: string;
  description: string;
  details: string;
  thumbnailUrl: string;
  twitterUrl?: string | null;
  gitHubUrl?: string | null;
  linkedInUrl?: string | null;
  facebookUrl?: string | null;
  emailAddress?: string | null;
}

export interface Project {
  emoji: string;
  title: string;
  description: string;
  stacks: string[];
  href?: string | null;
  repositoryUrl?: string | null;
}

export interface Career {
  emoji: string;
  companyName: string;
  stacks: string[];
  roles: string[];
  joinedAt: string;
  leavedAt?: string | null;
}
