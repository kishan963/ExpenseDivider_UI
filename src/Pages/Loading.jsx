

import React from "react";
import { useNavigate } from "react-router-dom";



const CheckToken = ()=>{
    const navigate= useNavigate();
    React.useEffect(() => {
        const retrievedData = localStorage.getItem('token_splitwise');
        if (retrievedData != null) {
            navigate("/home");
        } else {
            navigate("/login");
        }
    }, [navigate]);

    return null;

}

export default CheckToken 



