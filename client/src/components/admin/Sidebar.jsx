import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div style={styles.sidebar}>
      <h2 style={styles.logo}>Admin Panel</h2>

      <ul style={styles.menu}>
        <li><Link to="/admin/dashboard" style={styles.link}>Dashboard</Link></li>
        <li><Link to="/admin/product" style={styles.link}>Products</Link></li>
        <li><Link to="/admin/complaint" style={styles.link}>Complaints</Link></li>
        <li><Link to="/admin/user" style={styles.link}>Users</Link></li>
      </ul>
    </div>
  );
}

const styles = {
  
  sidebar: {
    width: "220px",
    height: "100vh",
    backgroundColor: "#222",
    color: "#fff",
    padding: "20px",
    position: "fixed",
    left: 0,
    top: 0
  },
  logo: {
    marginBottom: "30px",
    fontSize: "22px"
  },
  menu: {
    listStyle: "none",
    padding: 0,
    margin: 0
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    display: "block",
    padding: "10px 0",
    fontSize: "16px"
  }
  
};

export default Sidebar;
