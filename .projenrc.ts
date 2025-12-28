import { cdk, javascript } from 'projen';
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
  depsUpgrade: false,

  packageName: '@containercraft/projen-pulumi-crd-sdks',
  description: 'Projen project type to generate Pulumi SDKs for Kubernetes CRDs',

  /* Runtime dependencies of this module. */
  deps: ['constructs', 'projen'],
  /* Build dependencies for this module. */
  devDeps: ['@jsii/spec'],
  /* Peer dependencies for this module. */
  peerDeps: ['constructs', 'projen'],
});

project.synth();