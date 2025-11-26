import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
   const logoutSubmit = ()=> {
        localStorage.removeItem("token");
        localStorage.removeItem("id")
        localStorage.removeItem("isAdmin")
        navigate("/login")
    }
  return (
    <nav style={styles.nav}>
      <h3 style={styles.title}>Admin Dashboard</h3>

      <button onClick={logoutSubmit} style={styles.logoutBtn}>
        Logout
      </button>
    </nav>
  );
}

const styles = {
  nav: {
    height: "60px",
    background: "#444",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
    marginLeft: "220px", // because sidebar is fixed
  },
  title: {
    margin: 0
  },
  logoutBtn: {
    background: "red",
    border: "none",
    padding: "8px 16px",
    color: "#fff",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default Navbar;
