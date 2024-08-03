

import ApiCalls from "@/Api/ApiCalls";
import {useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



const CheckToken = ()=>{
    const [loading, setLoading] = useState(true);
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
        finally {
            setLoading(false); // Set loading to false once the API call is done
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div>
            {loading ? (
                <p>Please wait...</p> // Display the "Please wait" message
            ) : (
                <p>Content has loaded</p> // This is just a placeholder, replace with your actual content
            )}
        </div>
    );

}

export default CheckToken 



