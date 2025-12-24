import * as projen from 'projen';

export interface PulumiCrdSdksProjectOptions extends projen.ProjectOptions {
}

export class PulumiCrdSdksProject extends projen.Project {
  constructor(options: PulumiCrdSdksProjectOptions) {
    super(options);

    const contents = `
    [tools]
    'github:pulumi/crd2pulumi' = '1.6.0'
    `;

    new projen.License(this, {
      spdx: 'Apache-2.0',
      copyrightOwner: 'Containercraft.io',
      copyrightPeriod: '2025-2026',
    });

    new projen.TextFile(this, 'mise.toml', {
      lines: [contents],
    });
  }
}
