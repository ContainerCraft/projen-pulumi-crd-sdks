import { License, Project, TextFile } from 'projen';
import { GitHub } from 'projen/lib/github';
import { ProjenrcTs } from 'projen/lib/typescript';
import * as github from './github';
import { createMakefile } from './makefile';
import { BuildTask } from './tasks';
import { PulumiCrdSdksProjectOptions } from './types';


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
  }
}