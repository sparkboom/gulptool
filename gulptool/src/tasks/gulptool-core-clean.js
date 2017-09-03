import {merge} from 'lodash';
import del from 'del';

export const name = 'Clean';
export const fqn = 'gulptool.core.clean';
export const description = 'This tool removes files/folder contents';
export const defaultCommand = 'clean';

export function create(userConf = {}, args){

  let taskConf = {
      force: true,
      ...userConf
  };

  return () => {

      console.log( `clean: ${taskConf.path}`);
      return del(taskConf.path, {force:taskConf.force});
  };
};
