import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Services = () => {
    const [services, setServices] = useState([]);
    const [searchQuery, setSearchQuery] = useState({
        search: ""
    });
    const [sortPrice, setSortPrice] = useState('')

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/all-service`);
                setServices(data);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };
        fetchServices();
    }, []);

    const handleChange = e => {
        const { name, value } = e.target
        setSearchQuery({
            ...searchQuery,
            [name]: value
        })
    }

    const handleSort = (price) => {
        setSortPrice(price);
    };

    // Filtered and Sorted Services
    const filteredServices = services
        .filter((service) =>
            service.name.toLowerCase().includes(searchQuery.search.toLowerCase())
        )
        .sort((a, b) => {
            if (sortPrice === 'asc') {
                return a.price - b.price; 
            } else if (sortPrice === 'desc') {
                return b.price - a.price; 
            }
            return 0;
        });



    return (
        <div className="w-11/12 mx-auto py-5">
            <Helmet>
                <title>Service Sharing | Service</title>
            </Helmet>
            <h2 className="text-center text-2xl font-bold mb-6">All Services</h2>

            <div className='lg:flex justify-between items-center gap-5 my-3'>
                <div className='flex-1'>
                    <input type="search" value={searchQuery.search}
                        onChange={handleChange} name="search" id="" placeholder='search movie' className="w-full text-xl p-2 border rounded-md text-center" />
                </div>

                <div className='flex-1'>
                    <details className="dropdown w-full">
                        <summary className="btn m-1 w-full text-center">Sort By Price</summary>
                        <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] p-2 shadow w-full">
                            <li className='text-center'><button onClick={() => handleSort("asc")}>Ascending</button></li>
                            <li className='text-center'><button onClick={() => handleSort("desc")}>Descending</button></li>
                        </ul>
                    </details>
                </div>
            </div>
            <div className="space-y-6">
                {filteredServices.map((service) => (
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