import React,{useState} from "react";
import {useAuth} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";

export default function LoginPage(){

const {login}=useAuth()
const navigate=useNavigate()

const [username,setUsername]=useState("")
const [password,setPassword]=useState("")
const [error,setError]=useState("")

function handleSubmit(e){
e.preventDefault()

if(login(username,password)){
navigate("/list")
}else{
setError("Invalid credentials")
}
}

return(

<div className="flex items-center justify-center h-screen bg-gray-200">

<form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-80">

<h2 className="text-2xl font-bold mb-4 text-center">
Employee Dashboard
</h2>

<input
className="border p-2 w-full mb-3"
placeholder="Username"
autoComplete="username"
value={username}
onChange={e=>setUsername(e.target.value)}
/>

<input
type="password"
className="border p-2 w-full mb-3"
placeholder="Password"
autoComplete="current-password"
value={password}
onChange={e=>setPassword(e.target.value)}
/>

<button className="bg-blue-500 text-white p-2 w-full">
Login
</button>

{error && <p className="text-red-500">{error}</p>}

</form>
</div>
)
}