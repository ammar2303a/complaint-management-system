import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Nav() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);

     
    const logoutSubmit = () => {
      setLoading(true);
  setTimeout(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("isAdmin");
    setLoading(false); 
    navigate("/login");
  }, 1500); // 1 second delay
};

    const token = localStorage.getItem("token")
 return (
    <nav style={styles.nav}>
      {/* <img src="image/ChatGPT Image Nov 27, 2025, 12_44_09 PM.png" style={styles.img} alt="" /> */}
      <h2 style={styles.logo}>Complaints<span style={{color: "grey"}}>MS</span></h2>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        {/* <Link to="/complaints" style={styles.link}>Complaints</Link> */}
        {!token ? (
            <>
            <Link to="/login" style={styles.link}>Login</Link>
        <Link to="/register" style={styles.link}>Register</Link>
        </>
        ):(
          <>
          <Link to="/check" style={styles.link}>MyComplaint</Link>
       {loading ? (
  <div style={styles.spinner}></div>   // ye spinner dikhega
) : (
  <button onClick={logoutSubmit} style={styles.linkBtn}>Logout</button>
)}



            </>
        )}
        
        
      </div>
    </nav>
  );
}


const styles = {
  linkBtn: {
  color: "#fff",
  background: "transparent",
  border: "none",
  fontWeight: "bold",
  cursor: "pointer"
},
// img:{
//   backgroundSize: "cover",
//   height: "50px",
//   width: "100px"
// },
spinner: {
  border: "4px solid #f3f3f3",
  borderTop: "4px solid #fff",
  borderRadius: "50%",
  width: "18px",
  height: "18px",
  animation: "spin 1s linear infinite"
},
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#333",
    color: "#fff"
  },
  logo: {
    margin: 0
  },
  links: {
    display: "flex",
    gap: "15px"
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold"
  }
}

export default Nav
