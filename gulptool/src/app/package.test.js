import test from 'ava';
import Package from './package';


const stripClass = s => JSON.stringify(s)

test( 'identify a package by it\'s default command', t => {

    // Arrange
    let pkg = new Package();
    let pkgMap = {
      name: 'clean',
      fqn: 'gulptool.core.clean',
      defaultCommand: 'clean',
      description: '',
      create: () => {}
    };

    // Act
    pkg.loadCorePackages([pkgMap])

    // Assert
    t.deepEqual(stripClass(pkg.getPackageForCommand('clean')), stripClass(pkgMap) );
});

test( 'does not identify a package by the default command', t => {

    // Arrange
    let pkg = new Package();

    // Act
    pkg.loadCorePackages([{
      name: 'clean',
      fqn: 'gulptool.core.clean',
      create: () => {}
    }])

    // Assert
    t.is( pkg.getPackageForCommand('clean'), null );
});


test( 'identify a package by registering a command', t => {

    // Arrange
    let pkg = new Package();
    let pkgMap = {
      defaultCommand: undefined,
      name: 'clean',
      fqn: 'gulptool.core.clean',
      description: '',
      create: () => {}
    };

    // Act
    pkg.loadCorePackages([pkgMap])
    pkg.indexPackageCommands({
      'clean': 'gulptool.core.clean'
    });

    // Assert
    t.is( stripClass(pkg.getPackageForCommand('clean')), stripClass(pkgMap) );
});
