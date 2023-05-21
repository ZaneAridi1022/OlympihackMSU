import SelectChains from "../components/popup/SelectChains";
import { useState, useEffect } from "react";
import GithubDataDisplay from '../components/githubdata/GithubDataDisplay';

function TestDropDown() {
    const [mintChain,onSelect] = useState("mainnet")

    useEffect(() => {
        console.log(mintChain)
    }, [mintChain])

    return (
        <>
            {<SelectChains onSelect={onSelect}/>}
            {<GithubDataDisplay user={'ZaneAridi1022'}/>}
        </>
    )
}

export default TestDropDown;