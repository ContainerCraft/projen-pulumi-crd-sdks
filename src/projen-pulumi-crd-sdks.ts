import * as projen from 'projen';

export interface PulumiCrdSdksProjectOptions extends projen.ProjectOptions {
}

export class PulumiCrdSdksProject extends projen.Project {
  constructor(options: PulumiCrdSdksProjectOptions) {
    super(options);
  }
}
