import React, { useEffect } from "react";
import '../assets/styles/Home.css'
import Banner from '../components/Banner'
import Carousel from '../components/Carousel';
import handleOrientationChange from "../components/functions/Orientation";
import showAllElements from "../components/functions/ShowAllElements";

function Home() {
    useEffect(() => {
        handleOrientationChange();

        window.addEventListener("resize", handleOrientationChange);
        window.addEventListener("orientationchange", handleOrientationChange);

        return () => {
            window.removeEventListener("resize", handleOrientationChange);
            window.removeEventListener("orientationchange", handleOrientationChange);
        };
    }, []);

    showAllElements();

    return (
        <>
            <Banner/>
            <Carousel/>
        </>
    );
};
export default Home;