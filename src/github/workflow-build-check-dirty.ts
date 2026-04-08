import * as projen from 'projen';
import { JobPermission } from 'projen/lib/github/workflows-model';

/**
 * Component that manages the main GitHub Actions workflow.
 * This workflow installs tools using mise, runs build, and ensures the Git workspace is clean.
 */
export class WorkflowBuildCheckDirty extends projen.Component {
  constructor(project: projen.Project) {
    super(project);

    const github = (project as any).github;
    if (!github) {
      return;
    }

    const workflow = github.addWorkflow('main');

    workflow.on({
      push: { branches: ['main'] },
      pullRequest: {},
      workflowDispatch: {},
    });

    const installMise = {
      name: 'Install mise',
      uses: 'jdx/mise-action@v4',
    };

    const installTools = {
      name: 'Install tools',
      run: 'mise install',
    };

    const clean = {
      name: 'Clean',
      run: 'make clean',
    };

    const build = {
      name: 'Build',
      run: 'make build',
    };

    const checkClean = {
      name: 'Check Git workspace is clean',
      run: 'git diff --exit-code',
    };

    const failOnChanges = {
      name: 'Fail if there are changed files',
      run: 'if [ -n "$(git status --porcelain)" ]; then echo "::error::Git workspace is not clean"; exit 1; fi',
    };

    workflow.addJob('build', {
      runsOn: ['ubuntu-latest'],
      permissions: {
        contents: JobPermission.READ,
      },
      steps: [
        { name: 'Checkout', uses: 'actions/checkout@v6' },
        installMise,
        installTools,
        clean,
        build,
        checkClean,
        failOnChanges,
      ],
    });
  }
}