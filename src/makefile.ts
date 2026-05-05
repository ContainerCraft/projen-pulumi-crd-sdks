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

  makefile.addLine('# Ensure all directories exist before evaluating targets to avoid issues with `touch` creating directories.');
  makefile.addLine('_ := $(shell mkdir -p .make)');
  makefile.addLine('');

  makefile.addLine('download: $(CRD_FILES)');
  makefile.addLine('');

  makefile.addLine('$(CRD_DIR):');
  makefile.addLine('\tmkdir -p $(CRD_DIR)');
  makefile.addLine('');
  makefile.addLine('$(CRD_DIR)/%.yaml: | $(CRD_DIR)');
  makefile.addLine('\tcurl -sL -o $@ $(subst $(CRD_DIR)/,https://github.com/cert-manager/cert-manager/raw/refs/tags/v$(VERSION)/deploy/crds/,$@)');
  makefile.addLine('');

  makefile.addLine('generate_nodejs: .make/generate_nodejs');
  makefile.addLine('build_nodejs: .make/build_nodejs');
  makefile.addLine('.make/generate_nodejs: download');
  makefile.addLine(`\tcrd2pulumi --nodejs --nodejsPath $(SDK_DIR)/nodejs --nodejsName $(PACKAGE_NAME_NODEJS) ${options.nodePackage?.namespace ? '--nodejsNamespace $(PACKAGE_NAMESPACE_NODEJS)' : ''} --version $(VERSION) $(CRD_FILES)`);
  makefile.addLine('\t@touch $@');
  makefile.addLine('.make/build_nodejs: .make/generate_nodejs');
  makefile.addLine('\tcd sdk/nodejs/ && \\');
  makefile.addLine('\t\tnpm install && \\');
  makefile.addLine('\t\tnpm run build && \\');
  makefile.addLine('\t\tcp README.md ../../LICENSE package.json package-lock.json ./bin/ && \\');
  makefile.addLine('\t\tmkdir -p dist && \\');
  makefile.addLine('\t\tnpm pack --pack-destination dist && \\');
  makefile.addLine('\t\trm -rf ./bin');
  makefile.addLine('\t@touch $@');
  makefile.addLine('clean_sdk_nodejs:');
  makefile.addLine('\trm -rf $(SDK_DIR)/nodejs');
  makefile.addLine('.PHONY: generate_nodejs build_nodejs clean_sdk_nodejs');
  makefile.addLine('');

  makefile.addLine('generate_python: .make/generate_python');
  makefile.addLine('build_python: .make/build_python');
  makefile.addLine('.make/generate_python: download');
  makefile.addLine(`\tcrd2pulumi --python --pythonPath $(SDK_DIR)/python --pythonName $(PACKAGE_NAME_PYTHON) ${options.pythonPackage?.prefix ? '--pythonPackagePrefix $(PACKAGE_PREFIX_PYTHON)' : ''} --version $(VERSION) $(CRD_FILES)`);
  makefile.addLine('\t@touch $@');
  makefile.addLine('.make/build_python: .make/generate_python');
  makefile.addLine('\tcd sdk/python/ && \\');
  makefile.addLine('\t\trm -rf ./bin/ ../python.bin/ && cp -R . ../python.bin && mv ../python.bin ./bin && \\');
  makefile.addLine('\t\tpython3 -m venv venv && \\');
  makefile.addLine('\t\t./venv/bin/python -m pip install build==1.2.1 && \\');
  makefile.addLine('\t\tcd ./bin && \\');
  makefile.addLine('\t\t../venv/bin/python -m build .');
  makefile.addLine('\t@touch $@');
  makefile.addLine('clean_sdk_python:');
  makefile.addLine('\trm -rf $(SDK_DIR)/python');
  makefile.addLine('.PHONY: generate_python build_python clean_sdk_python');
  makefile.addLine('');

  makefile.addLine('generate_dotnet: .make/generate_dotnet');
  makefile.addLine('build_dotnet: .make/build_dotnet');
  makefile.addLine('.make/generate_dotnet: download');
  makefile.addLine(`\tcrd2pulumi --dotnet --dotnetPath $(SDK_DIR)/dotnet --dotnetName $(PACKAGE_NAME_DOTNET) ${options.dotnetPackage?.namespace ? '--dotnetNamespace $(PACKAGE_NAMESPACE_DOTNET)' : ''} --version $(VERSION) $(CRD_FILES)`);
  makefile.addLine('\t@touch $@');
  makefile.addLine('.make/build_dotnet: .make/generate_dotnet');
  makefile.addLine('\tcd sdk/dotnet/ #&& dotnet build # Commented out due to https://github.com/pulumi/pulumi/issues/15874');
  makefile.addLine('\t@touch $@');
  makefile.addLine('clean_sdk_dotnet:');
  makefile.addLine('\trm -rf $(SDK_DIR)/dotnet');
  makefile.addLine('.PHONY: generate_dotnet build_dotnet clean_sdk_dotnet');
  makefile.addLine('');

  makefile.addLine('generate_go: .make/generate_go');
  makefile.addLine('build_go: .make/build_go');
  makefile.addLine('.make/generate_go: download');
  makefile.addLine('\tcrd2pulumi --go --goPath $(SDK_DIR)/go --goName $(PACKAGE_NAME_GO) --version $(VERSION) $(CRD_FILES)');
  makefile.addLine('\t@touch $@');
  makefile.addLine('.make/build_go: .make/generate_go');
  makefile.addLine("\tcd sdk && go list \"$$(grep -e \"^module\" go.mod | cut -d ' ' -f 2)/go/...\" | xargs -I {} bash -c 'go build {} && go clean -i {}'");
  makefile.addLine('\t@touch $@');
  makefile.addLine('clean_sdk_go:');
  makefile.addLine('\trm -rf $(SDK_DIR)/go');
  makefile.addLine('.PHONY: generate_go build_go clean_sdk_go');
  makefile.addLine('');

  if (options.javaPackage) {
    makefile.addLine('generate_java: .make/generate_java');
    makefile.addLine('build_java: .make/build_java');
    makefile.addLine('.make/generate_java: download');
    makefile.addLine(`\tcrd2pulumi --java --javaPath $(SDK_DIR)/java --javaName $(PACKAGE_NAME_JAVA) ${options.javaPackage.basePackage ? '--javaBasePackage $(PACKAGE_BASEPACKAGE_JAVA)' : ''} --version $(VERSION) $(CRD_FILES)`);
    makefile.addLine('\t@touch $@');
    makefile.addLine('.make/build_java: .make/generate_java');
    makefile.addLine('\t@touch $@');
    makefile.addLine('clean_sdk_java:');
    makefile.addLine('\trm -rf $(SDK_DIR)/java');
    makefile.addLine('.PHONY: generate_java build_java clean_sdk_java');
    makefile.addLine('');
  }

  makefile.addLine(`build: build_nodejs build_python build_dotnet build_go${options.javaPackage ? ' build_java' : ''}`);
  makefile.addLine('');
  makefile.addLine('clean_sdk: clean_sdk_nodejs clean_sdk_python clean_sdk_dotnet clean_sdk_go');
  makefile.addLine('');
  makefile.addLine('clean: clean_sdk');
  makefile.addLine('\trm -rf $(CRD_DIR)');
  makefile.addLine('');

  return makefile;
}