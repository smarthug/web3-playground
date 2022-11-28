import {useBalance} from "../hooks"

export default function Test2(){
    const [balance] = useBalance();
    return (
        <div>
            Hooks Test2 : {balance}
        </div>
    )
}