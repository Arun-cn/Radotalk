import React from 'react'
import { useNavigate } from 'react-router-dom'
const Headers = () => {
  const navigate = useNavigate()
  const handileClick = (e)=>{
    e.preventDefault();
    navigate('/register');
  }
  return (
    <div>

<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Radotalk</a>
    <button className="btn" onClick={handileClick}>Register
      
    </button>
    
  </div>
</nav>
    </div>
  )
}

export default Headers