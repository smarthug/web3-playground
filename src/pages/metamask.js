import { useState } from 'react'
import { WagmiConfig, configureChains, createClient } from 'wagmi'
import { getDefaultProvider } from 'ethers'
import Web3 from 'web3'

import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi'
// import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

import { publicProvider } from 'wagmi/providers/public'

import { mainnet, goerli, polygon, polygonMumbai } from 'wagmi/chains'

const { chains, provider } = configureChains(
    [mainnet, goerli, polygon, polygonMumbai],
    [publicProvider()],
)

console.log(chains);
let num = 1;
const client = createClient({
    autoConnect: true,
    connectors: [new MetaMaskConnector({ chains })],
    provider,
})

// const client = createClient({
//     autoConnect: true,
//     provider: new Web3(Web3.givenProvider),
// })
console.log(Web3.givenProvider);
export default function App() {
    const [chainId, setChainId] = useState(num);

    function handleChange(e) {
        console.log(chainId)
        console.log(e.target.value)
        setChainId(e.target.value)
        num = e.target.value
        // refetch().then((res) => {
        //     console.log(res)
        // })
    }


    return (
        <WagmiConfig client={client}>
            <Profile />

            <Balance chainId={num} />
            <select onChange={handleChange} name="pets" id="pet-select">
                <option value={1}>ETH</option>
                <option value={5}>goerli</option>
                <option value={137}>Polygon</option>
                <option value={80001}>Mumbai</option>

            </select>
        </WagmiConfig>
    )
}




function Profile() {

    const { address, isConnected } = useAccount()
    const { connect } = useConnect({
        connector: new MetaMaskConnector(),
    })
    const { disconnect } = useDisconnect()







    if (isConnected)
        return (
            <div>
                Connected to {address}
                <button onClick={() => disconnect()}>Disconnect</button>

            </div>
        )
    return <button onClick={() => connect()}>Connect Wallet</button>
}

function Balance({ chainId }) {
    const { address, isConnected } = useAccount()

    const { data, isError, isLoading, refetch } = useBalance({
        address: address,
        chainId: Number(chainId),
    })

 

    if (isLoading) return <div>Fetching balance…</div>
    if (isError) return <div>Error fetching balance</div>
    return (
        <div>
            <div>
                Balance: {data?.formatted} {data?.symbol}
            </div>
            
        </div>
    )
}