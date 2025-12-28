import { synthSnapshot } from 'projen/lib/util/synth';
import { PulumiCrdSdksProject } from '../src';

describe('PulumiCrdSdksProject', () => {

  test('mise.toml is generated', () => {
    // GIVEN
    const project = new PulumiCrdSdksProject({
      name: 'pulumi-k8s-cert-manager',
      crdUrls: ['https://example.com/crds.yaml'],
    });

    // WHEN
    const snapshot = synthSnapshot(project);

    // THEN
    expect(snapshot['mise.toml']).toBe(
      `
    [tools]
    'github:pulumi/crd2pulumi' = '1.6.0'
    `,
    );
  });

  test('LICENSE is generated', () => {
    // GIVEN
    const project = new PulumiCrdSdksProject({
      name: 'pulumi-k8s-cert-manager',
      crdUrls: ['https://example.com/crds.yaml'],
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
    });

    // WHEN
    const snapshot = synthSnapshot(project);

    // THEN
    expect(snapshot.Makefile).toContain('VERSION ?=');
    expect(snapshot.Makefile).toContain('crd2pulumi --nodejsPath sdk/nodejs https://raw.githubusercontent.com/cert-manager/cert-manager/v$(VERSION)/deploy/charts/cert-manager/templates/crds.yaml');
    expect(snapshot.Makefile).toContain('crd2pulumi --nodejsPath sdk/nodejs https://raw.githubusercontent.com/cert-manager/cert-manager/v$(VERSION)/deploy/charts/cert-manager/templates/another.yaml');
  });

  test('throws error when crdUrls is empty', () => {
    // GIVEN
    const options = {
      name: 'pulumi-k8s-cert-manager',
      crdUrls: [],
    };

    // WHEN & THEN
    expect(() => new PulumiCrdSdksProject(options)).toThrow('crdUrls cannot be empty');
  });

  test('throws error when crdUrls contains URLs from different projects', () => {
    // GIVEN
    const options = {
      name: 'pulumi-k8s-mixed',
      crdUrls: [
        'https://raw.githubusercontent.com/cert-manager/cert-manager/v${VERSION}/deploy/charts/cert-manager/templates/crds.yaml',
        'https://raw.githubusercontent.com/external-secrets/external-secrets/v${VERSION}/deploy/crds/bundle.yaml',
      ],
    };

    // WHEN & THEN
    expect(() => new PulumiCrdSdksProject(options)).toThrow('All crdUrls must point to the same project');
  });

  test('works with github.com URLs', () => {
    // GIVEN
    const project = new PulumiCrdSdksProject({
      name: 'pulumi-k8s-github',
      crdUrls: [
        'https://github.com/cert-manager/cert-manager/raw/v${VERSION}/deploy/charts/cert-manager/templates/crds.yaml',
        'https://github.com/cert-manager/cert-manager/raw/v${VERSION}/deploy/charts/cert-manager/templates/another.yaml',
      ],
    });

    // WHEN
    const snapshot = synthSnapshot(project);

    // THEN
    expect(snapshot.Makefile).toContain('https://github.com/cert-manager/cert-manager/raw/v$(VERSION)/deploy/charts/cert-manager/templates/crds.yaml');
  });

  test('handles invalid URLs by using them as-is', () => {
    // GIVEN
    const options = {
      name: 'pulumi-k8s-invalid',
      crdUrls: [
        'invalid-url',
        'invalid-url',
      ],
    };

    // WHEN
    const project = new PulumiCrdSdksProject(options);
    const snapshot = synthSnapshot(project);

    // THEN
    expect(snapshot.Makefile).toContain('invalid-url');
  });

});
