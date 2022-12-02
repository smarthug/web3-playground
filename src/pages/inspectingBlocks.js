import { ethers } from "ethers"
import { useEffect } from "react"
import { useBalance, useProvider } from "../hooks"

// 테스트
// sender
const account1 = '0x6d77be275C36761A53DBAf957fB516fA10fFf00E'
// 테스트2
// recipient
const account2 = '0x0F8eD341f75739829001D7F3b07f6AbcB869C629'



const contractAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F'; // DAI contract address


export default function Test() {
    // 지금 네트워크 가 걸리라 그렀구나 ...
    // Dai 는 메인넷에서 체크해야지
    const provider = useProvider()
    // const wallet = new ethers.Wallet(privateKey2, provider)
    // const contract = new ethers.Contract(contractAddress, ERC20_ABI, provider);



    useEffect(() => {

        const main = async () => {

            const blockNumber = await provider.getBlockNumber()
            const block = await provider.getBlock(blockNumber)

            console.log(block);

            // const blockWithTransactions = await provider.getBlockWithTransactions(blockNumber)
            const { transactions } = await provider.getBlockWithTransactions(blockNumber)

            console.log(transactions[0]);
        }

        main()
    }, [provider])

    return (
        <div>
            sibal :fewfwef
        </div>
    )
}