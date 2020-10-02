var server = require('../server');
    var ds = server.dataSources.mysql;
    // var lbTables = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role', 'note', 'staff', 'city', 'district', 'ward', 'realestate'];
    // var lbTables = ['liabilitystatus', 'liabilitytype', 'liability'];
    // var lbTables = ['customer', 'customerbudget', 'customertype'];
    // var lbTables = ['customer'];
    var lbTables = ['customergroup'];

    ds.automigrate(lbTables, function(er) {
        if (er) throw er;
        console.log('Loopback tables [' - lbTables - '] created in ', ds.adapter.name);
        ds.disconnect();
    });

