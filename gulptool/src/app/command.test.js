import test from 'ava';
import cmd from './command';
import log from './log';

test( 'taskName should be null when no args are passed', t => {

  cmd.loadArgs( {_:[]} );
  t.is(cmd.taskName, null);

});

test( 'taskName should match the passed gulp task name', t => {

  cmd.loadArgs( {_:['clean']} );
  t.is(cmd.taskName, 'clean');

});

test( 'taskName should match the first part of a 2-part gulp task name', t => {

  cmd.loadArgs( {_:['clean:dev']} );
  t.is(cmd.taskName, 'clean');

});

test( 'taskName should match the first part of a 3-part gulp task name', t => {

  cmd.loadArgs( {_:['clean:dev:component1']} );
  t.is(cmd.taskName, 'clean' );
});

test( 'taskParts should break down two parts into an array', t => {

  cmd.loadArgs( {_:['clean:dev']} );
  t.deepEqual(cmd.taskParts, ['clean', 'dev']);
});

test( 'taskParts should break down 3 parts into an array', t => {

  cmd.loadArgs( {_:['clean:dev:component1']} );
  t.deepEqual(cmd.taskParts, ['clean', 'dev', 'component1']);
});

test( 'fullTaskName should match the entered value', t => {

  cmd.loadArgs( {_:['clean']} );
  t.is(cmd.fullTaskName, 'clean');
});

test( 'fullTaskName should match the entered 2-part value', t => {

  cmd.loadArgs( {_:['clean:dev']} );
  t.is(cmd.fullTaskName, 'clean:dev');
});

test( 'fullTaskName should match the entered 3-part value', t => {

  cmd.loadArgs( {_:['clean:dev:component1']} );
  t.is(cmd.fullTaskName, 'clean:dev:component1');
});
