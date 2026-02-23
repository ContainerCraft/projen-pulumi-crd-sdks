# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### PulumiCrdSdksProject <a name="PulumiCrdSdksProject" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject"></a>

#### Initializers <a name="Initializers" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.Initializer"></a>

```typescript
import { PulumiCrdSdksProject } from '@containercraft/projen-pulumi-crd-sdks'

new PulumiCrdSdksProject(options: PulumiCrdSdksProjectOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.Initializer.parameter.options">options</a></code> | <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProjectOptions">PulumiCrdSdksProjectOptions</a></code> | *No description.* |

---

##### `options`<sup>Required</sup> <a name="options" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.Initializer.parameter.options"></a>

- *Type:* <a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProjectOptions">PulumiCrdSdksProjectOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.with">with</a></code> | Applies one or more mixins to this construct. |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.addExcludeFromCleanup">addExcludeFromCleanup</a></code> | Exclude the matching files from pre-synth cleanup. |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.addGitIgnore">addGitIgnore</a></code> | Adds a .gitignore pattern. |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.addPackageIgnore">addPackageIgnore</a></code> | Exclude these files from the bundled package. |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.addTask">addTask</a></code> | Adds a new task to this project. |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.addTip">addTip</a></code> | Prints a "tip" message during synthesis. |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.annotateGenerated">annotateGenerated</a></code> | Consider a set of files as "generated". |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.postSynthesize">postSynthesize</a></code> | Called after all components are synthesized. |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.preSynthesize">preSynthesize</a></code> | Called before all components are synthesized. |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.removeTask">removeTask</a></code> | Removes a task from a project. |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.runTaskCommand">runTaskCommand</a></code> | Returns the shell command to execute in order to run a task. |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.synth">synth</a></code> | Synthesize all project files into `outdir`. |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.tryFindFile">tryFindFile</a></code> | Finds a file at the specified relative path within this project and all its subprojects. |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.tryFindJsonFile">tryFindJsonFile</a></code> | Finds a json file by name. |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.tryFindObjectFile">tryFindObjectFile</a></code> | Finds an object file (like JsonFile, YamlFile, etc.) by name. |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.tryRemoveFile">tryRemoveFile</a></code> | Finds a file at the specified relative path within this project and removes it. |

---

##### `toString` <a name="toString" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

##### `addExcludeFromCleanup` <a name="addExcludeFromCleanup" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.addExcludeFromCleanup"></a>

```typescript
public addExcludeFromCleanup(globs: ...string[]): void
```

Exclude the matching files from pre-synth cleanup.

Can be used when, for example, some
source files include the projen marker and we don't want them to be erased during synth.

###### `globs`<sup>Required</sup> <a name="globs" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.addExcludeFromCleanup.parameter.globs"></a>

- *Type:* ...string[]

The glob patterns to match.

---

##### `addGitIgnore` <a name="addGitIgnore" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.addGitIgnore"></a>

```typescript
public addGitIgnore(pattern: string): void
```

Adds a .gitignore pattern.

###### `pattern`<sup>Required</sup> <a name="pattern" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.addGitIgnore.parameter.pattern"></a>

- *Type:* string

The glob pattern to ignore.

---

##### `addPackageIgnore` <a name="addPackageIgnore" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.addPackageIgnore"></a>

```typescript
public addPackageIgnore(_pattern: string): void
```

Exclude these files from the bundled package.

Implemented by project types based on the
packaging mechanism. For example, `NodeProject` delegates this to `.npmignore`.

###### `_pattern`<sup>Required</sup> <a name="_pattern" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.addPackageIgnore.parameter._pattern"></a>

- *Type:* string

The glob pattern to exclude.

---

##### `addTask` <a name="addTask" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.addTask"></a>

```typescript
public addTask(name: string, props?: TaskOptions): Task
```

Adds a new task to this project.

This will fail if the project already has
a task with this name.

###### `name`<sup>Required</sup> <a name="name" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.addTask.parameter.name"></a>

- *Type:* string

The task name to add.

---

###### `props`<sup>Optional</sup> <a name="props" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.addTask.parameter.props"></a>

- *Type:* projen.TaskOptions

Task properties.

---

##### ~~`addTip`~~ <a name="addTip" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.addTip"></a>

```typescript
public addTip(message: string): void
```

Prints a "tip" message during synthesis.

###### `message`<sup>Required</sup> <a name="message" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.addTip.parameter.message"></a>

- *Type:* string

The message.

---

##### `annotateGenerated` <a name="annotateGenerated" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.annotateGenerated"></a>

```typescript
public annotateGenerated(_glob: string): void
```

Consider a set of files as "generated".

This method is implemented by
derived classes and used for example, to add git attributes to tell GitHub
that certain files are generated.

###### `_glob`<sup>Required</sup> <a name="_glob" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.annotateGenerated.parameter._glob"></a>

- *Type:* string

the glob pattern to match (could be a file path).

---

##### `postSynthesize` <a name="postSynthesize" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after all components are synthesized.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before all components are synthesized.

##### `removeTask` <a name="removeTask" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.removeTask"></a>

```typescript
public removeTask(name: string): Task
```

Removes a task from a project.

###### `name`<sup>Required</sup> <a name="name" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.removeTask.parameter.name"></a>

- *Type:* string

The name of the task to remove.

---

##### `runTaskCommand` <a name="runTaskCommand" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.runTaskCommand"></a>

```typescript
public runTaskCommand(task: Task): string
```

Returns the shell command to execute in order to run a task.

By default, this is `npx projen@<version> <task>`

###### `task`<sup>Required</sup> <a name="task" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.runTaskCommand.parameter.task"></a>

- *Type:* projen.Task

The task for which the command is required.

---

##### `synth` <a name="synth" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.synth"></a>

```typescript
public synth(): void
```

Synthesize all project files into `outdir`.

1. Call "this.preSynthesize()"
2. Delete all generated files
3. Synthesize all subprojects
4. Synthesize all components of this project
5. Call "postSynthesize()" for all components of this project
6. Call "this.postSynthesize()"

##### `tryFindFile` <a name="tryFindFile" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.tryFindFile"></a>

```typescript
public tryFindFile(filePath: string): FileBase
```

Finds a file at the specified relative path within this project and all its subprojects.

###### `filePath`<sup>Required</sup> <a name="filePath" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.tryFindFile.parameter.filePath"></a>

- *Type:* string

The file path.

If this path is relative, it will be resolved
from the root of _this_ project.

---

##### ~~`tryFindJsonFile`~~ <a name="tryFindJsonFile" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.tryFindJsonFile"></a>

```typescript
public tryFindJsonFile(filePath: string): JsonFile
```

Finds a json file by name.

###### `filePath`<sup>Required</sup> <a name="filePath" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.tryFindJsonFile.parameter.filePath"></a>

- *Type:* string

The file path.

---

##### `tryFindObjectFile` <a name="tryFindObjectFile" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.tryFindObjectFile"></a>

```typescript
public tryFindObjectFile(filePath: string): ObjectFile
```

Finds an object file (like JsonFile, YamlFile, etc.) by name.

###### `filePath`<sup>Required</sup> <a name="filePath" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.tryFindObjectFile.parameter.filePath"></a>

- *Type:* string

The file path.

---

##### `tryRemoveFile` <a name="tryRemoveFile" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.tryRemoveFile"></a>

```typescript
public tryRemoveFile(filePath: string): FileBase
```

Finds a file at the specified relative path within this project and removes it.

###### `filePath`<sup>Required</sup> <a name="filePath" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.tryRemoveFile.parameter.filePath"></a>

- *Type:* string

The file path.

If this path is relative, it will be
resolved from the root of _this_ project.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.isProject">isProject</a></code> | Test whether the given construct is a project. |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.of">of</a></code> | Find the closest ancestor project for given construct. |

---

##### `isConstruct` <a name="isConstruct" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.isConstruct"></a>

```typescript
import { PulumiCrdSdksProject } from '@containercraft/projen-pulumi-crd-sdks'

