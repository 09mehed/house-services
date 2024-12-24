import React, { useEffect, useState } from 'react';
import useAuth from '../Components/Hook/useAuth';
import axios from 'axios';

const ServiceToDo = () => {

    const { user } = useAuth()
    const [bookedServices, setBookServices] = useState([])
    useEffect(() => {
        if(user?.email){
            fetchBookedService()
        }
    }, [user])
    const fetchBookedService = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/booked-request/${user?.email}`)
            setBookServices(data)
            console.log(data);
        } catch (err) {
            console.log(err.message);
        }
    }

    const handleStatusChange = async (id, prevStatus, serviceStatus) => {
        if(prevStatus === serviceStatus || prevStatus === 'Complete'){
            return console.log("Not Allow");
        }

        try{
            const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/service-status-update/${id}`, {serviceStatus})
            console.log(data);
            fetchBookedService()
        }catch(err){
            console.log(err.message);
        }
    }

    return (
        <div className='w-11/12 mx-auto py-3'>
            <h2 className='text-center font-bold text-2xl'>Service To Do List</h2>
            <h1>Service List: {bookedServices.length}</h1>
            {bookedServices.length === 0 ? (
                <p className="text-center text-gray-500">No Service Found</p>
            ) : (
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                            <th className="border border-gray-300 px-4 py-2">Email</th>
                            <th className="border border-gray-300 px-4 py-2">Date</th>
                            <th className="border border-gray-300 px-4 py-2">Price</th>
                            <th className="border border-gray-300 px-4 py-2">Status</th>
                            <th className="border border-gray-300 px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {bookedServices.map(service => (
                            <tr key={service._id}>
                                <td className="border border-gray-300 px-4 py-2">{service.serviceName}</td>
                                <td className="border border-gray-300 px-4 py-2">{service.buyer}</td>
                                <td className="border border-gray-300 px-4 py-2">{new Date(service.serviceTakingDate).toLocaleDateString()}</td>
                                <td className="border border-gray-300 px-4 py-2">৳ {service.price}</td>
                                <td className="border border-gray-300 px-4 py-2">{service.serviceStatus}</td>
                                <td className="border border-gray-300 px-4 py-2 relative">
                                    <div className="dropdown ">
                                        <label
                                            tabIndex={0}
                                            className="btn btn-ghost btn-sm bg-green-500 text-black"
                                        >
                                            {service.serviceStatus}
                                        </label>
                                        <ul
                                            tabIndex={0}
                                            className="dropdown-content menu p-2 shadow bg-green-500 rounded-box absolute top-0 transform translate-y-10 z-50"
                                        >
                                            <li>
                                                <button
                                                    onClick={() =>
                                                        handleStatusChange(service._id, service.serviceStatus, 'Working')
                                                    }
                                                >
                                                    Working
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    onClick={() =>
                                                        handleStatusChange(service._id, service.serviceStatus, 'Completed')
                                                    }
                                                >
                                                    Completed
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ServiceToDo;