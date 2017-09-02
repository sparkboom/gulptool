import gulpTool from '../../gulptool/src/index';
import gulp from 'gulp';

gulpTool
  .config({
      configPath: './tasks/**/*.js',
      commands : {
          log : 'gulptool.core.print'
      }
  })
  .run(gulp);
