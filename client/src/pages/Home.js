import React, { useState } from 'react'
import Layout from '../components/layout/Layout';
import {useAuth}from '../context/auth.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {

const navigate = useNavigate();
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [auth,setAuth] = useAuth();

const handleSubmit = async (e)=>{
  //e.preventDefault();
 
  try {
    const res = await axios.post("http://localhost:3000/api/v1/auth/login", {
      email,
      password
    });
    if (res && res.data.success) {
      
      setAuth({
        ...auth,
        user:res.data.user,
        token:res.data.token
      });
      localStorage.setItem('auth',JSON.stringify(res.data));
      navigate('/dashboard')
    } else {
     
   
    }
  } catch (error) {
    console.log(error);
    
  }



}



  return (
    <Layout>
      <div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control"  id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
             
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
           
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
      </div>
    </Layout>
  )
}

export default Home
