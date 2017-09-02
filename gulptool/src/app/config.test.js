import test from 'ava';
import config from './config';
import log from './log';


test( 'config should be set as the same value', t => {

    let c = {
      prop1: 'my default conf value'
    };

    config.config = c;
    t.is(config.config, c);
});

test( 'config should retrieve top level property', t => {

    let c = {
      prop1: 'my default conf value'
    };

    config.config = c;
    t.is(config.val('prop1'), c.prop1);
});

test( 'config should retrieve deep property', t => {

    let c = {
      prop1: 'my default conf value',
      prop2: {
        prop2a : 'deep value'
      }
    };

    config.config = c;
    t.is(config.val('prop2.prop2a'), c.prop2.prop2a);
});

test( 'config should retrieve undefined for non-existant property value', t => {

    let c = {
      prop1: 'my default conf value',
      prop2: {
        prop2a : 'deep value'
      }
    };

    config.config = c;
    t.is(config.val('prop2.prop2b'), undefined);
});
