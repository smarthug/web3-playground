
import { ethers } from "ethers";
import { useWeb3Store } from "./web3Store";

export function useAccount() {
    const infuraId = useWeb3Store((state) => state.infuraId);
    const provider = new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/${infuraId}`)
    return provider;
}