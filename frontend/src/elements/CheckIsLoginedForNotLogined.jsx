import {useEffect, useState} from "react";
import axios from "axios";

export default function CheckIsLoginedForNotLogined({children}){
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8080/profile/check", {withCredentials: true})
            .then(response => {
                if (response.data === true) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            })
            .catch(() => {
               setIsAuthenticated(false);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? window.location.href="/profile" : children;

}