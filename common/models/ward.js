'use strict';

module.exports = function(Ward) {
    Ward.bulkCreate = function(wardDatas, cb){
        let err = {};
        let response = {};
        
        console.log(JSON.stringify(wardDatas));

        let createdWards = [];
        wardDatas.forEach(createWardObj => {
            const createdWard = Ward.create(createWardObj);
            createdWards.push(createdWard);
        });

        response.status = 200;
        response.error = {};
        response.data = createdWards;
        console.log('response: ' + JSON.stringify(response));
        // response: {"status":200,"data":[{"isFulfilled":false,"isRejected":false},{"isFulfilled":false,"isRejected":false}]}

        // try {
        //     if(cb){
        //         return cb(response);
        //     }
        //     return response;
        // } catch (error) {
        //     console.log('error: ' + JSON.stringify(error));
        // }
        return cb(response);
    }

    Ward.remoteMethod('bulkCreate', {
        http: { path: '/bulkCreate', verb: 'post' },
        accepts: { arg: 'wardData', type: 'array', required: true, http: { source: 'body' } },
        returns: { arg: 'response', type: 'object' }
    });
};
