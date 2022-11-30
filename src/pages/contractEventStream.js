import { ethers } from "ethers"
import { useEffect } from "react"
import { useBalance, useProvider } from "../hooks"

// 테스트
// sender
const account1 = '0x6d77be275C36761A53DBAf957fB516fA10fFf00E'
// 테스트2
// recipient
const account2 = '0x0F8eD341f75739829001D7F3b07f6AbcB869C629'

// sender private key
const privateKey2 = process.env.REACT_APP_PRIVATEKEY_TEST2

const ERC20_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)",

    "event Transfer(address indexed from, address indexed to, uint amount)",
]

const contractAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F'; // DAI contract address


export default function Test() {
    // 지금 네트워크 가 걸리라 그렀구나 ...
    // Dai 는 메인넷에서 체크해야지
    const provider = useProvider()
    const wallet = new ethers.Wallet(privateKey2, provider)
    const contract = new ethers.Contract(contractAddress, ERC20_ABI, provider);



    useEffect(() => {

        const main = async () => {
            const block = await provider.getBlockNumber()
            console.log(block);
            // let block = 16081248 
            const transferEvents = await contract.queryFilter('Transfer',block-10,block)
            console.log(transferEvents);

        }

        main()
    }, [provider])

    return (
        <div>
            sibal :fewfwef
        </div>
    )
}