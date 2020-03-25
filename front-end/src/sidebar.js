import React from "react";
import { push as Menu } from "react-burger-menu";
import "./header.css";

export default props => {
  return (

    <Menu noOverlay>
      <a className="menu-item" href="/">Home</a>

      <a className="menu-item" href="/create-future">Create Future </a>

      <a className="menu-item" href="/dashboard">Dashboard </a>

      <a className="menu-item" href="/about">About </a>
    </Menu>


  );
};