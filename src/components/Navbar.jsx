import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ background: "#333", padding: "10px", color: "white" }}>
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          justifyContent: "space-around",
          margin: 0,
          padding: 0,
        }}
      >
        <li>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/menu" style={{ color: "white", textDecoration: "none" }}>
            Menu
          </Link>
        </li>
        <li>
          <Link to="/cart" style={{ color: "white", textDecoration: "none" }}>
            Cart
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
