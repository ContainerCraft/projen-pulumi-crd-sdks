import * as projen from 'projen';
import { synthSnapshot } from 'projen/lib/util/synth';

import { PulumiCrdSdksProject } from '../../src';
import { WorkflowBuildCheckDirty } from '../../src/github';

describe('GithubActionsWorkflow', () => {

  test('is generated when GitHub is enabled', () => {
    // GIVEN
    const project = new projen.github.GitHubProject({
      name: 'test-project',
      github: true,
    });

    // WHEN
    new WorkflowBuildCheckDirty(project);
    const snapshot = synthSnapshot(project);

    // THEN
    expect(snapshot['.github/workflows/main.yml']).toBeDefined();
  });

  test('contains mise installation steps', () => {
    // GIVEN
    const project = new projen.github.GitHubProject({
      name: 'test-project',
      github: true,
    });

    // WHEN
    new WorkflowBuildCheckDirty(project);
    const snapshot = synthSnapshot(project);
    const workflow = snapshot['.github/workflows/main.yml'];

    // THEN
    expect(workflow).toContain('Install mise');
    expect(workflow).toContain('uses: jdx/mise-action@v2');
    expect(workflow).toContain('Install tools');
    expect(workflow).toContain('mise install');
  });

  test('contains build step', () => {
    // GIVEN
    const project = new projen.github.GitHubProject({
      name: 'test-project',
      github: true,
    });

    // WHEN
    new WorkflowBuildCheckDirty(project);
    const snapshot = synthSnapshot(project);
    const workflow = snapshot['.github/workflows/main.yml'];

    // THEN
    expect(workflow).toContain('make build');
  });

  test('contains git clean check', () => {
    // GIVEN
    const project = new projen.github.GitHubProject({
      name: 'test-project',
      github: true,
    });

    // WHEN
    new WorkflowBuildCheckDirty(project);
    const snapshot = synthSnapshot(project);
    const workflow = snapshot['.github/workflows/main.yml'];

    // THEN
    expect(workflow).toContain('Check Git workspace is clean');
    expect(workflow).toContain('git diff --exit-code');
  });

  test('fails on changed files', () => {
    // GIVEN
    const project = new projen.github.GitHubProject({
      name: 'test-project',
      github: true,
    });

    // WHEN
    new WorkflowBuildCheckDirty(project);
    const snapshot = synthSnapshot(project);
    const workflow = snapshot['.github/workflows/main.yml'];

    // THEN
    expect(workflow).toContain('Fail if there are changed files');
    expect(workflow).toContain('git status --porcelain');
  });

  test('triggers on push, pull request, and workflow dispatch', () => {
    // GIVEN
    const project = new projen.github.GitHubProject({
      name: 'test-project',
      github: true,
    });

    // WHEN
    new WorkflowBuildCheckDirty(project);
    const snapshot = synthSnapshot(project);
    const workflow = snapshot['.github/workflows/main.yml'];

    // THEN
    expect(workflow).toContain('push:');
    expect(workflow).toContain('branches:');
    expect(workflow).toContain('- main');
    expect(workflow).toContain('pull_request:');
    expect(workflow).toContain('workflow_dispatch:');
  });

  test('includes checkout step', () => {
    // GIVEN
    const project = new projen.github.GitHubProject({
      name: 'test-project',
      github: true,
    });

    // WHEN
    new WorkflowBuildCheckDirty(project);
    const snapshot = synthSnapshot(project);
    const workflow = snapshot['.github/workflows/main.yml'];

    // THEN
    expect(workflow).toContain('Checkout');
    expect(workflow).toContain('actions/checkout@v4');
  });

  test('has correct job permissions', () => {
    // GIVEN
    const project = new projen.github.GitHubProject({
      name: 'test-project',
      github: true,
    });

    // WHEN
    new WorkflowBuildCheckDirty(project);
    const snapshot = synthSnapshot(project);
    const workflow = snapshot['.github/workflows/main.yml'];

    // THEN
    expect(workflow).toContain('permissions:');
    expect(workflow).toContain('contents: read');
  });

  test('runs on ubuntu-latest', () => {
    // GIVEN
    const project = new projen.github.GitHubProject({
      name: 'test-project',
      github: true,
    });

    // WHEN
    new WorkflowBuildCheckDirty(project);
    const snapshot = synthSnapshot(project);
    const workflow = snapshot['.github/workflows/main.yml'];

    // THEN
    expect(workflow).toContain('runs-on: ubuntu-latest');
  });

  test('does not create workflow when GitHub is not enabled', () => {
    // GIVEN
    const project = new projen.Project({
      name: 'test-project',
    });

    // WHEN
    new WorkflowBuildCheckDirty(project);
    const snapshot = synthSnapshot(project);

    // THEN
    expect(snapshot['.github/workflows/main.yml']).toBeUndefined();
  });

  test('can be added to PulumiCrdSdksProject', () => {
    // GIVEN
    const project = new PulumiCrdSdksProject({
      name: 'pulumi-k8s-test',
      crdUrls: ['https://example.com/crds.yaml'],
    });

    // WHEN
    const snapshot = synthSnapshot(project);
    const workflow = snapshot['.github/workflows/main.yml'];

    // THEN
    expect(workflow).toBeDefined();
    expect(workflow).toContain('mise install');
    expect(workflow).toContain('make build');
  });

});