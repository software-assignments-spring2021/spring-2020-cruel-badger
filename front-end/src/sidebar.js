import React from "react";
import { push as Menu } from "react-burger-menu";

export default props => {
  return (

    <Menu noOverlay>
      <a className="menu-item" href="/">Home</a>

      <a className="menu-item" href="/createFuture">Create Future </a>

      <a className="menu-item" href="/about"> About </a>
    </Menu>


  );
};