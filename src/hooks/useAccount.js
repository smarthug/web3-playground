
import { useEffect, useRef, useState } from "react";
import { ethers } from "ethers";
import { useWeb3Store } from "./web3Store";

export async function useAccount() {
    const web3 = useWeb3Store((state) => state.provider);
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


// import type { BigNumber } from '@ethersproject/bignumber'
// import { formatEther } from '@ethersproject/units'
// import type { Web3ReactHooks } from '@web3-react/core'
// import { useEffect, useState } from 'react'

// function useBalances(
//   provider?: ReturnType<Web3ReactHooks['useProvider']>,
//   accounts?: string[]
// ): BigNumber[] | undefined {
//   const [balances, setBalances] = useState<BigNumber[] | undefined>()

//   useEffect(() => {
//     if (provider && accounts?.length) {
//       let stale = false

//       void Promise.all(accounts.map((account) => provider.getBalance(account))).then((balances) => {
//         if (stale) return
//         setBalances(balances)
//       })

//       return () => {
//         stale = true
//         setBalances(undefined)
//       }
//     }
//   }, [provider, accounts])

//   return balances
// }

// export function Accounts({
//   accounts,
//   provider,
//   ENSNames,
// }: {
//   accounts: ReturnType<Web3ReactHooks['useAccounts']>
//   provider: ReturnType<Web3ReactHooks['useProvider']>
//   ENSNames: ReturnType<Web3ReactHooks['useENSNames']>
// }) {
//   const balances = useBalances(provider, accounts)

//   if (accounts === undefined) return null

//   return (
//     <div>
//       Accounts:{' '}
//       <b>
//         {accounts.length === 0
//           ? 'None'
//           : accounts?.map((account, i) => (
//               <ul key={account} style={{ margin: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>
//                 {ENSNames?.[i] ?? account}
//                 {balances?.[i] ? ` (Ξ${formatEther(balances[i])})` : null}
//               </ul>
//             ))}
//       </b>
//     </div>
//   )
// }