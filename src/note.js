
// import { initializeConnector } from '@web3-react/core'
// import { MetaMask } from '@web3-react/metamask'

// export const [metaMask, hooks] = initializeConnector<MetaMask>((actions) => new MetaMask({ actions }))


// import { useEffect, useState } from 'react'
// import { hooks, metaMask } from '../../connectors/metaMask'
// import { Card } from '../Card'

// const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider, useENSNames } = hooks

// export default function MetaMaskCard() {
//   const chainId = useChainId()
//   const accounts = useAccounts()
//   const isActivating = useIsActivating()

//   const isActive = useIsActive()

//   const provider = useProvider()
//   const ENSNames = useENSNames(provider)

//   const [error, setError] = useState(undefined)

//   // attempt to connect eagerly on mount
//   useEffect(() => {
//     void metaMask.connectEagerly().catch(() => {
//       console.debug('Failed to connect eagerly to metamask')
//     })
//   }, [])

//   return (
//     <Card
//       connector={metaMask}
//       chainId={chainId}
//       isActivating={isActivating}
//       isActive={isActive}
//       error={error}
//       setError={setError}
//       accounts={accounts}
//       provider={provider}
//       ENSNames={ENSNames}
//     />
//   )
// }






// // web3-react core
// const ACCOUNTS = ({ accounts }: Web3ReactState) => accounts
// const ACCOUNTS_EQUALITY_CHECKER: EqualityChecker<Web3ReactState['accounts']> = (oldAccounts, newAccounts) =>
//     (oldAccounts === undefined && newAccounts === undefined) ||
//     (oldAccounts !== undefined &&
//         oldAccounts.length === newAccounts?.length &&
//         oldAccounts.every((oldAccount, i) => oldAccount === newAccounts[i]))


// function useAccounts(): Web3ReactState['accounts'] {
//     // return useConnector(ACCOUNTS, ACCOUNTS_EQUALITY_CHECKER)
//     return useStore(ACCOUNTS, ACCOUNTS_EQUALITY_CHECKER)
// }


// // 그냥 이정도 수준이네
// // 결국 zustand 스토어에서 훅스 하나 빼주는 것을 wrapper 로 감싼것인데 , 이퀄리티 체크를 곁들인...







// // web3-react store
// import { getAddress } from '@ethersproject/address'
// import type { Actions, Web3ReactState, Web3ReactStateUpdate, Web3ReactStore } from '@web3-react/types'
// import { createStore } from 'zustand'

// /**
//  * MAX_SAFE_CHAIN_ID is the upper bound limit on what will be accepted for `chainId`
//  * `MAX_SAFE_CHAIN_ID = floor( ( 2**53 - 39 ) / 2 ) = 4503599627370476`
//  *
//  * @see {@link https://github.com/MetaMask/metamask-extension/blob/b6673731e2367e119a5fee9a454dd40bd4968948/shared/constants/network.js#L31}
//  */
// export const MAX_SAFE_CHAIN_ID = 4503599627370476

// function validateChainId(chainId: number): void {
//     if (!Number.isInteger(chainId) || chainId <= 0 || chainId > MAX_SAFE_CHAIN_ID) {
//         throw new Error(`Invalid chainId ${chainId}`)
//     }
// }

// function validateAccount(account: string): string {
//     return getAddress(account)
// }

// const DEFAULT_STATE = {
//     chainId: undefined,
//     accounts: undefined,
//     activating: false,
// }

// export function createWeb3ReactStoreAndActions(): [Web3ReactStore, Actions] {
//     const store = createStore < Web3ReactState > ()(() => DEFAULT_STATE)

//     // flag for tracking updates so we don't clobber data when cancelling activation
//     let nullifier = 0

//     /**
//      * Sets activating to true, indicating that an update is in progress.
//      *
//      * @returns cancelActivation - A function that cancels the activation by setting activating to false,
//      * as long as there haven't been any intervening updates.
//      */
//     function startActivation(): () => void {
//         const nullifierCached = ++nullifier

//         store.setState({ ...DEFAULT_STATE, activating: true })

//         // return a function that cancels the activation iff nothing else has happened
//         return () => {
//             if (nullifier === nullifierCached) store.setState({ activating: false })
//         }
//     }

//     /**
//      * Used to report a `stateUpdate` which is merged with existing state. The first `stateUpdate` that results in chainId
//      * and accounts being set will also set activating to false, indicating a successful connection.
//      *
//      * @param stateUpdate - The state update to report.
//      */
//     function update(stateUpdate: Web3ReactStateUpdate): void {
//         // validate chainId statically, independent of existing state
//         if (stateUpdate.chainId !== undefined) {
//             validateChainId(stateUpdate.chainId)
//         }

//         // validate accounts statically, independent of existing state
//         if (stateUpdate.accounts !== undefined) {
//             for (let i = 0; i < stateUpdate.accounts.length; i++) {
//                 stateUpdate.accounts[i] = validateAccount(stateUpdate.accounts[i])
//             }
//         }

//         nullifier++

//         store.setState((existingState): Web3ReactState => {
//             // determine the next chainId and accounts
//             const chainId = stateUpdate.chainId ?? existingState.chainId
//             const accounts = stateUpdate.accounts ?? existingState.accounts

//             // ensure that the activating flag is cleared when appropriate
//             let activating = existingState.activating
//             if (activating && chainId && accounts) {
//                 activating = false
//             }

//             return { chainId, accounts, activating }
//         })
//     }

//     /**
//      * Resets connector state back to the default state.
//      */
//     function resetState(): void {
//         nullifier++
//         store.setState(DEFAULT_STATE)
//     }

//     return [store, { startActivation, update, resetState }]
// }






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
