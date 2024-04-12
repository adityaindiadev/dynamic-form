import authTokenJSON from '@/env.json'

class ConstantClass {


    constructor() {


    }

    BASE_URL = "https://proh2r.com/api/proh2r/v1/";
    EXPENSE_RECORD = 'expense/application/';

    authDict = {
        employeeCode: 'n001'
    }

    getHeader() {

        const authToken = authTokenJSON.authToken
        

        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.set("Authorization", authToken);
        requestHeaders.set('realm', 'HPAdhesivesRealm');
        requestHeaders.set('x-tenant-id', '26');
        requestHeaders.set('Content-type', 'application/json');

        return requestHeaders

    }



}

const Constants = new ConstantClass()

export default Constants