import { useWeb3Store } from "./web3Store";

export function useProvider() {
    const provider = useWeb3Store((state) => state.provider);
    // const web3 = new Web3(`https://goerli.infura.io/v3/${infuraId}`)
    return provider;
}