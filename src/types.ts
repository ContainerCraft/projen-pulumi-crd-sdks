import { ProjectOptions } from 'projen';

export interface NodePackageInfo {
  readonly name: string;
  readonly namespace?: string;
}

export interface PythonPackageInfo {
  readonly name: string;
  readonly prefix?: string;
}

export interface DotnetPackageInfo {
  readonly name: string;
  readonly namespace?: string;
}

export interface JavaPackageInfo {
  readonly name: string;
  readonly basePackage?: string;
}

export interface PackageNames {
  readonly node: NodePackageInfo;
  readonly python: PythonPackageInfo;
  readonly dotnet: DotnetPackageInfo;
  readonly go: string;
  readonly java?: JavaPackageInfo;
}

/**
 * Github location of the upstream project to track for new releases.
 */
export interface GithubRepository {
  readonly owner: string;
  readonly repository: string;
}

export interface PulumiCrdSdksProjectOptions extends ProjectOptions {
  /**
   * Github location of the upstream project to track for new releases.
   *
   * @featured
   */
  readonly upstreamProject?: GithubRepository;

  /**
   * Latest version of the SDKs released on this branch. This value shall be updated automatically by the project.
   * This should be a semantic version (MAJOR.MINOR.PATCH), without a preceding 'v'.
   *
   * @featured
   * @default: 1.0.0
   */
  readonly latestVersionOnBranch?: string;

  /**
   * List of HTTPS URLs containing the ${VERSION} placeholder.
   *
   * @featured
   */
  readonly crdUrls?: string[];

  /**
   * Package names for the generated Pulumi SDKs.
   *
   * @featured
   */
  readonly packageNames: PackageNames;
}