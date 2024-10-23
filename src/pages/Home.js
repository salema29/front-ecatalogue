import React from 'react';
import '../assets/styles/Home.css'
import Banner from '../components/Banner'
import Carousel from '../components/Carousel';
import Confidentiality from '../components/Confidentiality';

function Home() {
    return (
        <>
            <Banner />
            <Carousel/>
            <div className='container'>
                <Confidentiality/>
            </div>
        </>
    );
};

export default Home;