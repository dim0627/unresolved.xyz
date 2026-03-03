import type { LucideIcon } from 'lucide-react';

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
  image?: string | null;
  title: string;
  description: string;
  stacks: string[];
  href?: string | null;
  repositoryUrl?: string | null;
  closed?: boolean;
}

export interface Career {
  icon: LucideIcon;
  companyName: string;
  stacks: string[];
  roles: string[];
  joinedAt: string;
  leavedAt?: string | null;
}
