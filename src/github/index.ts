export * from './workflow-build-check-dirty';

/**
 * Github location of the upstream project to track for new releases.
 */
export interface GithubRepository {
  readonly owner: string;
  readonly repository: string;
}
