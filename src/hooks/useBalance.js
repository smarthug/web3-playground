
import { useCallback, useEffect, useState } from "react";
import { useWeb3Store } from "./web3Store";

export function useBalance() {
    const web3 = useWeb3Store((state) => state.web3);
    const address = useWeb3Store((state) => state.address);

    const [balance, setBalance] = useState("Loading...");

    const fetchAndSetBalance = () => {
        Promise.all([web3.getBalance(address)]).then((values) => {
            // console.log(values);
            setBalance(values.toString());
        });
    };


    useEffect(() => {
        // fetchAndSetBalance();
        Promise.all([web3.getBalance(address)]).then((values) => {
            // console.log(values);
            setBalance(values.toString());
        });

        return (
            console.log("unmount")
        )
        // 여기에 하나를 추가함으로서 자동 밸런스 변화를 알 수 있을만한 걸 추가할 수 있을까?? 뭐 그냥 거래 횟수 숫자 상수를 넣어도 가능은 할듯
    }, [address, web3]);

    return [balance, fetchAndSetBalance];
}