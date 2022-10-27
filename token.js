export default function getAuth (){
    const axios = require('axios');
    const data = '{\r\n\t"auth": {\r\n\t\t"identity": {\r\n\t\t\t"methods": [\r\n                                "password"\r\n                         ],\r\n\t\t\t"password": {\r\n\t\t\t\t"user": {\r\n\t\t\t\t\t"domain": {\r\n\t\t\t\t\t\t"name": "hwc43915234"\r\n\t\t\t\t\t},\r\n\t\t\t\t\t"name": "ayaan278",\r\n\t\t\t\t\t"password": "Ay@anii08"\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t},\r\n\t\t"scope": {\r\n            "project": {\r\n                "id": "febe51f0e8bd4f0cab30e6f209784563",\r\n                "name": "ap-southeast-3"\r\n            }\r\n        }\r\n\t}\r\n  }';

    const config = {
        method: 'post',
        url: 'https://iam.ap-southeast-1.myhwclouds.com/v3/auth/tokens',
        headers: {
            'Content-Type': 'application/json;charset=utf8'
        },
        data : data
    };

    axios(config)
        .then(function (response) {
            //This returns the token that is only valid for 24 hours
            // console.log(JSON.stringify(response.headers['x-subject-token']));
            // console.log(response.data);
            return JSON.stringify(response.headers['x-subject-token'])
        })
        .catch(function (error) {
            console.log(error);
        });
}
