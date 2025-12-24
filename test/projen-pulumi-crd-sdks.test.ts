import { synthSnapshot } from 'projen/lib/util/synth';
import { PulumiCrdSdksProject } from '../src';

describe('PulumiCrdSdksProject', () => {
  test('project name is set properly', () => {
    // GIVEN
    const project = new PulumiCrdSdksProject({
      name: 'my-microservice',
    });

    // WHEN
    const snapshot = synthSnapshot(project);

    // THEN
    expect(snapshot['package.json']!.name).toBe(
      'my-microservice',
    );
  });
});