PulumiCrdSdksProject.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isProject` <a name="isProject" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.isProject"></a>

```typescript
import { PulumiCrdSdksProject } from '@containercraft/projen-pulumi-crd-sdks'

PulumiCrdSdksProject.isProject(x: any)
```

Test whether the given construct is a project.

###### `x`<sup>Required</sup> <a name="x" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.isProject.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.of"></a>

```typescript
import { PulumiCrdSdksProject } from '@containercraft/projen-pulumi-crd-sdks'

PulumiCrdSdksProject.of(construct: IConstruct)
```

Find the closest ancestor project for given construct.

When given a project, this it the project itself.

###### `construct`<sup>Required</sup> <a name="construct" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.of.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.property.buildTask">buildTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.property.commitGenerated">commitGenerated</a></code> | <code>boolean</code> | Whether to commit the managed files by default. |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.property.compileTask">compileTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.property.components">components</a></code> | <code>projen.Component[]</code> | Returns all the components within this project. |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.property.deps">deps</a></code> | <code>projen.Dependencies</code> | Project dependencies. |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.property.ejected">ejected</a></code> | <code>boolean</code> | Whether or not the project is being ejected. |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.property.files">files</a></code> | <code>projen.FileBase[]</code> | All files in this project. |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.property.gitattributes">gitattributes</a></code> | <code>projen.GitAttributesFile</code> | The .gitattributes file for this repository. |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.property.gitignore">gitignore</a></code> | <code>projen.IgnoreFile</code> | .gitignore. |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.property.logger">logger</a></code> | <code>projen.Logger</code> | Logging utilities. |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.property.name">name</a></code> | <code>string</code> | Project name. |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.property.outdir">outdir</a></code> | <code>string</code> | Absolute output directory of this project. |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.property.packageTask">packageTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.property.postCompileTask">postCompileTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.property.preCompileTask">preCompileTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.property.projectBuild">projectBuild</a></code> | <code>projen.ProjectBuild</code> | Manages the build process of the project. |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.property.projenCommand">projenCommand</a></code> | <code>string</code> | The command to use in order to run the projen CLI. |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.property.root">root</a></code> | <code>projen.Project</code> | The root project. |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.property.subprojects">subprojects</a></code> | <code>projen.Project[]</code> | Returns all the subprojects within this project. |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.property.tasks">tasks</a></code> | <code>projen.Tasks</code> | Project tasks. |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.property.testTask">testTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.property.defaultTask">defaultTask</a></code> | <code>projen.Task</code> | This is the "default" task, the one that executes "projen". |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.property.initProject">initProject</a></code> | <code>projen.InitProject</code> | The options used when this project is bootstrapped via `projen new`. |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.property.parent">parent</a></code> | <code>projen.Project</code> | A parent project. |

---

##### `node`<sup>Required</sup> <a name="node" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `buildTask`<sup>Required</sup> <a name="buildTask" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.property.buildTask"></a>

```typescript
public readonly buildTask: Task;
```

- *Type:* projen.Task

---

##### `commitGenerated`<sup>Required</sup> <a name="commitGenerated" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.property.commitGenerated"></a>

```typescript
public readonly commitGenerated: boolean;
```

- *Type:* boolean

Whether to commit the managed files by default.

---

##### `compileTask`<sup>Required</sup> <a name="compileTask" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.property.compileTask"></a>

```typescript
public readonly compileTask: Task;
```

- *Type:* projen.Task

---

##### `components`<sup>Required</sup> <a name="components" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.property.components"></a>

```typescript
public readonly components: Component[];
```

- *Type:* projen.Component[]

Returns all the components within this project.

---

##### `deps`<sup>Required</sup> <a name="deps" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.property.deps"></a>

```typescript
public readonly deps: Dependencies;
```

- *Type:* projen.Dependencies

Project dependencies.

---

##### `ejected`<sup>Required</sup> <a name="ejected" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.property.ejected"></a>

```typescript
public readonly ejected: boolean;
```

- *Type:* boolean

Whether or not the project is being ejected.

---

##### `files`<sup>Required</sup> <a name="files" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.property.files"></a>

```typescript
public readonly files: FileBase[];
```

- *Type:* projen.FileBase[]

All files in this project.

---

##### `gitattributes`<sup>Required</sup> <a name="gitattributes" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.property.gitattributes"></a>

```typescript
public readonly gitattributes: GitAttributesFile;
```

- *Type:* projen.GitAttributesFile

The .gitattributes file for this repository.

---

##### `gitignore`<sup>Required</sup> <a name="gitignore" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.property.gitignore"></a>

```typescript
public readonly gitignore: IgnoreFile;
```

- *Type:* projen.IgnoreFile

.gitignore.

---

##### `logger`<sup>Required</sup> <a name="logger" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.property.logger"></a>

```typescript
public readonly logger: Logger;
```

- *Type:* projen.Logger

Logging utilities.

---

##### `name`<sup>Required</sup> <a name="name" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

Project name.

---

##### `outdir`<sup>Required</sup> <a name="outdir" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.property.outdir"></a>

```typescript
public readonly outdir: string;
```

- *Type:* string

Absolute output directory of this project.

---

##### `packageTask`<sup>Required</sup> <a name="packageTask" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.property.packageTask"></a>

```typescript
public readonly packageTask: Task;
```

- *Type:* projen.Task

---

##### `postCompileTask`<sup>Required</sup> <a name="postCompileTask" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.property.postCompileTask"></a>

```typescript
public readonly postCompileTask: Task;
```

- *Type:* projen.Task

---

##### `preCompileTask`<sup>Required</sup> <a name="preCompileTask" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.property.preCompileTask"></a>

```typescript
public readonly preCompileTask: Task;
```

- *Type:* projen.Task

---

##### `projectBuild`<sup>Required</sup> <a name="projectBuild" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.property.projectBuild"></a>

```typescript
public readonly projectBuild: ProjectBuild;
```

- *Type:* projen.ProjectBuild

Manages the build process of the project.

---

##### `projenCommand`<sup>Required</sup> <a name="projenCommand" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.property.projenCommand"></a>

```typescript
public readonly projenCommand: string;
```

- *Type:* string

The command to use in order to run the projen CLI.

---

##### `root`<sup>Required</sup> <a name="root" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.property.root"></a>

```typescript
public readonly root: Project;
```

- *Type:* projen.Project

The root project.

---

##### `subprojects`<sup>Required</sup> <a name="subprojects" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.property.subprojects"></a>

```typescript
public readonly subprojects: Project[];
```

- *Type:* projen.Project[]

Returns all the subprojects within this project.

---

##### `tasks`<sup>Required</sup> <a name="tasks" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.property.tasks"></a>

```typescript
public readonly tasks: Tasks;
```

- *Type:* projen.Tasks

Project tasks.

---

##### `testTask`<sup>Required</sup> <a name="testTask" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.property.testTask"></a>

```typescript
public readonly testTask: Task;
```

- *Type:* projen.Task

---

##### `defaultTask`<sup>Optional</sup> <a name="defaultTask" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.property.defaultTask"></a>

```typescript
public readonly defaultTask: Task;
```

- *Type:* projen.Task

This is the "default" task, the one that executes "projen".

Undefined if
the project is being ejected.

---

##### `initProject`<sup>Optional</sup> <a name="initProject" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.property.initProject"></a>

```typescript
public readonly initProject: InitProject;
```

- *Type:* projen.InitProject

The options used when this project is bootstrapped via `projen new`.

It
includes the original set of options passed to the CLI and also the JSII
FQN of the project type.

---

##### `parent`<sup>Optional</sup> <a name="parent" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.property.parent"></a>

```typescript
public readonly parent: Project;
```

- *Type:* projen.Project

A parent project.

If undefined, this is the root project.

---

#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.property.DEFAULT_TASK">DEFAULT_TASK</a></code> | <code>string</code> | The name of the default task (the task executed when `projen` is run without arguments). |

---

##### `DEFAULT_TASK`<sup>Required</sup> <a name="DEFAULT_TASK" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProject.property.DEFAULT_TASK"></a>

```typescript
public readonly DEFAULT_TASK: string;
```

- *Type:* string

The name of the default task (the task executed when `projen` is run without arguments).

Normally
this task should synthesize the project files.

---

## Structs <a name="Structs" id="Structs"></a>

### PulumiCrdSdksProjectOptions <a name="PulumiCrdSdksProjectOptions" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProjectOptions"></a>

#### Initializer <a name="Initializer" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProjectOptions.Initializer"></a>

```typescript
import { PulumiCrdSdksProjectOptions } from '@containercraft/projen-pulumi-crd-sdks'

