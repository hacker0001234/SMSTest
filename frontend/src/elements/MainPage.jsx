import {useEffect, useState} from "react";
import axios from "axios";


export default function MainPage() {
    const [phone, setPhone] = useState("");
    const [code, setCode] = useState("");
    const [response, setResponse] = useState("");

    const changePhone = (event) => {
        setPhone(event.target.value);
    }
    const add = () => {
        axios.post("http://localhost:8080/auth/request-otp", {phone: phone},{withCredentials:true});
    }


    const codeSet = (event) => {
        setCode(event.target.value);
    }
    const codeUpdate = () => {
        axios.post("http://localhost:8080/auth/verify-otp", {
            phone: phone,
            code: code
        },{withCredentials:true}).then(resp => console.log(resp.data));
    }
    const test = () => {
        axios.get("http://localhost:8080/profile",{withCredentials:true})
            .then(res => setResponse(res.data));
    }
    return (
        <div>
            <input type="text" onChange={changePhone} placeholder={"input ur phone number"}/>
            <button onClick={add}>+</button>
            <input type="text" onChange={codeSet} placeholder={"code"}/>
            <button onClick={codeUpdate}>code</button>
            <button onClick={test}>profile</button>
            <p>{response}</p>
        </div>
    )
}