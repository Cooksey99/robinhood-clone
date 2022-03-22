
import { StockChart } from './StockChart'
import './portfolio.css'

export const Portfolio = () => {

    // const finnhub = require('finnhub');

    // const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    // api_key.apiKey = "c8obubqad3iddfsarfeg"
    // const finnhubClient = new finnhub.DefaultApi()

    // finnhubClient.quote('AAPL', (error, data, response) => {
    //   console.log(data)
    // });

    return (
        <>
            <div id="main-info-container">
                <StockChart option='portfolio'/>
            </div>
        </>
    )
}
