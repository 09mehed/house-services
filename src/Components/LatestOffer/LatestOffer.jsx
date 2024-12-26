import Lottie from 'lottie-react';
import React from 'react';
import latest from '../../assets/animatin/latest.json'

const LatestOffer = () => {
    return (
        <div className='w-11/12 mx-auto py-3'>
            <h2 className='text-center text-2xl font-bold'>Latest Service</h2>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row gap-3">
                    <div className='w-full lg:w-1/2'>
                        <Lottie animationData={latest}></Lottie>
                    </div>
                    <div className='w-full lg:w-1/2'>
                        <h1 className="text-5xl font-bold">Latest Offers Just for You!</h1>
                        <p className="py-6">
                            Our new service has launched!** We are committed to providing the highest quality service to our customers.
                            Learn about our new services now and find the solution you need.
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            <li>Fast and accurate service.</li>
                            <li>Solutions through expert teams.</li>
                            <li>Booking arrangements at your convenience.</li>
                            <li>Providing services using modern technology.</li>
                        </ul>
                        <p className="py-4 text-gray-700">
                            New services will give you better and easier solutions. Thanks for staying with us!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LatestOffer;