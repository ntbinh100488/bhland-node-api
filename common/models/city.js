'use strict';

module.exports = function(City) {
    City.ed_pop = function (count, cb) {
        console.log(count);

        var response = {};
        if(count < 0){
            response = {
                statusCode: "400",
                message: "Count less than zero"
            };
        }else{
            response = {
                statusCode: "200",
                message: `Count ${count} less than zero`
            };
        }

        return cb(response);
    }

    City.remoteMethod('ed_pop', {
        http: { path: '/ed_pop', verb: 'post' },
        accepts: { arg: 'count', type: 'number', required: true, http: { source: 'body' } },
        returns: { arg: 'response', type: 'object' }
    });
};
