import _ from 'lodash';
import path from 'path';
import glob from 'glob';
import process from 'process';
import _log from './log';


class PackageItem{

  constructor({name, defaultCommand, fqn, description, create}){

      this.name = name;
      this.fqn = fqn;
      this.defaultCommand = defaultCommand;
      this.description = description;
      this.create = create;
  }
}

/*
  Package manages the available task packages

*/
export default class Package {

    constructor(log){

        this.log = log || _log;
        this._packagesByFqn = {};
        this._fqnsByCmd = {};
    }

    /**
      Saves an array of packages, and indexes fqns and mapped commands
      @param {array} packages - An array of package objects

    */
    loadCorePackages(packages) {

        // Ensure fqn are unique
        let uniqPackages = _.uniqBy(packages, p => p.fqn);
        if (uniqPackages.length < packages.length){

            let conflictingPackages = _.difference( packages, uniqPackages );
            this.log.warn(`There has been a full-qualified name conflict: ${ _.map(conflictingPackages, p => p.fqn) }`);
        }

        // Store packages, index by fully-qualified name
        this._packagesByFqn = _(packages)
                            .groupBy(p => p.fqn)
                            .mapValues(ps => new PackageItem(ps[0]) )
                            .value();

        // Store all fqns triggered by each command
        this._fqnsByCmd = _(this._packagesByFqn)
                      .groupBy(p => p.defaultCommand)
                      .mapValues(pkgList => _.map(pkgList,  p => p.fqn))
                      .value();
    }

    indexPackageCommands(fqnByCmd) {

        _.merge(this._fqnsByCmd, _.mapValues(fqnByCmd, fqn => _.isArray(fqn)? fqn: [fqn] ));
    }

    /**
      Retrieves the best matching package for the command, or null if nothing matched
      @param {string} cmdAlias - the command alias to use to search
      @returns {PackageItem} or {null} if not found

    */
    getPackageForCommand (cmdAlias) {

        let fqn = this._fqnsByCmd[cmdAlias];
        if (!fqn || _.isEmpty(fqn)){

          return null;
        }
        return this._packagesByFqn[fqn[0]] || null;
    }

};
