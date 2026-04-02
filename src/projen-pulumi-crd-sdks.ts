import { License, Project, ProjectOptions, TextFile } from 'projen';
import { GitHub } from 'projen/lib/github';
import { ProjenrcTs } from 'projen/lib/typescript';
import * as github from './github';
import { BuildTask } from './tasks';


export interface PackageNames {
  readonly node: string;
  readonly python: string;
  readonly dotnet: string;
  readonly go: string;
  readonly java?: string;
}
export interface PulumiCrdSdksProjectOptions extends ProjectOptions {
  /**
   * Github location of the upstream project to track for new releases.
   *
   * @featured
   */
  readonly upstreamProject?: github.GithubRepository;

  /**
   * Latest version of the SDKs released on this branch. This value shall be updated automatically by the project.
   * This should be a semantic version (MAJOR.MINOR.PATCH), without a preceding 'v'.
   *
   * @featured
   * @default: 1.0.0
   */
  readonly latestVersionOnBranch?: string;

  /**
   * List of HTTPS URLs containing the ${VERSION} placeholder.
   *
   * @featured
   */
  readonly crdUrls?: string[];

  /**
   * Package names for the generated Pulumi SDKs.
   *
   * @featured
   */
  readonly packageNames: PackageNames;
}

function createMakefile(project: Project, options: PulumiCrdSdksProjectOptions): TextFile {
  project.gitignore.exclude('/crds');

  const makefile = new TextFile(project, 'Makefile');

  makefile.addLine(`VERSION ?= ${options.latestVersionOnBranch}`);
  makefile.addLine('CRD_DIR := crds');
  makefile.addLine('SDK_DIR := sdk');
  makefile.addLine('\n');

  makefile.addLine('CRD_URLS := \\');
  options.crdUrls?.map(
    (url, index, array) =>
      makefile.addLine(`\t${url.replace(/\${VERSION}/g, '$(VERSION)')}${ index < array.length - 1 ? ' \\' : '' }`),
  );
  makefile.addLine('\n');

  makefile.addLine('CRD_FILES := $(patsubst %.yaml,$(CRD_DIR)/%.yaml,$(notdir $(CRD_URLS)))');
  makefile.addLine('');

  makefile.addLine('download: $(CRD_FILES)');
  makefile.addLine('');

  makefile.addLine('$(CRD_DIR):');
  makefile.addLine('\tmkdir -p $(CRD_DIR)');
  makefile.addLine('');
  makefile.addLine('$(CRD_DIR)/%.yaml: | $(CRD_DIR)');
  makefile.addLine('\tcurl -sL -o $@ $(subst $(CRD_DIR)/,https://github.com/cert-manager/cert-manager/raw/refs/tags/v$(VERSION)/deploy/crds/,$@)');
  makefile.addLine('');
  makefile.addLine('build: download');
  makefile.addLine('\tcrd2pulumi -npdg $(CRD_FILES)');
  makefile.addLine('');
  makefile.addLine('clean:');
  makefile.addLine('\trm -rf $(CRD_DIR)');
  makefile.addLine('\trm -rf $(SDK_DIR)');
  makefile.addLine('');

  return makefile;
}

export class PulumiCrdSdksProject extends Project {
  // @ts-ignore
  private readonly github: GitHub;

  constructor(options: PulumiCrdSdksProjectOptions) {
    super(options);

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

    this.github = new GitHub(this, {
      mergify: false,
      pullRequestLint: false,
    });

    // Generate a `.projenrc.ts` file
    new ProjenrcTs(this, {});

    if (options.crdUrls?.length === 0) {
      throw new Error('crdUrls cannot be empty');
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

    new github.WorkflowBuildCheckDirty(this);
    new BuildTask(this);
    createMakefile(this, options);

    // const crdUrls = options.crdUrls;
    // const makefile = new (class extends Makefile {
    //   constructor(project: Project) {
    //     super(project, 'Makefile');
    //   }
    //   protected synthesizeContent(
    //     resolver: IResolver,
    //   ): string | undefined {
    //     const content = super.synthesizeContent(resolver);
    //     if (!content) return undefined;
    //     const lines = content.split('\n');
    //     // Insert VERSION variable after the marker
    //     lines.splice(2, 0, `VERSION ?= ${options.latestVersionOnBranch}`, '');
    //     return lines.join('\n');
    //   }
    // })(this);
    //
    // makefile.addRule({
    //   targets: ['build'],
    //   recipe: crdUrls?.map(
    //     (url) =>
    //       `crd2pulumi --nodejsPath sdk/nodejs ${url.replace(/\${VERSION}/g, '$(VERSION)')}`,
    //   ),
    //   phony: true,
    // });
  }
}