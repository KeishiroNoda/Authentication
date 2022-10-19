import React from "react";
import { useNavigate, useParams } from "react-router";
import { AuthQuery } from "../api";
import SignIn from "./Signin"

const query = new AuthQuery();

//Main Component
const Top: React.FC = () => {

  return (
    <SignIn />
  );
};

export default Top;
