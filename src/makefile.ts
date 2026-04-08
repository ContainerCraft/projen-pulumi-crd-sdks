import { Project, TextFile } from 'projen';
import { PulumiCrdSdksProjectOptions } from './types';

export function createMakefile(project: Project, options: PulumiCrdSdksProjectOptions): TextFile {
  project.gitignore.exclude('/crds');

  const makefile = new TextFile(project, 'Makefile');

  makefile.addLine(`VERSION ?= ${options.latestVersionOnBranch}`);
  makefile.addLine('CRD_DIR := crds');
  makefile.addLine('SDK_DIR := sdk');
  makefile.addLine('');
  makefile.addLine(`PACKAGE_NAME_NODEJS ?= ${options.nodePackage?.name}`);
  if (options.nodePackage?.namespace) {
    makefile.addLine(`PACKAGE_NAMESPACE_NODEJS ?= ${options.nodePackage?.namespace}`);
  }
  makefile.addLine(`PACKAGE_NAME_PYTHON ?= ${options.pythonPackage?.name}`);
  if (options.pythonPackage?.prefix) {
    makefile.addLine(`PACKAGE_PREFIX_PYTHON ?= ${options.pythonPackage?.prefix}`);
  }
  makefile.addLine(`PACKAGE_NAME_GO ?= ${options.goPackage}`);
  makefile.addLine(`PACKAGE_NAME_DOTNET ?= ${options.dotnetPackage?.name}`);
  if (options.dotnetPackage?.namespace) {
    makefile.addLine(`PACKAGE_NAMESPACE_DOTNET ?= ${options.dotnetPackage?.namespace}`);
  }
  makefile.addLine('');
  if (options.javaPackage) {
    makefile.addLine(`PACKAGE_NAME_JAVA ?= ${options.javaPackage.name}`);
    if (options.javaPackage.basePackage) {
      makefile.addLine(`PACKAGE_BASEPACKAGE_JAVA ?= ${options.javaPackage.basePackage}`);
    }
    makefile.addLine('');
  }

  makefile.addLine('CRD_URLS := \\');
  options.crdUrls?.map(
    (url, index, array) =>
      makefile.addLine(`\t${url.replace(/\${VERSION}/g, '$(VERSION)')}${index < array.length - 1 ? ' \\' : ''}`),
  );
  makefile.addLine('');

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
  makefile.addLine('build-nodejs: download');
  makefile.addLine(`\tcrd2pulumi --nodejs --nodejsPath $(SDK_DIR)/nodejs --nodejsName $(PACKAGE_NAME_NODEJS) ${options.nodePackage?.namespace ? '--nodejsNamespace $(PACKAGE_NAMESPACE_NODEJS)' : ''} --version $(VERSION) $(CRD_FILES)`);
  makefile.addLine('');
  makefile.addLine('build-python: download');
  makefile.addLine(`\tcrd2pulumi --python --pythonPath $(SDK_DIR)/python --pythonName $(PACKAGE_NAME_PYTHON) ${options.pythonPackage?.prefix ? '--pythonPackagePrefix $(PACKAGE_PREFIX_PYTHON)' : ''} --version $(VERSION) $(CRD_FILES)`);
  makefile.addLine('');
  makefile.addLine('build-dotnet: download');
  makefile.addLine(`\tcrd2pulumi --dotnet --dotnetPath $(SDK_DIR)/dotnet --dotnetName $(PACKAGE_NAME_DOTNET) ${options.dotnetPackage?.namespace ? '--dotnetNamespace $(PACKAGE_NAMESPACE_DOTNET)' : ''} --version $(VERSION) $(CRD_FILES)`);
  makefile.addLine('');
  makefile.addLine('build-go: download');
  makefile.addLine('\tcrd2pulumi --go --goPath $(SDK_DIR)/go --goName $(PACKAGE_NAME_GO) --version $(VERSION) $(CRD_FILES)');
  makefile.addLine('');
  if (options.javaPackage) {
    makefile.addLine('build-java: download');
    makefile.addLine(`\tcrd2pulumi --java --javaPath $(SDK_DIR)/java --javaName $(PACKAGE_NAME_JAVA) ${options.javaPackage.basePackage ? '--javaBasePackage $(PACKAGE_BASEPACKAGE_JAVA)' : ''} --version $(VERSION) $(CRD_FILES)`);
    makefile.addLine('');
  }
  makefile.addLine(`build: build-nodejs build-python build-dotnet build-go ${options.javaPackage ? 'build-java' : ''}`);
  makefile.addLine('');
  makefile.addLine('clean-sdk:');
  makefile.addLine('\trm -rf $(SDK_DIR)');
  makefile.addLine('');
  makefile.addLine('clean: clean-sdk');
  makefile.addLine('\trm -rf $(CRD_DIR)');
  makefile.addLine('');

  return makefile;
}