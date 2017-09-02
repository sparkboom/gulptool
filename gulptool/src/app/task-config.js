
import _ from 'lodash';
import path from 'path';
import _glob from 'glob';
import process from 'process';

class TaskConfigMap{

    constructor({path, cmdAlias, env, taskConfig = null}){
        this.path = path;
        this.cmdAlias = cmdAlias;
        this.env = env;
        this.taskConfig = taskConfig;
        this.taskKey = `${cmdAlias}:${env}`;
    }

}

/**
  Holds the task configuration map objects given a task configuration key ( which is a string in the form of cmdAlias:env )

*/
const taskConfigs = {};


/*
  Task Config manages the task configurations

*/
export default class TaskConfig {

    constructor({glob = null, loader = null}){

        this.glob = glob || _glob;
        this.loader = loader || (p => require(p).default);
    }

    /**
      Uses glob pattern to find matching configuration files to read.

      @param {string} configGlob - glob to locate all configuration files

    */
    indexTaskConfigs(configGlob) {

        // replace \ with / in path to allow glob to work in windows?
        let matchingPaths = this.glob.sync( configGlob.replace(/\\/,'/') );

        _.each(matchingPaths, p => {

            let taskConfigMap = createTaskConfigMap(p);

            if (taskConfigMap){

              taskConfigs[taskConfigMap.taskKey] = taskConfigMap;
            }
        });
    }

    /**
      Retrieves the effective task configuration for a given command alias and environment.
      In effect a merged object of the environment configuration and default alias task configuration object

      @param {array}  - task aprt array where the first element is the command alias, and the second is the environment name
      @returns {Object} a custom configuration object for a specific task

    */
    getTaskConfig([cmdAlias, env]) {

        let defaultConfig = getTaskConf(cmdAlias, 'default', this.loader);
        let envConfig = getTaskConf(cmdAlias, env, this.loader);

        if (!envConfig && !defaultConfig){

            return {};
        }else if (!envConfig && defaultConfig){

            return defaultConfig;
        }else if (envConfig && !defaultConfig){

            return envConfig;
        }else{

            return _.merge({}, defaultConfig, envConfig);
        }
    }

};

/**
  Obtains the contents of the configuration file for the provided command alias and environment (unmerged)
  @param {string} cmdAlias - the command alias
  @param {string} env - environment value
  @param {function} loader - a loader function that will load the configuration value given a path name
  @returns {object} an object that represents the task configuration

*/
function getTaskConf(cmdAlias, env, loader){

    let taskMap = taskConfigs[`${cmdAlias}:${env}`];

    if(!taskMap){

        return null;
    }



    if(!taskMap.taskConfig){

        let taskConfFullPath = path.resolve( process.cwd(), taskMap.path );


        taskMap.taskConfig = loader(taskConfFullPath);
    }

    return taskMap.taskConfig;
}

/**
  Reads a path, and returns an object representing the path, command, environment, and a matching package config
  @param {string} p - path to readParts
  @returns {TaskConfigMap} - A task-config object

*/
function createTaskConfigMap(p){


    let filename = path.basename(p);
    if (!filename){

        return null;
    }

    let parts = filename.split('.');

    return new TaskConfigMap({
        path: p,
        cmdAlias: parts[0],
        env:  (parts[1] !== 'conf')? parts[1] : null
    });
}
