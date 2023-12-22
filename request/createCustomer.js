import http from 'k6/http';
import {sleep} from 'k6';
import {endpoints} from "../config/config.js";
import {expect} from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js';

const files = {
    bodyCustomer: open("../request/createCustomer.json")

}
export function createCustomer(data){
    const headersRequest = {
        'Content-Type': 'application/json',
        'authToken': data.userToken,
    };
    const createCustomer = http.post(endpoints.postCustomer, files.bodyCustomer, {headers: headersRequest});
    expect(createCustomer.status, 'Create customer successful').is.equal(200);
    sleep(1);
}