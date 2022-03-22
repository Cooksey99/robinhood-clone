import { useState } from 'react';

const axios = require('axios')
const finnhub = require('finnhub');

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "c8obubqad3iddfsarfeg"
export const finnhubClient = new finnhub.DefaultApi()

const BASE_URL = 'finnhub.io/api/v1';
const API_KEY = 'c8obubqad3iddfsarfeg';

let stockInfo = {};

export const finnhubFetch = () => {
    // finnhubClient[reqType](stock, (error, data, response) => {
    //   console.log(data)
    // })

    finnhubClient.quote("AAPL", (error, data, response) => {
        // console.log(data)
        stockInfo = data;
    });
    console.log('stockInfo', stockInfo);
    // fetch(`https://finnhub.io/api/v1/quote?symbol=AAPL&token=c8obubqad3iddfsarfeg`)

    // let final = await testing.json();
    // console.log('second time', testing)
    // return result;
    // let result = await axios.get('https://finnhub.io/api/v1/quote?symbol=AAPL&token=c8obubqad3iddfsarfeg')
    //     .then(function (response) {
    //         console.log(response);
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })
    //     .then(function (){
    //     });

    // console.log('result', result)

}

