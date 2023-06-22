import React , {Children}from 'react';
import Headers from './Headers';
import Footer from './Footer';


const Layout = ({children}) => {
  return (
    <div>
      <Headers/>
      <main style={{height:"80vh"}}>{children}</main>
      
       <Footer/>
    </div>
  )
}

export default Layout