import webpack from 'webpack';
import gutil from 'gulp-util';

export const name = 'Webpack';
export const fqn = 'gulptool.core.webpack';
export const description = 'This task uses a webpack configuration to build';

export function create(userConf = {}, args){

  let taskConf = {
      ...userConf
  };

  return cb => {

    webpack(taskConf, (err, stats) => {

        if(err) throw new gutil.PluginError('webpack', err);

        gutil.log('[webpack]', stats.toString({ }));
        cb();
    });
  };
};
