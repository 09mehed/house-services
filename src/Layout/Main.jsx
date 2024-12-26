import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer/Footer';
import About from '../Components/About/About';
import LatestOffer from '../Components/LatestOffer/LatestOffer';

const Main = () => {
    return (

        <div className="flex flex-col min-h-screen">
            <Navbar></Navbar>
            <main className="flex-grow">
                <Outlet></Outlet>
            </main>
            <Footer></Footer>
        </div>

    );
};

export default Main;