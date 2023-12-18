export const credentials = {
    userLogin: 'user',
    userPassword: 'password',
    adminLogin: 'admin',
    adminPassword: 'password',
};

export const endpoints = {
    devStand: 'http://localhost:8080',
    loginPost: 'http://localhost:8080/login',
    getPhone: 'http://localhost:8080/simcards/getEmptyPhone',
    postCustomer: 'http://localhost:8080/customer/postCustomer',
    postFindByPhone: 'http://localhost:8080/customer/findByPhoneNumber',
    changeCustomerStatus: 'http://localhost:8080/customer/a654e604-8e05-499b-8b4c-6e9fb9f7e070/changeCustomerStatus',
};

export const testOptions = {
    scenarios: {
        ramping:{
            executor: 'ramping-vus',
            startVUs: 0,
            stages: [
                {duration: '2m', target: 120},
                {duration: '1m', target: 20},
            ],
            gracefulRampDown: '0s',
        },
        stressTest:{
            executor: 'constant-vus',
            vus: 100,
            duration: '30m',
        },
        stas: {
            executor: 'per-vu-iterations',
            vus: 1,
            iterations: 10
        },
    },
};
export const thresholdsOptions = {
    http_req_failed: ['rate<0.4'], // http errors should be less than 40%
    http_req_duration: ['p(95)<550'], // 95% of requests should be below 200ms
};
export const headers = {
    header: {'Content-Type': 'application/xml',},
};

const scenario_array = ['getEmptyPhone', 'findPhone', 'createNewCustomer', 'postNewStatusCustomer'];
export const environment = {
    scenario: __ENV.SCENARIO == 'all' ? scenario_array : (__ENV.SCENARIO || 'findPhone').split(','),
    loadType: __ENV.LOADTYPE || 'stas',
    startRPS: __ENV.STARTRPS || 1,
    endRPS: __ENV.ENDRPS || 100,
    ramps: __ENV.RAMPS || 1,
    testDuration: __ENV.TESTDURATION || 60,
    excludeTechPlaceReq: __ENV.EXCLUDE_TECHPLACE_REQ || false
}