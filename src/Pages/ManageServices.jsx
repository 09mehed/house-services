import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const ManageServices = () => {
    const [services, setServices] = useState([])

    useEffect(() => {
        fetchAllData()
    }, [])

    const fetchAllData = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/all-service`)
            setServices(data)
        } catch (err) {
            console.log(err.message);
        }
    }

    const handleDelete = _id => {
        Swal.fire({
            title: "Are you sure?",
            text: "Are you sure you want to Delete?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/all-service/${_id}`)
                if (data) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your service has been deleted.",
                        icon: "success"
                    });
                    const remaining = services.filter(service => service._id !== _id)
                    setServices(remaining)
                }
            }
        });
    }

    return (
        <div className="w-11/12 mx-auto py-5">
            <Helmet>
                <title>Service Sharing | ManageService</title>
            </Helmet>
            <h2 className="text-center text-2xl font-bold mb-6">Manage All Services</h2>
            <div className="space-y-6">
                {services.map((service) => (
                    <div key={service._id} className="border-2 p-2 rounded-lg flex justify-between items-center">
                        <div className="flex flex-col md:flex-row items-center">
                            {/* Service Image */}
                            <img
                                src={service.photoUrl}
                                alt={service.name}
                                className="w-32 h-32 object-cover rounded-md"
                            />
                            <div className="ml-4">
                                {/* Service Name */}
                                <h3 className="text-xl font-bold">{service.name}</h3>

                                {/* Service Description */}
                                <p className="text-sm text-gray-600 mb-2">
                                    {service.description.length > 100
                                        ? `${service.description.substring(0, 100)}...`
                                        : service.description}
                                </p>

                                {/* Service Area & Price */}
                                <p className="text-sm text-gray-700">
                                    <span className="font-bold">Area:</span> {service.location}
                                </p>
                                <p className="text-sm text-green-500 font-semibold">
                                    <span className="font-bold">Price:</span> {service.currency} {service.price}
                                </p>
                            </div>
                        </div>
                        <div className='gap-5 flex justify-between items-center'>
                            <div>
                                <Link to={`/updateService/${service._id}`}>
                                    <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>Edit</button>
                                </Link>
                            </div>
                            <div>
                                <button onClick={() => handleDelete(service._id)} className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'>Delete</button>
                            </div>
                        </div>
                    </div>

                ))}

            </div>

        </div>
    );
};

export default ManageServices;