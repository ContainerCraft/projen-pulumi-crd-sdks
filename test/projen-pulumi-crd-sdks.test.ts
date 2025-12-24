import { synthSnapshot } from 'projen/lib/util/synth';
import { PulumiCrdSdksProject } from '../src';

describe('PulumiCrdSdksProject', () => {
  test('mise.toml is generated', () => {
    // GIVEN
    const project = new PulumiCrdSdksProject({
      name: 'pulumi-k8s-cert-manager',
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
});
