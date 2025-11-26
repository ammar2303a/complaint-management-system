import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Nav() {
    const navigate = useNavigate()
     
    const logoutSubmit = ()=> {
        localStorage.removeItem("token");
        localStorage.removeItem("id")
        localStorage.removeItem("isAdmin")
        navigate("/login")
    }
    const token = localStorage.getItem("token")
 return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>ComplaintMS</h2>
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
            <Link onClick={logoutSubmit} style={styles.link}>Logout</Link>
            </>
        )}
        
        
      </div>
    </nav>
  );
}

const styles = {
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
