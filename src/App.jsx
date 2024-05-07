import Login from "./Pages/Login"
import './App.css'
import SignUp from "./Pages/SignUp"
import Home from "./Pages/Home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import CheckToken from "./Pages/Loading"
import GroupHandler from "./Pages/Group"
import ExpenseHandler from "./Pages/Expense"
function App() {

  return (
  
    <Router>
      <Routes>
        <Route index="/" element={<CheckToken />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/group/:id" element={<GroupHandler/>} />
        <Route path="/expense/:id" element={<ExpenseHandler/>} />
      </Routes>
    </Router>
     

  )
}

export default App
