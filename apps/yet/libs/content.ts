import { careers } from '../content/careers';
import { profile } from '../content/profile';
import { projects } from '../content/projects';
import type { Career, Profile, Project } from '../types/content';

export function getProfile(): Profile {
  return profile;
}

export function getProjects(): Project[] {
  return projects;
}

export function getCareers(): Career[] {
  return careers.toSorted(
    (a, b) => new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime(),
  );
}
