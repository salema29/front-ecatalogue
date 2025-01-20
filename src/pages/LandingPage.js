import React, { useEffect, useState } from "react";
import '../assets/styles/Home.css'
import Banner from '../components/Banner'
import Carousel from '../components/Carousel';
import handleOrientationChange from "../components/functions/Orientation";

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

    return (
        <>
            <Banner/>
            <Carousel/>
        </>
    );
};
export default Home;