import { cdk, javascript } from 'projen';
import { GithubCredentials } from 'projen/lib/github';
import { AppPermission, JobPermission } from 'projen/lib/github/workflows-model';
import { UpgradeDependenciesSchedule } from 'projen/lib/javascript';

const project = new cdk.JsiiProject({
  author: 'Ringo De Smet',
  authorAddress: 'ringo@de-smet.name',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.9.0',
  name: '@containercraft/projen-pulumi-crd-sdks',
  packageManager: javascript.NodePackageManager.NPM,
  projenrcTs: true,
  repositoryUrl: 'https://github.com/containercraft/projen-pulumi-crd-sdks.git',
  release: false,

  packageName: '@containercraft/projen-pulumi-crd-sdks',
  description: 'Projen project type to generate Pulumi SDKs for Kubernetes CRDs',

  /* Runtime dependencies of this module. */
  deps: ['constructs', 'projen'],
  /* Build dependencies for this module. */
  devDeps: ['@jsii/spec'],
  /* Peer dependencies for this module. */
  peerDeps: ['constructs', 'projen'],

  projenCredentials: GithubCredentials.fromApp({
    appIdSecret: 'PROJEN_APP_ID',
    privateKeySecret: 'PROJEN_APP_PRIVATE_KEY',
    owner: 'containercraft',
    permissions: {
      contents: AppPermission.WRITE,
      pullRequests: AppPermission.WRITE,
      workflows: AppPermission.WRITE,
    },
  }),

  depsUpgradeOptions: {
    workflowOptions: {
      labels: ['auto-approve'],
      schedule: UpgradeDependenciesSchedule.WEEKLY,
      permissions: {
        contents: JobPermission.READ,
        pullRequests: JobPermission.WRITE,
      },
    },
  },

});

project.synth();