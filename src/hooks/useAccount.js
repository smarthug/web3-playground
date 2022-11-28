
import { useEffect, useRef, useState } from "react";
import { ethers } from "ethers";
import { useWeb3Store } from "./web3Store";

export async function useAccount() {
    const web3 = useWeb3Store((state) => state.web3);
    const address = useWeb3Store((state) => state.address);

    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const getBalance = async () => {
            const balance = await web3.getBalance(address);
            setBalance(balance);
        };
        getBalance();
    }, [web3, address]);



    return balance;
}


export const obj = {
    "eth":useAccount,
  //  "klay":useAccount2
}


//useAccount() // 여기 안에서 나누기 
// if else 버리기 
