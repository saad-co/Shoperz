import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div>
            <Header />
            <main><Outlet /></main>
            <Footer />
        </div>
    );
}