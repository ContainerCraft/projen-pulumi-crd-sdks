import { cdk, javascript } from 'projen';
const project = new cdk.JsiiProject({
  author: 'Ringo De Smet',
  authorAddress: 'ringo@de-smet.name',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.9.0',
  name: 'projen-pulumi-crd-sdks',
  packageManager: javascript.NodePackageManager.NPM,
  projenrcTs: true,
  repositoryUrl: 'https://github.com/containercraft/projen-pulumi-crd-sdks.git',

  packageName: '@containercraft/projen-pulumi-crd-sdks',
  description: 'Projen project type to generate Pulumi SDKs for Kubernetes CRDs',

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
  peerDeps: ['constructs', 'projen'],
});
project.synth();