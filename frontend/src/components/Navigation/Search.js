import { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom";
import { finnhubClient } from "../finnhubSetup";

export const Search = () => {

    const history = useHistory();

    const [stock, setStock] = useState('')
    const [returnVal, setReturnVal] = useState({});

    // const finnhub = require('finnhub');

    // const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    // api_key.apiKey = "c8obubqad3iddfsarfeg"
    // const finnhubClient = new finnhub.DefaultApi()

    const handleSubmit = async (e) => {
        e.preventDefault();

        finnhubClient.companyPeers(stock, async (error, data, response) => {
            await data;
            // console.log(data);
            // let obj = {};
            // let symbol;
            // let name;
            // // let symbol = {};
            // for (let i = 0; i < 6; i ++) {
            //     symbol = data.result[i].symbol;
            //     name = data.result[i].description;
            //     obj[i] = { symbol, name }
            // }
            data.splice(6);
            console.log(data)
            setReturnVal(data)
        });
        // console.log(returnVal)
    }

    useEffect(() => {

    }, [stock, returnVal])

    return (
        <>
            <div id="search-component">
                <form onSubmit={handleSubmit}>
                    <input placeholder="Search"
                        onChange={(e) => {
                            setStock(e.target.value)
                        }} />
                </form>
                {returnVal.length > 0 && (
                    <div id="search-result-div" onMouseLeave={() => setReturnVal({})}>
                        <h4>Stocks</h4>
                        {returnVal.map(stock => (
                            <p className='search-result'
                                onClick={() => history.push(`/asset/${stock}`)}>{stock}</p>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}
