import { ethers } from "ethers"
import { useEffect } from "react"
import { useBalance, useProvider } from "../hooks"
// import dotenv from "dotenv"
// dotenv.config();


// 테스트
// sender
const account1 = '0x6d77be275C36761A53DBAf957fB516fA10fFf00E'
// 테스트2
// recipient
const account2 = '0x0F8eD341f75739829001D7F3b07f6AbcB869C629'

// sender private key
const privateKey1 = process.env.REACT_APP_PRIVATEKEY




export default function Test() {

    const provider = useProvider()



    useEffect(() => {
        const wallet = new ethers.Wallet(privateKey1, provider)

        const main = async () => {
            const senderBalanceBefore = await provider.getBalance(account1)
            const recieverBalanceBefore = await provider.getBalance(account2)

            console.log(`\nSender balance before: ${ethers.utils.formatEther(senderBalanceBefore)}`)
            console.log(`reciever balance before: ${ethers.utils.formatEther(recieverBalanceBefore)}\n`)

            // Send Ether
            const tx = await wallet.sendTransaction({
                to: account2,
                value: ethers.utils.parseEther("0.025")
            })

            // wait for Transaction to be mined
            await tx.wait()
            console.log(tx)

            const senderBalanceAfter = await provider.getBalance(account1)
            const recieverBalanceAfter = await provider.getBalance(account2)

            console.log(`\nSender balance after: ${ethers.utils.formatEther(senderBalanceAfter)}`)
            console.log(`reciever balance after: ${ethers.utils.formatEther(recieverBalanceAfter)}\n`)
        }

        main()
    }, [provider])

    return (
        <div>
            sibal :
        </div>
    )
}