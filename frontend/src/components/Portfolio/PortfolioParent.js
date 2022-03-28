import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAsset } from "../../store/asset";
import { Sidebar } from "../Sidebar/Sidebar";
import { Portfolio } from "./Portfolio";

export const PortfolioParent = () => {

    const user = useSelector(state => state?.session?.user)
    const assets = useSelector(state => state?.assetReducer?.assetsArray);
    const [tickers, setTickers] = useState('')

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAsset(user.id))


        if (assets) setTickers(Object.keys(assets));

    }, [])

    return (
        <>
            <div>
                <Portfolio />
                <Sidebar assets={tickers}/>
            </div>
        </>
    )
}
