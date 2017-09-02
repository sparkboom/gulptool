/*

  Command models the command entered by the user in the form of `gulp clean:dev --force`
  The task name would be 'clean'
  The task parts are an array of parts in the task name ['clean', 'dev']
  Arguments are also modelled {force:true}

*/

import {
  pickBy,
  tail,
  isEmpty
} from 'lodash';

let _taskParts = null;
let _subTaskNames = null;
let _arguments = null;

const SEP = ':';
const thrw = m => {throw new Error(m);};

export default {

    /**

    loadArgs uses an argv object (from 'yargs' module) and creates a more intuitive command object.
    @param {object} argv - the argv object from yargs - an object that represents the arguments typed from the current command

      ARGV Notes

      I keep forgetting how argv is structured. Here it is!

      Example command:  cmd arg1:a1 arg2 arg3:a3 -o --option

      Argv would have the following properties
        _ ['arg1:a1', 'arg2', 'arg3:a3']
        o: true
        option: true
        $0 'cmd'


    */
    loadArgs(argv) {

        let gulpArgs = argv._;
        if (!isEmpty(gulpArgs)) {

          _taskParts = gulpArgs[0].split(SEP);
        }
        _arguments = pickBy(argv, (v, k) => k !== '$0' && k !== '_');
    },

    get taskName(){

        return _taskParts? _taskParts[0] : null;
    },

    get fullTaskName(){

        return _taskParts? _taskParts.join(SEP) : null;
    },

    get taskParts(){

        return _taskParts;
    },

    get arguments(){

        return _arguments;
    },
};
