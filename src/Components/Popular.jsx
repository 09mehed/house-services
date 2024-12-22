import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PopularCard from '../Pages/PopularCard';

const Popular = () => {
    const [service, setService] = useState([])

    useEffect(() => {
        fetchAllService()
    }, [])

    const fetchAllService = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/all-service`)
        setService(data)
    }

    return (
        <div className='w-11/12 mx-auto py-5'>
            <h2 className='text-center font-bold text-2xl'>Popular Service</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                {
                    service.slice(0, 6).map(services => <PopularCard key={services._id} services={services}></PopularCard>)
                }
            </div>
            <div className='flex justify-end'>
                <button
                    className="mt-6 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Show All
                </button>
            </div>
        </div>
    );
};

export default Popular;