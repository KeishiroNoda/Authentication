import React from "react";
import { Routes as RouteList, Route, Navigate } from "react-router-dom";
import {
    Top,
    SignUp,
    SignIn,
    SignList 
} from "./views";

const Routes: React.FC = () => {

    return (
        <RouteList>
            <Route path="/" element={<Navigate replace to="/signin" />} />
            <Route path="/top" element={<Top />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signlist" element={<SignList />} />
            <Route element={<Navigate replace to="/not-found" />} />
        </RouteList>
    );
};

export default Routes;
