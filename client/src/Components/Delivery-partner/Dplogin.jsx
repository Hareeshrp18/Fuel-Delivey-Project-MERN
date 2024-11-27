import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {axios} from "../../axios"
import './Dplogincss.css'; 


const Dplogin = () => {
    const [dpname, setDpname]=useState('')
    const [mobileno, setMobileno]=useState('')
    const navigate=useNavigate()
    const handleSubmit= async (e) =>{
        e.preventDefault();
        const res = await axios.post('/dplogin',{dpname, mobileno})
        if(res.data.length == 0){
            alert("Invalid username or password")
        }else{
            alert("login Successfully")
            navigate("/dpdashboard")
        }     
    }
  
    return (
        <div className="container">
        <div className="login-page">
            <h1>Delivery Partner Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="dpname">Username</label>
                <input
                    type="text" id="dpname" name="dpname"  onChange={(v) => setDpname(v.target.value)}
                    required/>
                
                <label htmlFor="mobileno">Mobile No</label>
                <input 
                    type="number" id="mobileno" name="mobileno"  onChange={(v) => setMobileno(v.target.value)}
                    required/>
                
                <input type="submit" value="Login"/>
                <p>
                Don't have an account? <Link to="/dpsignup">Sign up</Link>
                </p>
            </form>
           
        </div>
        </div>
    );
};

export default Dplogin;
