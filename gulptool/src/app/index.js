import command from './command';
import config from './config';
import Package from './package';
import task from './task';
import log from './log';
import TaskConfig from './task-config';

export default {

  command,
  config,
  packages: new Package({}),
  task,
  taskConfig: new TaskConfig({}),
  log
};