const pulumiCrdSdksProjectOptions: PulumiCrdSdksProjectOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProjectOptions.property.name">name</a></code> | <code>string</code> | This is the name of your project. |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProjectOptions.property.commitGenerated">commitGenerated</a></code> | <code>boolean</code> | Whether to commit the managed files by default. |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProjectOptions.property.gitIgnoreOptions">gitIgnoreOptions</a></code> | <code>projen.IgnoreFileOptions</code> | Configuration options for .gitignore file. |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProjectOptions.property.gitOptions">gitOptions</a></code> | <code>projen.GitOptions</code> | Configuration options for git. |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProjectOptions.property.logging">logging</a></code> | <code>projen.LoggerOptions</code> | Configure logging options such as verbosity. |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProjectOptions.property.outdir">outdir</a></code> | <code>string</code> | The root directory of the project. |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProjectOptions.property.parent">parent</a></code> | <code>projen.Project</code> | The parent project, if this project is part of a bigger project. |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProjectOptions.property.projectTree">projectTree</a></code> | <code>boolean</code> | Generate a project tree file (`.projen/tree.json`) that shows all components and their relationships. Useful for understanding your project structure and debugging. |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProjectOptions.property.projenCommand">projenCommand</a></code> | <code>string</code> | The shell command to use in order to run the projen CLI. |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProjectOptions.property.projenrcJson">projenrcJson</a></code> | <code>boolean</code> | Generate (once) .projenrc.json (in JSON). Set to `false` in order to disable .projenrc.json generation. |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProjectOptions.property.projenrcJsonOptions">projenrcJsonOptions</a></code> | <code>projen.ProjenrcJsonOptions</code> | Options for .projenrc.json. |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProjectOptions.property.renovatebot">renovatebot</a></code> | <code>boolean</code> | Use renovatebot to handle dependency upgrades. |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProjectOptions.property.renovatebotOptions">renovatebotOptions</a></code> | <code>projen.RenovatebotOptions</code> | Options for renovatebot. |
| <code><a href="#@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProjectOptions.property.crdUrls">crdUrls</a></code> | <code>string[]</code> | List of HTTPS URLs containing the ${VERSION} placeholder. |

