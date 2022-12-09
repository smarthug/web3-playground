import { useEffect, useRef, useState } from "react";
import moment from "moment";

export default function AutoFaucet() {
    // const { account } = useWeb3React();
    const [address, setAddress] = useState(localStorage.getItem("address") ?? "0x6d77be275C36761A53DBAf957fB516fA10fFf00E")
    const [balance, setBalance] = useState(0);
    const [time, setTime] = useState(0);
    const [error, setError] = useState("");

    const inputRef = useRef(null);



    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(address);

            checkFaucet()
            // last time visit 갱신 
        } catch (error) {
        }
    }

    function setNewAddress() {
        localStorage.setItem("address", inputRef.current.value)
        setAddress(inputRef.current.value)
    }

    function goToFaucet() {

        window.open("https://goerlifaucet.com/")
        window.open("https://mumbaifaucet.com/")

        localStorage.setItem("lastTimeVisit", moment().format())
        localStorage.setItem("lastTimeVisitMS", Date.now())

    }

    function checkFaucet() {
        let start = localStorage.getItem("lastTimeVisitMS") ?? 0

        let elapsed = Date.now() - start

        let elapsedHour = elapsed / 1000 / 60 / 60
        console.log(elapsedHour);
        // if() 24 hour + 라면 ,
        if (elapsedHour > 24) {
            goToFaucet()
        } else {
            setError("24시간이 지나지 않았습니다.")
        }
    }

    useEffect(() => {


        let time = moment(localStorage.getItem("lastTimeVisit")).fromNow()
        setTime(time)

        handleCopy()
    }, []);

    return (
        <div>
            <h1>Auto Faucet</h1>
            <h3>Last time visit : {time}</h3>
            <h4>{error}</h4>
            <button onClick={handleCopy}>
                copy
            </button>
            <p>Address: {address}</p>
            <input ref={inputRef}></input>
            <button onClick={setNewAddress}>Set New Address</button>
            <p>Balance: {balance}</p>

            <button onClick={goToFaucet}>Go to Faucet</button>
            <div>

                <a href={"https://goerlifaucet.com/"} >goerili</a>
            </div>

            <div>

                <a href={"https://mumbaifaucet.com/"} >mumbai</a>
            </div>
        </div>
    );
}

