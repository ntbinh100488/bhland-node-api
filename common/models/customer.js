'use strict';
const responseUltil = require('../../ultils/responseUltil.js');

module.exports = function(Customer) {
    Customer.bh_create = function(data, cb){
        let response = {};
        console.log('data: ' + JSON.stringify(data));

        // Validation
        // phone number and email
        Customer.findOne({
            where: {
                or: [
                    {and: [{id: {neq: data.id}}, {phoneNumber: data.phoneNumber}]}, 
                    {and: [{id: {neq: data.id}}, {email: data.email}]}
                ]
            }
        },
        async (err, res) => {
            console.log('err: ' + JSON.stringify(err));
            console.log('res: ' + JSON.stringify(res));
            if(!res){
                try {
                    // create 
                    const new_customer = await Customer.upsert(data);
                    response = responseUltil.buildSuccessResponse(new_customer);
                } catch (error) {
                    response = responseUltil.buildErrorResponse(data, error);
                }
                console.log('response: ' + JSON.stringify(response));
            }else{
                response = responseUltil.buildErrorResponse(data, { message: 'Số điện thoại/Email đã tồn tại' });
            }
            cb(null, response);
        });
    }
    Customer.remoteMethod('bh_create', {
        http: { path: '/bh_create', verb: 'post' },
        accepts: { arg: 'data', type: 'object', required: true, http: { source: 'body' } },
        returns: {arg: 'response', type: 'object'}
    });
};
