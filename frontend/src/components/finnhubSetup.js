import { useState } from 'react';

const axios = require('axios')
const finnhub = require('finnhub');

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "c8obubqad3iddfsarfeg"
export const finnhubClient = new finnhub.DefaultApi()

const BASE_URL = 'finnhub.io/api/v1';
const API_KEY = 'c8obubqad3iddfsarfeg';
