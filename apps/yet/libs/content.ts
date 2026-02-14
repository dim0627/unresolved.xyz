import careersData from '../content/careers.json';
import profileData from '../content/profile.json';
import projectsData from '../content/projects.json';
import type { Career, Profile, Project } from '../types/content';

export function getProfile(): Profile {
  return profileData as Profile;
}

export function getProjects(): Project[] {
  return projectsData as Project[];
}

export function getCareers(): Career[] {
  return careersData as Career[];
}
