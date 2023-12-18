import http from 'k6/http';
import {sleep} from 'k6';
import {endpoints} from "../config/config.js";
import {expect} from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js';

export function getPhone(data) {

    const headersRequest = {
        'Content-Type': 'application/json',
        'authToken': data.userToken,
    };

    const getPhoneResponse = http.get(endpoints.getPhone, {headers: headersRequest});
    expect(getPhoneResponse.status, 'Get list number successful').is.equal(200);
    sleep(1);
}
