'use strict';

module.exports = function(City) {
    City.bulkCreate = function(cityData, cb){
        let err = {};
        let response = {};
        
        console.log(JSON.stringify(cityData));
        // [{"name":"An Giang", "cityType": "Tỉnh"}, {"name":"Hồ Chí Minh", "cityType": "Thành Phố"}]

        let createdCities = [];
        cityData.forEach(createCityObj => {
            const createdCity = City.create(createCityObj);
            createdCities.push(createdCity);
        });

        response.status = 200;
        response.error = {};
        response.data = createdCities;
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

    City.remoteMethod('bulkCreate', {
        http: { path: '/bulkCreate', verb: 'post' },
        accepts: { arg: 'cityData', type: 'array', required: true, http: { source: 'body' } },
        returns: { arg: 'response', type: 'object' }
    });
};
