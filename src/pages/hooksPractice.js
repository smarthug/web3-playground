import { useBalance } from "../hooks"

export default function Test() {
    const [balance] = useBalance();

    return (
        <div>
            Hooks Test : {balance}
        </div>
    )
}