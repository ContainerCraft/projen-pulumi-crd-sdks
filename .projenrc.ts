import { cdk, javascript } from 'projen';
import { GithubCredentials } from 'projen/lib/github';
import { AppPermission, JobPermission } from 'projen/lib/github/workflows-model';
import { UpgradeDependenciesSchedule } from 'projen/lib/javascript';

const appCredentials = GithubCredentials.fromApp({
  appIdSecret: 'PROJEN_APP_ID',
  privateKeySecret: 'PROJEN_APP_PRIVATE_KEY',
  owner: 'containercraft',
  permissions: {
    contents: AppPermission.WRITE,
    pullRequests: AppPermission.WRITE,
    workflows: AppPermission.WRITE,
  },
});

const project = new cdk.JsiiProject({
  author: 'Ringo De Smet',
  authorAddress: 'ringo@de-smet.name',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.9.0',
  name: '@containercraft/projen-pulumi-crd-sdks',
  packageManager: javascript.NodePackageManager.NPM,
  projenrcTs: true,
  repositoryUrl: 'https://github.com/containercraft/projen-pulumi-crd-sdks.git',
  release: true,

  packageName: '@containercraft/projen-pulumi-crd-sdks',
  description: 'Projen project type to generate Pulumi SDKs for Kubernetes CRDs',
  npmAccess: javascript.NpmAccess.PUBLIC,
  keywords: ['projen', 'pulumi', 'kubernetes', 'crd-sdks'],

  /* Runtime dependencies of this module. */
  deps: ['constructs', 'projen'],
  /* Build dependencies for this module. */
  devDeps: ['@jsii/spec'],
  /* Peer dependencies for this module. */
  peerDeps: ['constructs', 'projen'],

  projenCredentials: appCredentials,

  depsUpgradeOptions: {
    workflowOptions: {
      labels: ['auto-approve'],
      schedule: UpgradeDependenciesSchedule.WEEKLY,
      permissions: {
        contents: JobPermission.READ,
        pullRequests: JobPermission.WRITE,
      },
      projenCredentials: appCredentials,
    },
  },
});

project.release?.publisher.publishToNpm({
  trustedPublishing: true,
});

project.synth();
