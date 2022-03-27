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
                    <div id="search-input">
                        <svg height='24' role='img' viewBox="0 0 24 24" width='24' xmlns="http://www.w3.org/2000/svg">
                            <path clip-rule="evenodd" fill="var(--sp-border-color)" d="M15.3201 16.7344C14.0741 17.5354 12.5913 18 11 18C6.58172 18 3 14.4183 3 10C3 5.58172 6.58172 2 11 2C15.4183 2 19 5.58172 19 10C19 12.1038 18.1879 14.0179 16.8601 15.446L21.7071 20.293L20.2928 21.7072L15.3201 16.7344ZM17 10C17 13.3137 14.3137 16 11 16C7.68629 16 5 13.3137 5 10C5 6.68629 7.68629 4 11 4C14.3137 4 17 6.68629 17 10Z" fill-rule="evenodd"></path>
                        </svg>
                        <input placeholder="Search"
                            id="search"
                            onChange={(e) => {
                                setStock(e.target.value)
                            }} />
                    </div>
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
