import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ServiceDetails = () => {
    const { id } = useParams()
    const [service, setService] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        fetchAllService()
    }, [id])

    const fetchAllService = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/service/${id}`)
            setService(data)
        } catch (err) {
            console.log(err.message);
        }
    }

    if (!service) {
        return <p>Loading...</p>;
    }

    const { photoUrl, name, price, currency, description, providerName, providerImage, location } = service

    return (
        <div className="w-11/12 mx-auto py-5">
            <h2 className="text-center text-2xl font-bold mb-6">{service.name}</h2>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Service Image */}
                <img
                    src={service.photoUrl}
                    alt={service.name}
                    className="w-full md:w-1/3 h-auto object-cover rounded-lg"
                />

                <div>
                    <h3 className="text-lg font-bold mb-2">Service Provider Information</h3>
                    <div className="flex items-center gap-4 mb-4">
                        <img
                            src={service.providerImage}
                            alt={service.providerName}
                            className="w-12 h-12 rounded-full"
                        />
                        <div>
                            <p className="text-sm font-semibold">{service.providerName}</p>
                            <p className="text-xs text-gray-500">{service.location}</p>
                        </div>
                    </div>

                    <h3 className="text-lg font-bold mb-2">Service Details</h3>
                    <p className="text-gray-700 mb-4">{service.description}</p>
                    <p className="text-green-500 font-bold">
                        Price: {service.price} {service.currency}
                    </p>

                    <button
                        onClick={() => navigate(`/bookDetails/${id}`)}
                        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetails;