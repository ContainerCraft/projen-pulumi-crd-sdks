# Contributing to the Projen project type to manage Pulumi Kubernetes CRD SDKs

Thanks for your interest in contributing to this projen project type! ❤️

This document describes how to set up a development environment and submit your contributions. Please read it carefully and let us know if it's not up-to-date (or even better, submit a pull request with your corrections! 😉).

## Prerequisites

1. [mise-en-place](https://mise.jdx.dev/)

The tool above manages all the prerequisites for you at a project level.

## Development

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
ln -s projen-pulumi-crd-sdks@0.0.0.jsii.tgz projen-pulumi-crd-sdks.tgz
```

In the project consuming this project type, you can now run `projen` pointing to the local archive:

```shell
cd <path-to-consuming-project>
projen new  --from <relative-path-to-project-type>/projen-pulumi-crd-sdks.tgz
```
