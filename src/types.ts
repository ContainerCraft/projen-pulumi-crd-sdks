import { ProjectOptions } from 'projen';

export interface NodePackageInfo {
  /**
   * Name of the NPM package.
   *
   * @example "cert-manager"
   * @default ""
   */
  readonly name: string;
  readonly namespace?: string;
}

export interface PythonPackageInfo {
  /**
   * Name of the Python package.
   *
   * @example "cert_manager"
   * @default ""
   */
  readonly name: string;
  readonly prefix?: string;
}

export interface DotnetPackageInfo {
  /**
   * Name of the .NET Nuget package.
   *
   * @example "CertManager"
   * @default ""
   */
  readonly name: string;

  /**
   * Namespace of the .NET Nuget package.
   *
   * @default ""
   */
  readonly namespace?: string;
}

export interface JavaPackageInfo {
  /**
   * Name of the Java package.
   *
   * @example "certmanager"
   * @default ""
   */
  readonly name: string;
  readonly basePackage?: string;
}

/**
 * Github location of the upstream project to track for new releases.
 */
export interface GithubRepository {
  /**
   * Github owner (user or organization) of the upstream project.
   *
   * @example "cert-manager"
   * @default ""
   */
  readonly owner: string;

  /**
   * Github repository of the upstream project.
   *
   * @example "cert-manager"
   * @default ""
   */
  readonly repository: string;
}

export interface PulumiCrdSdksProjectOptions extends ProjectOptions {
  /**
   * Github location of the upstream project to track for new releases.
   */
  readonly upstreamProject?: GithubRepository;

  /**
   * Latest version of the SDKs released on this branch. This value shall be updated automatically by the project.
   * This should be a semantic version (MAJOR.MINOR.PATCH), without a preceding 'v'.
   *
   * @default "1.0.0"
   */
  readonly latestVersionOnBranch: string;

  /**
   * List of HTTPS URLs containing the ${VERSION} placeholder.
   *
   * @default [ "https://raw.githubusercontent.com/cert-manager/cert-manager/${VERSION}/deploy/crds/certmanager.k8s.io_certificates.yaml" ]
   */
  readonly crdUrls: string[];

  /**
   * NPM package details
   */
  readonly nodePackage?: NodePackageInfo;

  /**
   * Python package details
   */
  readonly pythonPackage?: PythonPackageInfo;

  /**
   * .NET Nuget package details
   */
  readonly dotnetPackage?: DotnetPackageInfo;

  /**
   * Go package details
   */
  readonly goPackage?: string;

  /**
   * Java package details
   */
  readonly javaPackage?: JavaPackageInfo;

}