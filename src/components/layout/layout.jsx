import React from "react";
import Header from "./header/header";
// import Footer from "./footer/footer";

const Layout = ({ children, currentUser, session }) => {
  return (
    <div>
      <Header />
      {children}
      {/* <Footer/> */}
    </div>
  );
};

export default Layout;