---

##### `name`<sup>Required</sup> <a name="name" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProjectOptions.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string
- *Default:* $BASEDIR

This is the name of your project.

---

##### `commitGenerated`<sup>Optional</sup> <a name="commitGenerated" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProjectOptions.property.commitGenerated"></a>

```typescript
public readonly commitGenerated: boolean;
```

- *Type:* boolean
- *Default:* true

Whether to commit the managed files by default.

---

##### `gitIgnoreOptions`<sup>Optional</sup> <a name="gitIgnoreOptions" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProjectOptions.property.gitIgnoreOptions"></a>

```typescript
public readonly gitIgnoreOptions: IgnoreFileOptions;
```

- *Type:* projen.IgnoreFileOptions

Configuration options for .gitignore file.

---

##### `gitOptions`<sup>Optional</sup> <a name="gitOptions" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProjectOptions.property.gitOptions"></a>

```typescript
public readonly gitOptions: GitOptions;
```

- *Type:* projen.GitOptions

Configuration options for git.

---

##### `logging`<sup>Optional</sup> <a name="logging" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProjectOptions.property.logging"></a>

```typescript
public readonly logging: LoggerOptions;
```

- *Type:* projen.LoggerOptions
- *Default:* {}

Configure logging options such as verbosity.

