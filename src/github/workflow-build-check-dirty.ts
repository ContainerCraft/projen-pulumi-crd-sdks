import * as projen from 'projen';

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

    const uploadSdkAction = new projen.YamlFile(
      project,
      '.github/actions/upload-sdk/action.yml',
      {
        readonly: true,
        committed: true,
      },
    );
    uploadSdkAction.addOverride('name', 'Upload SDK asset');
    uploadSdkAction.addOverride('description', 'Upload the SDK for a specific language as an asset for the workflow.');
    uploadSdkAction.addOverride('inputs.language.required', 'true');
    uploadSdkAction.addOverride('inputs.language.description', 'One of nodejs, python, dotnet, go, java');
    uploadSdkAction.addOverride('runs.using', 'composite');
    uploadSdkAction.addToArray('runs.steps',
      {
        name: 'Compress SDK folder',
        shell: 'bash',
        run: 'tar -zcf sdk/${{ inputs.language }}.tar.gz -C sdk/${{ inputs.language }} .',
      },
      {
        name: 'Upload ${{ inputs.language }} SDK',
        uses: 'actions/upload-artifact@b7c566a772e6b6bfb58ed0dc250532a479d7789f',
        with: {
          'name': '${{ inputs.language }}-sdk.tar.gz',
          'path': '${{ github.workspace}}/sdk/${{ inputs.language }}.tar.gz',
          'retention-days': 30,
        },
      },
    );

    const downloadSdkAction = new projen.YamlFile(
      project,
      '.github/actions/download-sdk/action.yml',
      {
        readonly: true,
        committed: true,
      },
    );
    downloadSdkAction.addOverride('name', 'Download SDK asset');
    downloadSdkAction.addOverride('description', 'Restores the SDK asset for a language.');
    downloadSdkAction.addOverride('inputs.language.required', 'true');
    downloadSdkAction.addOverride('inputs.language.description', 'One of nodejs, python, dotnet, go, java');
    downloadSdkAction.addOverride('runs.using', 'composite');
    downloadSdkAction.addToArray('runs.steps',
      {
        name: 'Download ${{ inputs.language }} SDK',
        uses: 'actions/download-artifact@37930b1c2abaa49bbe596cd826c3c89aef350131',
        with: {
          name: '${{ inputs.language }}-sdk.tar.gz',
          path: '${{ github.workspace }}/sdk/',
        },
      },
      {
        name: 'Uncompress SDK folder',
        shell: 'bash',
        run: 'tar -zxf ${{ github.workspace }}/sdk/${{ inputs.language }}.tar.gz -C ${{ github.workspace }}/sdk/${{ inputs.language }}',
      },
    );

    const checkOut = {
      name: 'Checkout',
      uses: 'actions/checkout@8e8c483db84b4bee98b60c0593521ed34d9990e8',
      with: {
        'persist-credentials': false,
      },
    };

    const installMise = {
      name: 'Install mise',
      uses: 'jdx/mise-action@c1a019b8d2586943b4dbebc456323b516910e310',
      env: {
        MISE_FETCH_REMOTE_VERSIONS_TIMEOUT: '30s',
      },
      with: {
        version: '2026.2.20',
        github_token: '${{ secrets.GITHUB_TOKEN }}',
        cache_save: false,
      },
    };

    const checkUpstreamVersions = github.addWorkflow('check_upstream_versions');
    checkUpstreamVersions.name = 'check-upstream-versions';

    checkUpstreamVersions.on({
      schedule: [
        {
          cron: '0 1 * * *',
        },
      ],
      workflowDispatch: {},
    });

    checkUpstreamVersions.addJob('check-for-new-upstream-version', {
      runsOn: ['ubuntu-latest'],
      permissions: {
        contents: 'write',
        pullRequests: 'write',
        idToken: 'write',
      },
      steps: [
        checkOut,
        installMise,
        {
          name: 'Read latest version from .projenrc.json',
          uses: 'emptylight370/jq-action@v1.2.0',
          id: 'latest_version_from_projenrc',
          with: {
            data: '.projenrc.json',
            filter: '.latestVersionOnBranch',
          },
        },
        {
          name: 'Login to Repoflow Registry',
          run: 'docker login -u ringods -p ${{ secrets.PAT_REPOFLOW }} api.repoflow.io',
        },
        {
          name: 'Check for a new version in the upstream repository',
          id: 'tag-replay',
          uses: 'ContainerCraft/git-tag-replay@04f45e2b0ae278b60ab4e3a09402b073752998d4',
          with: {
            upstream_owner: 'cert-manager',
            upstream_repository: 'cert-manager',
            upstream_token: '${{ secrets.GITHUB_TOKEN }}',
            token: '${{ secrets.GITHUB_TOKEN }}',
            minimum_version: '${{ steps.latest_version_from_projenrc.outputs.result }}',
          },
        },
        {
          name: 'Install UpdateCLI in the runner',
          uses: 'updatecli/updatecli-action@af341a800cdbcde3ddcebb7a62410ac06a78a207',
        },
        {
          name: 'Run Updatecli in Dry Run mode',
          run: 'updatecli compose diff',
          env: {
            NEXT_VERSION: '${{ steps.tag-replay.outputs.nextTag }}',
            UPDATECLI_GITHUB_TOKEN: '${{ secrets.GITHUB_TOKEN }}',
          },
        },
        {
          name: 'Run Updatecli in Apply mode',
          run: 'updatecli compose apply',
          env: {
            NEXT_VERSION: '${{ steps.tag-replay.outputs.nextTag }}',
            UPDATECLI_GITHUB_TOKEN: '${{ secrets.GITHUB_TOKEN }}',
          },
        },
      ],
    });

    const buildSdk = github.addWorkflow('build_sdk');

    buildSdk.name = 'Build SDK';

    buildSdk.on({
      workflowCall: {},
    });

    const clean = {
      name: 'Clean SDK',
      run: 'make clean_sdk_${{ matrix.language }}',
    };

    const build = {
      name: 'Build SDK',
      run: 'make build_${{ matrix.language }}',
    };

    const setupGoCache = {
      name: 'Setup Go Cache',
      if: "matrix.language == 'go' || contains(matrix.language, 'go')",
      uses: 'actions/setup-go@4dc6199c7b1a012772edbd06daecab0f50c9053c',
      with: {
        'cache-dependency-path': 'provider/*.sum\nupstream/*.sum\nsdk/go/*.sum\nsdk/*.sum\n*.sum',
      },
    };

    const checkClean = {
      name: 'Check Git workspace is clean',
      run: 'git diff --name-status --exit-code',
    };

    const failOnChanges = {
      name: 'Fail if there are changed files',
      run: 'git status --porcelain\n' +
        'if [ -n "$(git status --porcelain)" ]; then echo "::error::Git workspace is not clean"; exit 1; fi',
    };

    const uploadSdk = {
      name: 'Upload SDK',
      uses: './.github/actions/upload-sdk',
      with: {
        language: '${{ matrix.language }}',
      },
    };

    buildSdk.addJob('build_sdk', {
      name: 'build_sdk',
      runsOn: ['ubuntu-latest'],
      permissions: {
        contents: 'read',
      },
      strategy: {
        matrix: {
          domain: {
            language: [
              'dotnet',
              'go',
              'nodejs',
              'python',
            ],
          },
        },
      },
      steps: [
        checkOut,
        installMise,
        setupGoCache,
        clean,
        build,
        checkClean,
        failOnChanges,
        uploadSdk,
      ],
    });

    const publishSdk = github.addWorkflow('publish_sdk');

    publishSdk.name = 'Publish SDK';

    publishSdk.on({
      workflowCall: {},
    });
    publishSdk.addJob('publish_sdk', {
      name: 'publish_sdk',
      runsOn: ['ubuntu-latest'],
      permissions: {
        contents: 'write',
      },
      steps: [
        checkOut,
        installMise,
        {
          name: 'Download Node SDK',
          uses: './.github/actions/download-sdk',
          with: {
            language: 'nodejs',
          },
        },
        {
          name: 'Publish Node SDK',
          env: {
            NPM_DIST_TAG: 'latest',
            //NPM_TRUSTED_PUBLISHER: "true",
            NPM_REGISTRY: 'api.repoflow.io/npm/hardes/crd-node/',
            NPM_TOKEN: '${{ secrets.NODE_AUTH_TOKEN }}',
          },
          run: 'npx -p publib@latest publib-npm sdk/nodejs/dist',
        },
        {
          name: 'Download Python SDK',
          uses: './.github/actions/download-sdk',
          with: {
            language: 'python',
          },
        },
        {
          name: 'Publish Python SDK',
          env: {
            TWINE_USERNAME: 'ringods',
            TWINE_PASSWORD: '${{ secrets.PYPI_TOKEN }}',
            TWINE_REPOSITORY_URL: 'https://api.repoflow.io/pypi/hardes/crd-python',
            //PYPI_TRUSTED_PUBLISHER: "true",
          },
          run: 'npx -p publib@latest publib-pypi sdk/python/bin/dist',
        },
        {
          uses: 'pulumi/publish-go-sdk-action@v1',
          with: {
            'repository': '${{ github.repository }}',
            'base-ref': '${{ github.sha }}',
            'source': 'sdk',
            'path': 'sdk',
            'version': '${{ inputs.version }}',
            'additive': false,
            'files': 'go.*\ngo/**\n!*.tar.gz',
          },
        },
      ],
    });

    const main = github.addWorkflow('main');

    main.on({
      push: { branches: ['main'] },
      pullRequest: {},
      workflowDispatch: {},
    });

    main.addJob('build_sdk', {
      name: 'build_sdk',
      permissions: {
        contents: 'read',
      },
      uses: './.github/workflows/build_sdk.yml',
      secrets: 'inherit',
    });

    const release = github.addWorkflow('release');
    release.name = 'Publish SDKs';

    release.on({
      push: {
        tags: [
          'v*.*.*', // TODO This must match the major version from .projenrc.json
          '!v*.*.*-**',
        ],
      },
    });

    release.addJob('build_sdk', {
      permissions: {
        contents: 'read',
      },
      uses: './.github/workflows/build_sdk.yml',
      secrets: 'inherit',
    });
    release.addJob('publish', {
      permissions: {
        contents: 'write',
      },
      needs: 'build_sdk',
      uses: './.github/workflows/publish_sdk.yml',
      secrets: 'inherit',
    });
  }
}