import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect } from "react";

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {


    return (
        <div className="d-flex flex-column min-vh-100">
        <ScrollToTop>
            <Navbar />
            <div className="flex-grow-1 bg-dark">
                <Outlet />
                 </div>
            <Footer />
           
        </ScrollToTop>
        </div>
    )
}