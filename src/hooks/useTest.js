import { useEffect, useState } from "react";

export function useTest(num) {
    const [test, setTest] = useState(num);

    useEffect(() => {
        console.log("test");
        setTest(num + 1);
        // console.log(test);
    }, [num]);

    return test
}