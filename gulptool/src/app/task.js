/*
  Task manages the creation of tasks

*/
import log from 'loglevel';

export default {

    defineTask(gulp, pkg, taskName, pkgConf) {

        log.debug(`creating task '${taskName}', with '${pkg.fqn}'`);
        gulp.task( taskName,  pkg.create(pkgConf) );
    }
};
