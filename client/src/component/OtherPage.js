import React from "react";
import { Link } from "react-router-dom";

const OtherPage = () => {
  return (
    <div>
      <h1>I am some other Page</h1>
      <Link to="/">Go to Home Page</Link>
    </div>
  );
};

export default OtherPage;
