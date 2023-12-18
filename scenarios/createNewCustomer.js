import {describe} from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js';
import {getPhone} from "../request/getPhone.js";
import {createCustomer} from "../request/createCustomer.js";

const scenarioName = 'Бронирование номера'

export function createNewCustomer(data) {
    describe(`${scenarioName}, Йота`, () => {
        getPhone(data);
        createCustomer(data);
    });
}