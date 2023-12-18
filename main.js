import http from 'k6/http';
import {Trend} from 'k6/metrics';
import {credentials, endpoints, environment, testOptions, thresholdsOptions} from "./config/config.js";
import {textSummary} from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';
import {htmlReport} from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

export {findPhone} from './scenarios/findPhone.js';
export {getEmptyPhone} from './scenarios/getEmptyPhone.js';
export {createNewCustomer} from './scenarios/createNewCustomer.js';
export {postNewStatusCustomer} from './scenarios/postNewStatusCustomer.js';

export const options = {
    scenarios: {},
    thresholds: thresholdsOptions,
};

const myTrend = new Trend('waiting_time');
environment.scenario.forEach((s) => {
    options.scenarios[s] = {exec: s};
    Object.assign(options.scenarios[s], testOptions.scenarios.stressTest);
});

/*export default async function () {
for (const scenario of scenarios)
        scenario(setup(), options);
    }
};*/

export function setup() {

    let bodyUser = {
        "login": credentials.userLogin,
        "password": credentials.userPassword,
    };
    let bodyAdmin = {
        "login": credentials.adminLogin,
        "password": credentials.adminPassword,
    };
    let loginHeaders = {
        'Content-Type': 'application/json',
    };
    const loginResponseUser = http.post(endpoints.loginPost, JSON.stringify(bodyUser), {headers: loginHeaders});
    let tokenUser = loginResponseUser.json('token');

    const loginResponseAdmin = http.post(endpoints.loginPost, JSON.stringify(bodyAdmin), {headers: loginHeaders});
    let tokenAdmin = loginResponseAdmin.json('token');

    const data = {
        userToken: tokenUser,
        adminToken: tokenAdmin,
    };
    return data;
}


/**
 * Результат запуска сценариев
 */
export function handleSummary(data) {
    const date = new Date();
    date.setHours(date.getHours() + 3);
    const filenameDate = date.toISOString().split('.')[0].split(':').join('');
    const reportFile = 'result/' + filenameDate + '-result.html';

    let result = {};
    result['stdout'] = textSummary(data, {indent: " ", enableColors: true});
    result[reportFile] = htmlReport(data);

    return result;
}