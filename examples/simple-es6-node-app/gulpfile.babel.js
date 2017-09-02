import gulpTool from '../../gulptool/src/index';
import gulp from 'gulp';

gulpTool
  .config({
      configPath: './tasks/**/*.conf.js',
      commands : {
          reset : 'gulptool.core.clean',
          make : 'gulptool.core.webpack'
      }
  })
  .run(gulp);