---

##### `outdir`<sup>Optional</sup> <a name="outdir" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProjectOptions.property.outdir"></a>

```typescript
public readonly outdir: string;
```

- *Type:* string
- *Default:* "."

The root directory of the project.

Relative to this directory, all files are synthesized.

If this project has a parent, this directory is relative to the parent
directory and it cannot be the same as the parent or any of it's other
subprojects.

---

##### `parent`<sup>Optional</sup> <a name="parent" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProjectOptions.property.parent"></a>

```typescript
public readonly parent: Project;
```

- *Type:* projen.Project

The parent project, if this project is part of a bigger project.

---

##### `projectTree`<sup>Optional</sup> <a name="projectTree" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProjectOptions.property.projectTree"></a>

```typescript
public readonly projectTree: boolean;
```

- *Type:* boolean
- *Default:* false

Generate a project tree file (`.projen/tree.json`) that shows all components and their relationships. Useful for understanding your project structure and debugging.

---

##### `projenCommand`<sup>Optional</sup> <a name="projenCommand" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProjectOptions.property.projenCommand"></a>

```typescript
public readonly projenCommand: string;
```

- *Type:* string
- *Default:* "npx projen"

The shell command to use in order to run the projen CLI.

Can be used to customize in special environments.

---

##### `projenrcJson`<sup>Optional</sup> <a name="projenrcJson" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProjectOptions.property.projenrcJson"></a>

