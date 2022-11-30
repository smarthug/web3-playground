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
const privateKey2 = process.env.REACT_APP_PRIVATEKEY_TEST2

const ERC20_ABI = [
    "function balanceOf(address) view returns (uint)",
    "function transfer(address to, uint amount) returns (bool)",
]

const contractAddress = '0x326C977E6efc84E512bB9C30f76E30c160eD06FB';


export default function Test() {

    const provider = useProvider()
    const wallet = new ethers.Wallet(privateKey2, provider)
    const contract = new ethers.Contract(contractAddress, ERC20_ABI, provider);



    useEffect(() => {

        const main = async () => {

            const balance = await contract.balanceOf(account2)

            console.log(`\nReading from ${contractAddress}\n`)
            console.log(`Balance of sender: ${balance}\n`);

            const contractWithWallet = contract.connect(wallet)

            const tx = await contractWithWallet.transfer(account1, balance)
            await tx.wait()

            console.log(tx)

            const balanceOfSender = await contract.balanceOf(account2)
            const balanceOfReciever = await contract.balanceOf(account1)

            console.log(`Balance of sender: ${balanceOfSender}`);
            console.log(`Balance of reciever: ${balanceOfReciever}\n`);
        }

        main()
    }, [provider])

    return (
        <div>
            sibal :
        </div>
    )
}