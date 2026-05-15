import { Project, YamlFile } from 'projen';
import { PulumiCrdSdksProjectOptions } from './types';

export function createUpdateCliConfig(project: Project, options: PulumiCrdSdksProjectOptions): YamlFile[] {

  const composeFile = new YamlFile(
    project,
    'updatecli-compose.yaml',
    {
      readonly: true,
      committed: true,
    },
  );
  composeFile.addToArray('policies',
    {
      name: 'Update upstream CRD version',
      policy: 'api.repoflow.io/hardes/updatecli-policies/containercraft/crd-pulumi-sdk:0.0.7',
      values: [
        'updatecli/values.d/scm.yaml',
        'updatecli/values.d/upstream.yaml',
      ],
    },
  );

  const valuesScmFile = new YamlFile(
    project,
    'updatecli/values.d/scm.yaml',
    {
      readonly: true,
      committed: true,
    },
  );
  valuesScmFile.addOverride('scm.kind', 'github');
  valuesScmFile.addOverride('scm.owner', 'experimentale');
  valuesScmFile.addOverride('scm.repository', 'pulumi-crd-certmanager');
  valuesScmFile.addOverride('scm.username', 'ringods');
  valuesScmFile.addOverride('scm.branch', 'main');

  const valuesUpstreamFile = new YamlFile(
    project,
    'updatecli/values.d/upstream.yaml',
    {
      readonly: true,
      committed: true,
    },
  );
  valuesUpstreamFile.addOverride('upstream.kind', 'github');
  valuesUpstreamFile.addOverride('upstream.owner', options.upstreamProject?.owner);
  valuesUpstreamFile.addOverride('upstream.repository', options.upstreamProject?.repository);

  return [composeFile, valuesScmFile, valuesUpstreamFile];
}