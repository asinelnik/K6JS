import {getPhone} from "../request/getPhone.js";
import {createCustomer} from "../request/createCustomer.js";
import {postChangeCustomerStatus} from "../request/postChangeCustomerStatus.js";
import {describe} from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js';

const scenarioName = 'Смена статуса номера'

export function postNewStatusCustomer(data) {

    describe(`${scenarioName}, Йота`, () => {
        getPhone(data);
        createCustomer(data);
        postChangeCustomerStatus(data);
    });
}

