# Projen.io project type for generating Pulumi SDKs of Kubernetes CRDs

[Projen](https://projen.io) is a multi-language tool to automate the setup of a new project. 
It provides a consistent and opinionated way to bootstrap projects, manage dependencies, 
and enforce best practices across different programming languages and frameworks.

This project is specifically designed to generate Pulumi SDKs for 
Kubernetes Custom Resource Definitions (CRDs), allowing developers to easily 
integrate custom resources into their Pulumi-based infrastructure as code projects.

## Testing

This project type is tested using unit tests as the first step. 
These unit tests ensure that the generated SDKs are correctly structured and 
function as expected, covering key aspects such as resource creation, 
deletion, and validation.

Second step is to test the project type on an actual project. For easy testing,
you can configure the project consuming this project type to use a local copy of the project.

Info from https://github.com/projen/projen/discussions/4049

You can bootstrap a new project from a local tar file of this project type. First create a soft-link to
the archive created by `npm run build` in this project:

```shell
cd dist/js
ln -s projen-pulumi-crd-skds@0.0.0.jsii.tgz projen-pulumi-crd-skds.tgz
```

In the project consuming this project type, you can now run `projen` pointing to the local archive:

```shell
cd <path-to-consuming-project>
projen new  --from <relative-path-to-project-type>/projen-pulumi-crd-skds.tgz
```