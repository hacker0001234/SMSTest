import {Alert, Button, Slide, TextField} from "@mui/material";
import '../Code.css'
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

export default function CodeChecking(){
    const {phone} = useParams();
    const [open, setOpen] = useState(true);
    const [openError, setOpenError] = useState(false);
    const [code,setCode] = useState("");
    const [isCorrect,setIsCorrect] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const errorCode = ()=>{
        const timer = setTimeout(() => {
            setOpenError(false);
        }, 2000);

        return () => clearTimeout(timer);
    }
    const changeCode = (event) =>{
        setCode(event.target.value.toString());
    }
    useEffect(() => {
            if (code.length === 6){
            setIsCorrect(true);
            }else{
                setIsCorrect(false);
            }
        }, [code]);

    const sendCode = (event) =>{
        axios.post("http://localhost:8080/auth/verify-otp",{phone: phone, code: code}, {withCredentials:true})
            .then(resp =>{
               window.location.href="/profile"
            })
            .catch(err =>{
                setOpenError(true)
            errorCode()});
    }
    return(
        <div className={"codeDiv"}>

            <TextField
                variant={"standard"}
                id="outlined-number"
                label="CODE"
                type="number"
                onChange={changeCode}
            />
            <button style={isCorrect ?{} : {color : "gray"}} className={"sendCodeButton"} disabled={!isCorrect} onClick={sendCode}>
                <div className="svg-wrapper-1">
                    <div className="svg-wrapper">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                        >
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path
                                fill="currentColor"
                                d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                            ></path>
                        </svg>
                    </div>
                </div>
                <span>Send</span>
            </button>
            <Slide direction="left" in={open} mountOnEnter unmountOnExit>
                <div style={{
                    position: 'fixed',
                    top: '670px',
                    left: '1135px',
                    zIndex: 1300
                }}>
                    <Alert variant="filled" severity="success">
                        we sent a code to {phone}!
                    </Alert>
                </div>
            </Slide>
            <Slide direction="left" in={openError} mountOnEnter unmountOnExit>
                <div style={{
                    position: 'fixed',
                    top: '670px',
                    left: '1150px',
                    zIndex: 1300
                }}>
                    <Alert variant="filled" severity="error">
                        not correct code
                    </Alert>
                </div>
            </Slide>

        </div>
    )
}