```typescript
public readonly projenrcJson: boolean;
```

- *Type:* boolean
- *Default:* false

Generate (once) .projenrc.json (in JSON). Set to `false` in order to disable .projenrc.json generation.

---

##### `projenrcJsonOptions`<sup>Optional</sup> <a name="projenrcJsonOptions" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProjectOptions.property.projenrcJsonOptions"></a>

```typescript
public readonly projenrcJsonOptions: ProjenrcJsonOptions;
```

- *Type:* projen.ProjenrcJsonOptions
- *Default:* default options

Options for .projenrc.json.

---

##### `renovatebot`<sup>Optional</sup> <a name="renovatebot" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProjectOptions.property.renovatebot"></a>

```typescript
public readonly renovatebot: boolean;
```

- *Type:* boolean
- *Default:* false

Use renovatebot to handle dependency upgrades.

---

##### `renovatebotOptions`<sup>Optional</sup> <a name="renovatebotOptions" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProjectOptions.property.renovatebotOptions"></a>

```typescript
public readonly renovatebotOptions: RenovatebotOptions;
```

- *Type:* projen.RenovatebotOptions
- *Default:* default options

Options for renovatebot.

---

##### `crdUrls`<sup>Required</sup> <a name="crdUrls" id="@containercraft/projen-pulumi-crd-sdks.PulumiCrdSdksProjectOptions.property.crdUrls"></a>

```typescript
public readonly crdUrls: string[];
```

- *Type:* string[]

List of HTTPS URLs containing the ${VERSION} placeholder.

---



