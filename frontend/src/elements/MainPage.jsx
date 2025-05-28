import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from 'js-cookie';


export default function MainPage() {
    const [phone, setPhone] = useState("");
    const [code, setCode] = useState("");
    const [response, setResponse] = useState("");

    const changePhone = (event) => {
        setPhone(event.target.value);
    }
    const add = () => {
        axios.post("http://localhost:8080/auth/request-otp", {phone: phone});
    }

    const codeSet = (event) => {
        setCode(event.target.value);
    }
    const codeUpdate = () => {
        axios.post("http://localhost:8080/auth/verify-otp", {
            phone: phone,
            code: code
        }).then(resp => Cookies.set('token', resp.data));
    }
    const test = () => {
        axios.get("http://localhost:8080/profile",
            {headers: {Authorization: `Bearer ${Cookies.get("token")}`}})
            .then(res => setResponse(res.data));
    }
    return (
        <div>
            <input type="text" onChange={changePhone} placeholder={"input ur phone number"}/>
            <button onClick={add}>+</button>
            <input type="text" onChange={codeSet} placeholder={"code"}/>
            <button onClick={codeUpdate}>code</button>
            <button onClick={test}>test</button>
            <p>{response}</p>
        </div>
    )
}