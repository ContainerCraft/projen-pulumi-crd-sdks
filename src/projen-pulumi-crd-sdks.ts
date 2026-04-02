import { IResolver, License, Makefile, Project, ProjectOptions, TextFile } from 'projen';
import { GitHub } from 'projen/lib/github';
import { ProjenrcTs } from 'projen/lib/typescript';
import { GithubActionsWorkflow } from './github-actions-workflow';

export interface PulumiCrdSdksProjectOptions
  extends ProjectOptions {
  /**
   * List of HTTPS URLs containing the ${VERSION} placeholder.
   *
   * @featured
   */
  readonly crdUrls?: string[];
}

export class PulumiCrdSdksProject extends Project {
  // @ts-ignore
  private readonly github: GitHub;

  constructor(options: PulumiCrdSdksProjectOptions) {
    super(options);

    this.github = new GitHub(this, {
      mergify: false,
      pullRequestLint: false,
    });

    // Generate a `.projenrc.ts` file
    new ProjenrcTs(this, {});

    if (options.crdUrls?.length === 0) {
      throw new Error('crdUrls cannot be empty');
    }

    const projectIdentifiers = options.crdUrls?.map((url) => {
      try {
        const parsedUrl = new URL(url);
        const parts = parsedUrl.pathname.split('/');
        if (
          parsedUrl.hostname === 'raw.githubusercontent.com' ||
          parsedUrl.hostname === 'github.com'
        ) {
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

    new License(this, {
      spdx: 'Apache-2.0',
      copyrightOwner: 'Containercraft.io',
      copyrightPeriod: '2025-2026',
    });

    new TextFile(this, 'mise.toml', {
      lines: [
        '[tools]',
        "'github:pulumi/crd2pulumi' = '1.6.1'",
      ],
    });

    new GithubActionsWorkflow(this);

    const crdUrls = options.crdUrls;
    const makefile = new (class extends Makefile {
      constructor(project: Project) {
        super(project, 'Makefile');
      }
      protected synthesizeContent(
        resolver: IResolver,
      ): string | undefined {
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
      recipe: crdUrls?.map(
        (url) =>
          `crd2pulumi --nodejsPath sdk/nodejs ${url.replace(/\${VERSION}/g, '$(VERSION)')}`,
      ),
      phony: true,
    });
  }
}