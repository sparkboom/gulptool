import {merge} from 'lodash';

export const name = 'Print';
export const fqn = 'gulptool.core.print';
export const description = 'This tool prints out arbitrary content';

export function run(userConf = {}, args){

  let taskConf = {
    message : 'package default message',
    ...userConf
  };

  return cb => {

      console.log( `print: ${taskConf.message}` );
      cb();
  };
};
