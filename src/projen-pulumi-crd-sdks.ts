import { IgnoreFile, License, Project, TextFile } from 'projen';
import { GitHub } from 'projen/lib/github';
import * as github from './github';
import { createMakefile } from './makefile';
import { BuildTask } from './tasks';
import { PulumiCrdSdksProjectOptions } from './types';
import { createUpdateCliConfig } from './updatecli';


export class PulumiCrdSdksProject extends Project {
  // @ts-ignore
  private readonly github: GitHub;

  constructor(options: PulumiCrdSdksProjectOptions) {
    super({
      ...options,
      projenrcJson: true,
      projectTree: true,
      renovatebot: false, // Explicitly disable RenovateBot because UpdateCLI will be used.
    });

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
        '[plugins]',
        'vfox-pulumi = "https://github.com/pulumi/vfox-pulumi"',
        '',
        '[env]',
        '_.vfox-pulumi = { module_path = "sdk" } # Sets GO_VERSION_MISE and PULUMI_VERSION_MISE',
        '',
        '[tools]',
        'go = "{{ env.GO_VERSION_MISE }}"',
        "'github:pulumi/crd2pulumi' = '1.6.1'",
        '"vfox:version-fox/vfox-dotnet" = "8.0.20"',
        '',
      ],
    });

    new github.WorkflowBuildCheckDirty(this);
    new BuildTask(this);
    createMakefile(this, options);
    createUpdateCliConfig(this, options);

    this.gitattributes.addAttributes('sdk/**/*', 'linguist-generated=true');

    this.gitignore.exclude('package-lock.json');
    this.gitignore.exclude('.make');

    const sdkIgnore = new IgnoreFile(this, 'sdk/.gitignore');
    sdkIgnore.exclude('/nodejs/bin/');
    sdkIgnore.exclude('/nodejs/dist/');
    sdkIgnore.exclude('/nodejs/node_modules/');
    sdkIgnore.exclude('/python/bin');
    sdkIgnore.exclude('/python/venv');
    sdkIgnore.exclude('/python/*.egg-info');
    sdkIgnore.exclude('__pycache__');
  }
}