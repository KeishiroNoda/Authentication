import React from "react";
import { Routes as RouteList, Route, Navigate } from "react-router-dom";
import {
    SignUp,
    SignInCase1,
    SignInCase2,
    SignInCase3,
    SignList 
} from "./views";

const Routes: React.FC = () => {

    return (
        <RouteList>
            <Route path="/" element={<Navigate replace to="/signin_case1" />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin_case1" element={<SignInCase1 />} />
            <Route path="/signin_case2" element={<SignInCase2 />} />
            <Route path="/signin_case3" element={<SignInCase3 />} />
            <Route path="/signlist" element={<SignList />} />
            <Route element={<Navigate replace to="/not-found" />} />
        </RouteList>
    );
};

export default Routes;
