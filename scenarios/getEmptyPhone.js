import http from 'k6/http';
import {sleep} from 'k6';
import {endpoints} from "../config/config.js";
import {describe, expect} from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js';

const scenarioName = 'Бронирование номера'
const files = {
    bodyCustomer: open("../request/createCustomer.json")
}

export function getEmptyPhone(data) {
    let reqName;
    describe(`${scenarioName}, Йота`, () => {
        const headersRequest = {
            'Content-Type': 'application/json',
            'authToken': data.userToken,
        };

        reqName = 'Получение свободных номеров';
        const getPhoneResponse = http.get(endpoints.getPhone, {headers: headersRequest});
        expect(getPhoneResponse.status, 'Get list number successful').is.equal(200);
        sleep(1);

        reqName = 'Регистрация customer в системе';
        const createCustomer = http.post(endpoints.postCustomer, files.bodyCustomer, {headers: headersRequest});
        expect(createCustomer.status, 'Create customer successful').is.equal(200);
        sleep(1);
    });
}