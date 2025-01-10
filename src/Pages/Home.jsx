import React from 'react';
import Banner from './Banner';
import Popular from '../Components/Popular';
import About from '../Components/About/About';
import LatestOffer from '../Components/LatestOffer/LatestOffer';
import Contact from '../Components/Contact/Contact';

const Home = () => {
    return (
        <div className='w-11/12 mx-auto py-3'>
            <Banner></Banner>
            <Popular></Popular>
            <LatestOffer></LatestOffer>
            <About></About>
            <Contact></Contact>
        </div>
    );
};

export default Home;