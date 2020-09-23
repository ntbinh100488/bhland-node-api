'use strict';

const e = require('express');
const cron = require('../../cron/cron-init.js');

module.exports = function(City) {
    City.startStopCron = function(startCron){
        if(cron){
            if(startCron){
                cron.startAll();
                console.log('started Jobs');
            }else{
                cron.stopAll();
                console.log('Stoped all crons');
            }
        }else{
            console.log('cron undefined');
        }
    }
    City.remoteMethod('startStopCron', {
        http: { path: '/startStopCron', verb: 'post' },
        accepts: { arg: 'startCron', type: 'boolean', required: true, http: { source: 'body' } },
        returns: { arg: 'response', type: 'object' }
    });

    City.setTimeAndRestartCron = function(timeCron){
        if(cron){
            cron.setTimeAll(timeCron);
            cron.startAll();
            console.log('set TimeAll');
        }else{
            console.log('cron undefined');
        }
    }
    City.remoteMethod('setTimeAndRestartCron', {
        http: { path: '/setTimeAndRestartCron', verb: 'post' },
        accepts: { arg: 'timeCron', type: 'string', required: true, http: { source: 'body' } },
        returns: { arg: 'response', type: 'object' }
    });

    City.bulkCreate = function(cityData, cb){
        let err = {};
        let response = {};
        
        console.log(JSON.stringify(cityData));
        // [{"name":"An Giang", "cityType": "Tỉnh"}, {"name":"Hồ Chí Minh", "cityType": "Thành Phố"}]

        // let createdCities = [];
        // cityData.forEach(createCityObj => {
        //     const createdCity = City.create(createCityObj);
        //     createdCities.push(createdCity);
        // });

        // response.status = 200;
        // response.error = {};
        // response.data = createdCities;
        // console.log('response: ' + JSON.stringify(response));
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
