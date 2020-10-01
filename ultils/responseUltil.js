'use strict';

const buildSuccessResponse = (data) => {
    return {
        dataset: data,
        status: 200,
        error: null
    }
}

const buildErrorResponse = (data, error) => {
    return {
        dataset: data,
        status: 200,
        error: error
    }
}

module.exports = {
    buildSuccessResponse,
    buildErrorResponse
}
