import axios from "axios";


const LoginHandler = async (props)=>{
    const { Email, Phone } = props;
    console.log(Email , Phone)
    await axios.post(`http://localhost:8080/login`,{ Email, Phone })
    .then(res => {
      console.log(res);
      console.log(res.data.token);
      localStorage.removeItem('token_splitwise');
      localStorage.removeItem('user_id');
      localStorage.setItem('token_splitwise',res.data.token);
      localStorage.setItem('user_id',res.data.User_Id);
    })
     
}

const SignUpHandler = async (props)=>{
  const {Username,  Email, Phone } = props;
  console.log(Username ,Email , Phone)
  await axios.post(`http://localhost:8080/register`,{Username, Email, Phone })
  .then(res => {
    console.log(res);
    console.log(res.data);
  })
  
}

const GetAllUserHandler = async ()=>{
  const token = localStorage.getItem('token_splitwise');
  // Set up headers with the token
  const headers = {
    token: token
  };
  const response = await axios.get(`http://localhost:8080/getAllUser`,{headers})
  return response.data==null ? [] : response.data
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
 
  return response.data==null ? [] : response.data
}


const GetGroupHandler = async (id)=>{
  const token = localStorage.getItem('token_splitwise');
  // Set up headers with the token
  console.log(token)
  const headers = {
    token: token
  };
  const response = await axios.post(`http://localhost:8080/getGroup`,{Id: JSON.parse(id)},{headers})
  return response.data==null ? [] : response.data
}

const AddExpenseHandler = async (data)=>{
  const token = localStorage.getItem('token_splitwise');
  // Set up headers with the token
  console.log(token)
  const headers = {
    token: token
  };
  const response = await axios.post(`http://localhost:8080/addExpense`,data,{headers})
  return response.data==null ? [] : response.data
}

const CreateGroupHandler = async (data)=>{
  const token = localStorage.getItem('token_splitwise');
  // Set up headers with the token
  console.log(token)
  const headers = {
    token: token
  };
  const response = await axios.post(`http://localhost:8080/createGroup`,data,{headers})
  return response.data==null ? [] : response.data
}

const DeleteGroupHandler = async (data)=>{
  const token = localStorage.getItem('token_splitwise');
  // Set up headers with the token
  console.log(token)
  const headers = {
    token: token
  };
  const response = await axios.post(`http://localhost:8080/deleteGroup`,data,{headers})
  return response.data==null ? [] : response.data
}

const DeleteExpenseHandler = async (data)=>{
  const token = localStorage.getItem('token_splitwise');
  // Set up headers with the token
  console.log(token)
  const headers = {
    token: token
  };
  const response = await axios.post(`http://localhost:8080/deleteExpense`,data,{headers})
  return response.data==null ? [] : response.data
}



export default {LoginHandler ,DeleteExpenseHandler, SignUpHandler, GetAllUserHandler, GetUserGroupsHandler,CreateGroupHandler, GetGroupHandler, AddExpenseHandler, DeleteGroupHandler};