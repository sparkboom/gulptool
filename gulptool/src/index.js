import app from './app';
import {argv} from 'yargs';
import tasks from './tasks';

const log = app.log;

export default new class GulpTool {

    /// Configuration entry-point
    config(appConfig) {

        log.debug('argv', argv);

        // Set configuration object
        app.config.config = appConfig;

        // Read arguments and create a command object
        app.command.loadArgs(argv);

        // Load core packages and index them by command and fqn
        app.packages.loadCorePackages(tasks);

        // Index packages from configPath
        let taskConfigPath = app.config.val('configPath');
        app.taskConfig.indexTaskConfigs(taskConfigPath);

        // Index command aliases
        let fqnByCmd = app.config.val('commands');
        app.packages.indexPackageCommands(fqnByCmd);

        return this;
    }

    /// Run entry-point
    run(gulp) {

        // find matching package for task name
        let pkg = app.packages.getPackageForCommand(app.command.taskName);
        if (!pkg){

            log.warn('No matching commands found');
            return;
        }

        let pkgConf = app.taskConfig.getTaskConfig(app.command.taskParts);

        log.debug('pkgConf', pkgConf);
        app.task.defineTask(gulp, pkg, app.command.fullTaskName, pkgConf);

    }

};
