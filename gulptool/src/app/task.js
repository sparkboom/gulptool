/*
  Task manages the creation of tasks
  
*/
import log from 'loglevel';

export default {

    defineTask(gulp, pkg, taskName, pkgConf) {

        gulp.task( taskName,  pkg.run(pkgConf) );
        log.debug(`created task '${taskName}', with '${pkg.fqn}'`);
    }
};