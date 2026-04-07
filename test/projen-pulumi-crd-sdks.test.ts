import { synthSnapshot } from 'projen/lib/util/synth';
import { PulumiCrdSdksProject } from '../src';

const packageNames = {
  nodePackage: {
    name: '/package',
    namespace: '@owner',
  },
  pythonPackage: {
    name: 'package',
    prefix: 'owner',
  },
  dotnetPackage: {
    name: 'Package',
    namespace: 'Owner',
  },
  goPackage: 'example',
  javaPackage: {
    name: 'crdpackage',
    basePackage: 'com.owner',
  },
};

describe('PulumiCrdSdksProject', () => {
  test('mise.toml is generated', () => {
    // GIVEN
    const project = new PulumiCrdSdksProject({
      name: 'pulumi-k8s-cert-manager',
      latestVersionOnBranch: '1.0.0',
      crdUrls: ['https://example.com/crds.yaml'],
      upstreamProject: {
        owner: 'cert-manager',
        repository: 'cert-manager',
      },
      ...packageNames,
    });

    // WHEN
    const snapshot = synthSnapshot(project);

    // THEN
    expect(snapshot['mise.toml']).toBe(`[tools]
'github:pulumi/crd2pulumi' = '1.6.1'`,
    );
  });

  test('LICENSE is generated', () => {
    // GIVEN
    const project = new PulumiCrdSdksProject({
      name: 'pulumi-k8s-cert-manager',
      latestVersionOnBranch: '1.0.0',
      crdUrls: ['https://example.com/crds.yaml'],
      upstreamProject: {
        owner: 'cert-manager',
        repository: 'cert-manager',
      },
      ...packageNames,
    });

    // WHEN
    const snapshot = synthSnapshot(project);

    // THEN
    expect(snapshot.LICENSE).not.toBe(undefined);
    expect(snapshot.LICENSE).toContain('Apache License');
  });

  test('Makefile is generated', () => {
    // GIVEN
    const project = new PulumiCrdSdksProject({
      name: 'pulumi-k8s-cert-manager',
      crdUrls: [
        'https://raw.githubusercontent.com/cert-manager/cert-manager/v${VERSION}/deploy/charts/cert-manager/templates/crds.yaml',
        'https://raw.githubusercontent.com/cert-manager/cert-manager/v${VERSION}/deploy/charts/cert-manager/templates/another.yaml',
      ],
      latestVersionOnBranch: '1.0.0',
      upstreamProject: {
        owner: 'cert-manager',
        repository: 'cert-manager',
      },
      ...packageNames,
    });

    // WHEN
    const snapshot = synthSnapshot(project);

    // THEN
    expect(snapshot.Makefile).toContain('VERSION ?= 1.0.0');
    expect(snapshot.Makefile).toContain(
      'https://raw.githubusercontent.com/cert-manager/cert-manager/v$(VERSION)/deploy/charts/cert-manager/templates/crds.yaml',
    );
    expect(snapshot.Makefile).toContain(
      'https://raw.githubusercontent.com/cert-manager/cert-manager/v$(VERSION)/deploy/charts/cert-manager/templates/another.yaml',
    );
  });

  test('throws error when crdUrls is empty', () => {
    // GIVEN
    const options = {
      name: 'pulumi-k8s-cert-manager',
      latestVersionOnBranch: '1.0.0',
      crdUrls: [],
      upstreamProject: {
        owner: 'cert-manager',
        repository: 'cert-manager',
      },
      ...packageNames,
    };

    // WHEN & THEN
    expect(() => new PulumiCrdSdksProject(options)).toThrow(
      'crdUrls cannot be empty',
    );
  });

  test('throws error when crdUrls contains URLs from different projects', () => {
    // GIVEN
    const options = {
      name: 'pulumi-k8s-mixed',
      latestVersionOnBranch: '1.0.0',
      crdUrls: [
        'https://raw.githubusercontent.com/cert-manager/cert-manager/v${VERSION}/deploy/charts/cert-manager/templates/crds.yaml',
        'https://raw.githubusercontent.com/external-secrets/external-secrets/v${VERSION}/deploy/crds/bundle.yaml',
      ],
      upstreamProject: {
        owner: 'cert-manager',
        repository: 'cert-manager',
      },
      ...packageNames,
    };

    // WHEN & THEN
    expect(() => new PulumiCrdSdksProject(options)).toThrow(
      'All crdUrls must point to the same project',
    );
  });

  test('works with github.com URLs', () => {
    // GIVEN
    const project = new PulumiCrdSdksProject({
      name: 'pulumi-k8s-github',
      latestVersionOnBranch: '1.0.0',
      crdUrls: [
        'https://github.com/cert-manager/cert-manager/raw/v${VERSION}/deploy/charts/cert-manager/templates/crds.yaml',
        'https://github.com/cert-manager/cert-manager/raw/v${VERSION}/deploy/charts/cert-manager/templates/another.yaml',
      ],
      upstreamProject: {
        owner: 'cert-manager',
        repository: 'cert-manager',
      },
      ...packageNames,
    });

    // WHEN
    const snapshot = synthSnapshot(project);

    // THEN
    expect(snapshot.Makefile).toContain(
      'https://github.com/cert-manager/cert-manager/raw/v$(VERSION)/deploy/charts/cert-manager/templates/crds.yaml',
    );
  });

  test('handles invalid URLs by using them as-is', () => {
    // GIVEN
    const options = {
      name: 'pulumi-k8s-invalid',
      latestVersionOnBranch: '1.0.0',
      crdUrls: ['invalid-url', 'invalid-url'],
      upstreamProject: {
        owner: 'cert-manager',
        repository: 'cert-manager',
      },
      ...packageNames,
    };

    // WHEN
    const project = new PulumiCrdSdksProject(options);
    const snapshot = synthSnapshot(project);

    // THEN
    expect(snapshot.Makefile).toContain('invalid-url');
  });
});
