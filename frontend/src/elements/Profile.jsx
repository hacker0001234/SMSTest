import {useParams} from "react-router-dom";

export default function Profile(){
    const {phone} = useParams();
    return(
        <p>{phone}</p>
    )
}