import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const UserLayout = () => {
    const [headerHeight, setHeaderHeight] = useState(0);

    useEffect(() => {
        const header = document.querySelector("header");
        if (header) {
            setHeaderHeight(header.offsetHeight);
        }

        const handleResize = () => {
            const header = document.querySelector("header");
            if (header) setHeaderHeight(header.offsetHeight);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <Header />
            <main
                className="min-h-screen bg-gray-50"
                style={{ paddingTop: headerHeight }}
            >
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default UserLayout;
