import axios from "axios";
import { useNavigate } from "react-router-dom";



const LoginHandler = (props)=>{
    const { Email, Phone } = props;
    console.log(Email , Phone)
    axios.post(`http://localhost:8080/login`,{ Email, Phone })
    .then(res => {
      console.log(res);
      console.log(res.data.token);
      localStorage.removeItem('token_splitwise');
      localStorage.removeItem('user_id');
      localStorage.setItem('token_splitwise',res.data.token);
      localStorage.setItem('user_id',res.data.User_Id);
    })
     
}

const SignUpHandler = (props)=>{
  const {Username,  Email, Phone } = props;
  console.log(Username ,Email , Phone)
  axios.post(`http://localhost:8080/register`,{Username, Email, Phone })
  .then(res => {
    console.log(res);
    console.log(res.data);
  })
  
}

const GetAllUserHandler = ()=>{
  const navigate= useNavigate();
  const token = localStorage.getItem('token_splitwise');
  // Set up headers with the token
  const headers = {
    token: JSON.parse(token)
  };
   
  axios.get(`http://localhost:8080/getAllUser`,{headers})
  .then(res => {
    console.log(res);
    console.log(res.data);
  }) .catch(error => {
    console.log(error)
    localStorage.removeItem('token_splitwise');
    navigate("/login");
  });
  
}

const GetUserGroupsHandler = async ()=>{
  const token = localStorage.getItem('token_splitwise');
  // Set up headers with the token
  console.log(token)
  const headers = {
    token: token
  };
  const id = localStorage.getItem("user_id");
 
  console.log(id)
  
  const response = await axios.post(`http://localhost:8080/getUserGroups`,{Id: JSON.parse(id) },{headers})
  
  return response.data
}


const GetGroupHandler = async (id)=>{
  const token = localStorage.getItem('token_splitwise');
  // Set up headers with the token
  console.log(token)
  const headers = {
    token: token
  };
  const response = await axios.post(`http://localhost:8080/getGroup`,{Id: JSON.parse(id)},{headers})
  return response.data
}

export default {LoginHandler , SignUpHandler, GetAllUserHandler, GetUserGroupsHandler, GetGroupHandler};