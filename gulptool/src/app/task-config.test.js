import sinon from 'sinon';
import glob from 'glob';
import test from 'ava';
import TaskConfig from './task-config';
import log from './log';
import _ from 'lodash';
import path from 'path';

test( 'getTaskConfig should retrieve the original default task configuration when a default task is requested', t => {

    // Arrange
    let config = {};
    let taskConfig = new TaskConfig({
        glob: {sync : () => ['path/clean.default.conf']},
        loader: () => config
    });
    taskConfig.indexTaskConfigs('fake-glob/**/*');

    // Act
    let retrievedConfig = taskConfig.getTaskConfig(['clean', 'default']);

    // Assert
    t.deepEqual(retrievedConfig, config);
});

test( 'getTaskConfig should retrieve the original dev task configuration when there is a dev task config, and no default task config', t => {

    // Arrange
    let config = {};
    let taskConfig = new TaskConfig({
        glob: {sync : () => ['path/clean.default.conf']},
        loader: () => config
    });
    taskConfig.indexTaskConfigs('./fake-glob/**/*');

    // Act
    let retrievedConfig = taskConfig.getTaskConfig(['clean', 'dev']);

    // Assert
    t.deepEqual(retrievedConfig, config);
});

test( 'getTaskConfig should retrieve the a merged task configuration when there is a dev and default task config', t => {

    // Arrange
    let configs = {
        'clean.default.conf':{ default:true},
        'clean.dev.conf':{ dev:true}
    };
    let taskConfig = new TaskConfig({
        glob: {sync : () => _.keys(configs)},
        loader: p => configs[path.basename(p)]
    });
    taskConfig.indexTaskConfigs('./fake-glob/**/*');

    // Act
    let retrievedConfig = taskConfig.getTaskConfig(['clean', 'dev']);

    // Assert
    t.deepEqual( retrievedConfig, { default:true, dev:true} );
});
