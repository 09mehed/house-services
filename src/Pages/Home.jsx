import React from 'react';
import Banner from './Banner';
import Popular from '../Components/Popular';

const Home = () => {
    return (
        <div className='w-11/12 mx-auto py-3'>
            <Banner></Banner>
            <Popular></Popular>
        </div>
    );
};

export default Home;