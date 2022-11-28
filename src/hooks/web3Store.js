import create from 'zustand'
import {devtools} from 'zustand/middleware'

// export const useWeb3Store = create((set) => ({
//     web3: null,
//     setWeb3: (web3) => set({ web3 }),
//     account: null,
//     setAccount: (account) => set({ account }),
//     address: null,
//     setAddress: (address) => set({ address }),
//     infuraId: null,
//     setInfuraId: (infuraId) => set({ infuraId }),
//     chainId: null,
//     setChainId: (chainId) => set({ chainId })
// }))



export const useWeb3Store = create(devtools((set) => ({
    web3: null,
    setWeb3: (web3) => set({ web3 }),
    account: null,
    setAccount: (account) => set({ account }),
    address: null,
    setAddress: (address) => set({ address }),
    infuraId: null,
    setInfuraId: (infuraId) => set({ infuraId }),
    chainId: null,
    setChainId: (chainId) => set({ chainId })
})))

// function App() {
//   // const account = useAccount();

//   const main = async () => {
//     const balance = await provider.getBalance(address)
//     console.log(balance.toString())
//   }
//   useEffect(() => {
//     main()
//   }, [])
//   return (
//     <div className="App">
//       test
//     </div>
//   );
// }

// export default App;