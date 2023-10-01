import { redirect } from "next/navigation";
import React from "react";
import UserAuth from "./UserAuth";

interface ProtectedProps{
    children: React.ReactDOM
}

export default function Protected({children}: ProtectedProps){
    const  isAuthenticated = UserAuth();

    return isAuthenticated ? children : redirect("/")
}