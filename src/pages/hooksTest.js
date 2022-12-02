import { useState } from "react";
import { useTest } from "../hooks"

export default function Test() {
    const [state, setState] = useState(0)
    const test = useTest(state);

    return (
        <div>
            Hooks Test : {test}
            <button onClick={() => setState(state + 1)}>Click</button>
        </div>
    )
}