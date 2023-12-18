import {describe} from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js';
import {findPhoneSoap} from "../request/findPhoneSoap.js";
import {getPhone} from "../request/getPhone.js";
import {createCustomer} from "../request/createCustomer.js";

const scenarioName = 'Проверка присвоения id в старом сервисе SOAP';

export function findPhone(data) {
    describe(`${scenarioName}, Йота`, () => {
        /************
         STEP 1: Получение свободных номеров
         ************/
        getPhone(data);
        /************
         STEP 2: Регистрация владельца номера
         ************/
        createCustomer(data);
        /************
         STEP 3: Проверка что зарегистрированный кастомер есть в соап сервисе
         ************/
        findPhoneSoap(data);
    });
}



