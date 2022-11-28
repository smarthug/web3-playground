import React, { useEffect } from 'react'
import { useWeb3Store, useAccount, useWeb3 } from './hooks'

import Test from './components/test'
import { ethers } from 'ethers'

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import * as Pages from "./pages";

const INFURA_ID = 'a765912a43214d26a157438364ba1f6f'
const address = '0xc307582b04C754a77baE37Ba2BFe72f75b9b568c'


function InitWeb3() {
  // const setAddress = useWeb3Store((state) => state.setAddress)
  // const setInfuraId = useWeb3Store((state) => state.setInfuraId)
  // setAddress(address)
  // setInfuraId(INFURA_ID)

  // const setWeb3 = useWeb3Store((state) => state.setWeb3)
  // setWeb3(new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/${INFURA_ID}`))

  useWeb3Store.setState({ address: address, infuraId: INFURA_ID, web3: new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/${INFURA_ID}`) })

}

InitWeb3();

const labs = Object.entries(Pages);
// console.log(labs);

function App() {
  return (
    <Router>
      <div style={{ height: "100vh" }} className="App">
        <Routes>
          {labs.map(([k, v]) => {
            if (v.default) {
              const Tmp = v.default;
              return <Route exact key={k} path={`/${k}`} element={<Tmp />} />;
            }
            return null;
          })}
          <Route exact path={`/`} element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

function Home() {
  return (
    <React.Fragment>
      <h1 style={{ marginTop: 0 }}>LAB</h1>
      {labs.map(([k, v]) => {
        if (v.default) {
          return (
            <div key={k}>
              <Link to={`/${k}`}>{k}</Link>
            </div>
          );
        }
        return null;
      })}
    </React.Fragment>
  );
}


// function App() {
//   // 임시
//   // const setAddress = useWeb3Store((state) => state.setAddress)
//   // const setInfuraId = useWeb3Store((state) => state.setInfuraId)
//   // setAddress(address)
//   // setInfuraId(INFURA_ID)

//   const account = useAccount();
//   // const web3 = useWeb3();

//   const main = async () => {
//     const balance = await account
//     console.log("ethers : ", balance.toString())
//   }

//   // main();

//   // const main2 = async () => {
//   //   const balance = await web3.eth.getBalance(address)
//   //   console.log("web3 : ",balance.toString())
//   // }

//   useEffect(() => {
//     main()
//     // main2()

//   }, [])
//   return (
//     <div className="App">
//       <Test />
//       <Test />
//     </div>
//   );
// }

// export default App;



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