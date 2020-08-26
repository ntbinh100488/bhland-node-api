var server = require('../server');
    var mySqlDs = server.dataSources.mysql;
    
    console.log("RUNNING MIGRATION");
    mySqlDs.autoupdate(mySqlDs.name, function (err, result) {
        if (err) throw err;
        console.log('Loopback tables [' - mySqlDs.name - '] autoupdate in ', mySqlDs.adapter.name);

        mySqlDs.discoverModelProperties('City', function (err, props) {
            console.log(props);
        });
    });
    mySqlDs.isActual(models, function(err, actual) {
        console.log();
        if (err) throw err;
        if (!actual) {
          dataSource.autoupdate(models, function(err, result) {
            // ...
          });
        }
      });
