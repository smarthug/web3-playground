import React, { useEffect } from 'react'
import { useWeb3Store,useAccount,useWeb3 } from './hooks'

const INFURA_ID = 'a765912a43214d26a157438364ba1f6f'
const address = '0xc307582b04C754a77baE37Ba2BFe72f75b9b568c'


function App() {
  // 임시
  const setAddress = useWeb3Store((state) => state.setAddress)
  const setInfuraId = useWeb3Store((state) => state.setInfuraId)
  setAddress(address)
  setInfuraId(INFURA_ID)

  const account = useAccount();
  // const web3 = useWeb3();

  const main = async () => {
    const balance = await account.getBalance(address)
    console.log("ethers : ",balance.toString())
  }

  // const main2 = async () => {
  //   const balance = await web3.eth.getBalance(address)
  //   console.log("web3 : ",balance.toString())
  // }

  useEffect(() => {
    // main()
    // main2()
  }, [])
  return (
    <div className="App">
      test
    </div>
  );
}

export default App;



// import { initializeConnector } from '@web3-react/core'
// import { Empty, EMPTY } from '@web3-react/empty'
// import React from 'react'

// const [, { useAccount }] = initializeConnector(() => EMPTY);

// function App() {
//   const account = useAccount();
//   return (
//     <div className="App">
//       Account: {account ?? "none"}
//     </div>
//   );
// }

// export default App;