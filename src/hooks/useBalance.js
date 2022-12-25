
import { ethers } from "ethers";
import {  useEffect, useState } from "react";
import { useWeb3Store } from "./web3Store";

export function useBalance() {
    const web3 = useWeb3Store((state) => state.provider);
    const address = useWeb3Store((state) => state.address);

    const [balance, setBalance] = useState("Loading...");

    const fetchAndSetBalance = () => {
        Promise.all([web3.getBalance(address)]).then((values) => {
   
            setBalance(ethers.utils.formatEther(values[0]));
        });
    };


    useEffect(() => {
   
        Promise.all([web3.getBalance(address)]).then((values) => {
            
            setBalance(ethers.utils.formatEther(values[0]));
        });

        return (
            console.log("unmount")
        )
        
    }, [address, web3]);

    return [balance, fetchAndSetBalance];
}