/*
Config stores the user's configuration for the rest of the app to reference
*/

import {get} from 'lodash';

let _appConfig = {

    configPath : './tasks/conf'
};

export default {

    get config(){

      return _appConfig;
    },

    set config(conf) {

        _appConfig = conf;
    },

    val(path){

        return get(_appConfig,path);
    }
};
