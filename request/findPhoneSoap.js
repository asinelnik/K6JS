import http from 'k6/http';
import {sleep} from 'k6';
import {endpoints, headers} from "../config/config.js";
import {expect} from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js';


export function findPhoneSoap(data) {
    const bodyXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <ns3:Envelope xmlns:ns2="soap" xmlns:ns3="http://schemas.xmlsoap.org/soap/envelope">
    <ns2:Header>
        <authToken>${data.userToken}</authToken>
    </ns2:Header>
    <ns2:Body>
        <phoneNumber>79280055208</phoneNumber>
    </ns2:Body>
    </ns3:Envelope>`;

    const findByPhoneRes = http.post(endpoints.postFindByPhone, bodyXml, headers.header);
    expect(findByPhoneRes.status).is.equal(200);
    sleep(1);
}




