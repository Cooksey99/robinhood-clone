import { useEffect, useState } from "react"


export const Search = () => {

    const [stock, setStock] = useState('')
    const [returnVal, setReturnVal] = useState({});

    const finnhub = require('finnhub');

    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = "c8obubqad3iddfsarfeg"
    const finnhubClient = new finnhub.DefaultApi()

    useEffect(() => {
        finnhubClient.symbolSearch('AAPL', (error, data, response) => {
              console.log(data)
            // setReturnVal(data)
            // console.log(returnVal)
        });
    }, [stock, returnVal])

    return (
        <>
            <div>
                <form>
                    <input placeholder="Search"
                        onChange={(e) => {
                            setStock(e.target.value)
                        }} />
                </form>
                {stock && (
                    <h1>test</h1>
                )}
            </div>
        </>
    )
}
