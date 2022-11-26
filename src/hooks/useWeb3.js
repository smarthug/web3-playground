
import Web3 from "web3";
import { useWeb3Store } from "./web3Store";

export function useWeb3() {
    const infuraId = useWeb3Store((state) => state.infuraId);
    const web3 = new Web3(`https://goerli.infura.io/v3/${infuraId}`)
    return web3;
}