import http from 'k6/http';
import {sleep} from 'k6';
import {endpoints} from "../config/config.js";
import {expect} from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js';

export function postChangeCustomerStatus(data) {
    const body = {"status": "ACTIVE"};
    const headers = {
        'Content-Type': 'application/json',
        'authToken': data.userToken,
    };

    const changeCustomerStatus = http.post(endpoints.changeCustomerStatus, body, {headers: headers});
    expect(changeCustomerStatus.status, 'Success change status customer').is.equal(200);
    sleep(1);
}