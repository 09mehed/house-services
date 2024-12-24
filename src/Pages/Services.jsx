import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Services = () => {
    const [services, setServices] = useState([]);
    const [search, setSearch] = useState('')

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/all-service?search=${search}`);
                setServices(data);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };
        fetchServices();
    }, [search]);

    

    return (
        <div className="w-11/12 mx-auto py-5">
            <Helmet>
                <title>Service Sharing | Service</title>
            </Helmet>
            <h2 className="text-center text-2xl font-bold mb-6">All Services</h2>
            <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search" className="input w-full py-3 my-3 text-center" />
            <div className="space-y-6">
                {services.map((service) => (
                    <div key={service._id} className=' border-2 p-2 rounded-lg'>
                        <div
                            className="bg-white border border-gray-300 rounded-lg shadow-md flex flex-col md:flex-row"
                        >
                            {/* Service Image */}
                            <img
                                src={service.photoUrl}
                                alt={service.name}
                                className="w-full md:w-1/4 h-full object-cover rounded-t-lg md:rounded-none md:rounded-l-lg"
                            />
                            <div className="p-4 flex flex-col flex-grow">
                                {/* Service Name */}
                                <h3 className="text-xl font-bold mb-2">{service.name}</h3>

                                {/* Service Description */}
                                <p className="text-sm text-gray-600 mb-4">
                                    {service.description.length > 100
                                        ? `${service.description.substring(0, 100)}...`
                                        : service.description}
                                </p>

                                {/* Provider Info */}
                                <div className="flex items-center space-x-3 mb-4">
                                    <img
                                        src={service.providerImage}
                                        alt={service.providerName}
                                        className="w-10 h-10 rounded-full object-cover border border-gray-300"
                                    />
                                    <span className="text-sm font-semibold">
                                        {service.providerName || 'Unknown Provider'}
                                    </span>
                                </div>

                                {/* Service Area & Price */}
                                <p className="text-sm text-gray-700 mb-2">
                                    <span className="font-bold">Area:</span> {service.location}
                                </p>
                                <p className="text-sm text-green-500 font-semibold">
                                    <span className="font-bold">Price:</span> {service.currency} {service.price}
                                </p>

                                {/* View Details Button */}
                                <div className='flex justify-end'>
                                    <Link to={`/serviceDetails/${service._id}`}>
                                        <button className="mt-auto bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                                            View Details
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;