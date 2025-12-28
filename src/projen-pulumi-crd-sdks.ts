import * as projen from 'projen';

export interface PulumiCrdSdksProjectOptions extends projen.ProjectOptions {
  /**
   * List of HTTPS URLs containing the ${VERSION} placeholder.
   */
  readonly crdUrls: string[];
}

export class PulumiCrdSdksProject extends projen.Project {
  constructor(options: PulumiCrdSdksProjectOptions) {
    super(options);

    if (options.crdUrls.length === 0) {
      throw new Error('crdUrls cannot be empty');
    }

    const projectIdentifiers = options.crdUrls.map(url => {
      try {
        const parsedUrl = new URL(url);
        const parts = parsedUrl.pathname.split('/');
        if (parsedUrl.hostname === 'raw.githubusercontent.com' || parsedUrl.hostname === 'github.com') {
          return `${parsedUrl.hostname}/${parts[1]}/${parts[2]}`;
        }
        return `${parsedUrl.hostname}/${parts[1]}`;
      } catch (e) {
        return url;
      }
    });

    if (new Set(projectIdentifiers).size > 1) {
      throw new Error('All crdUrls must point to the same project');
    }

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

    const crdUrls = options.crdUrls;
    const makefile = new (class extends projen.Makefile {
      constructor(project: projen.Project) {
        super(project, 'Makefile');
      }
      protected synthesizeContent(resolver: projen.IResolver): string | undefined {
        const content = super.synthesizeContent(resolver);
        if (!content) return undefined;
        const lines = content.split('\n');
        // Insert VERSION variable after the marker
        lines.splice(2, 0, 'VERSION ?= latest', '');
        return lines.join('\n');
      }
    })(this);

    makefile.addRule({
      targets: ['build'],
      recipe: crdUrls.map(url => `crd2pulumi --nodejsPath sdk/nodejs ${url.replace(/\${VERSION}/g, '$(VERSION)')}`),
      phony: true,
    });
  }
}
