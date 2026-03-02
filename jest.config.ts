import { getJestProjectsAsync } from '@nx/jest';
import type { Config } from 'jest';

// Jest configuration for the entire monorepo
export default async (): Promise<Config> => ({
  projects: await getJestProjectsAsync(),
});
