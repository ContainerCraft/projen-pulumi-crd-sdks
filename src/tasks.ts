import { Component, Project } from 'projen';

export class BuildTask extends Component {
  constructor(project: Project) {
    super(project);
    project.removeTask('build');
    project.removeTask('compile');
    project.removeTask('pre-compile');
    project.removeTask('post-compile');
    project.removeTask('test');
  }
}