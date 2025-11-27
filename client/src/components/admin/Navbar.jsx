import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
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
  return (
    <nav style={styles.nav}>
      <h3 style={styles.title}>Admin Dashboard</h3>

         {loading ? (
  <div style={styles.spinner}></div>   // ye spinner dikhega
) : (
  <button onClick={logoutSubmit} style={styles.logoutBtn}>Logout</button>
)}
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
  spinner: {
  border: "4px solid #f3f3f3",
  borderTop: "4px solid #fff",
  borderRadius: "50%",
  width: "18px",
  height: "18px",
  animation: "spin 1s linear infinite"
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
