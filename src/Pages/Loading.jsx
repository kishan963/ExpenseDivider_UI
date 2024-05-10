

import ApiCalls from "@/Api/ApiCalls";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";



const CheckToken = ()=>{
    const navigate= useNavigate();
    // React.useEffect(() => {
    //     const retrievedData = localStorage.getItem('token_splitwise');
    //     if (retrievedData != null) {
    //         navigate("/home");
    //     } else {
    //         navigate("/login");
    //     }
    // }, [navigate]);


    const fetchData = async () => {
        try { 
             await ApiCalls.GetUserGroupsHandler();
             navigate("/home")
        } catch (err) {
            navigate("/login")
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

}

export default CheckToken 



