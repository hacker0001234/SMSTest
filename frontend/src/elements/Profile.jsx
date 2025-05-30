import {useEffect, useState} from "react";
import axios from "axios";

export default function Profile(){
    const [profile,setProfile] = useState("");
    useEffect(() => {
        axios.get("http://localhost:8080/profile",{withCredentials:true})
            .then(res => setProfile(res.data));
    }, []);
    return(
        <p>{profile}</p>
    )
}