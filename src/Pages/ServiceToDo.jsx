import React, { useEffect, useState } from 'react';
import useAuth from '../Components/Hook/useAuth';
import { Helmet } from 'react-helmet';
import useAxiosSecure from '../Components/Hook/useAxiosSecure';

const ServiceToDo = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const [bookedServices, setBookServices] = useState([])
    useEffect(() => {
        if(user?.email){
            fetchBookedService()
        }
    }, [user])
    const fetchBookedService = async () => {
        try {
            const { data } = await axiosSecure.get(`/booked-request/${user?.email}`)
            setBookServices(data)
        } catch (err) {
            console.log(err.message);
        }
    }

    const handleStatusChange = async (id, prevStatus, serviceStatus) => {
        if(prevStatus === serviceStatus || prevStatus === 'Complete'){
            return console.log("Not Allow");
        }

        try{
            const {data} = await axiosSecure.patch(`/service-status-update/${id}`, {serviceStatus})
            console.log(data);
            fetchBookedService()
        }catch(err){
            console.log(err.message);
        }
    }

    return (
        <div className='w-11/12 mx-auto py-3'>
            <Helmet>
                <title>Service Sharing | Service to do</title>
            </Helmet>
            <h2 className='text-center font-bold text-2xl sm:text-xl'>Service To Do List</h2>
            <h1>Service List: {bookedServices.length}</h1>
            {bookedServices.length === 0 ? (
                <p className="text-center text-gray-500">No Service Found</p>
            ) : (
                <table className="table-auto min-w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-sm sm:text-base">Name</th>
                            <th className="border border-gray-300 px-4 py-2 text-sm sm:text-base hidden sm:table-cell">Email</th>
                            <th className="border border-gray-300 px-4 py-2 text-sm sm:text-base">Date</th>
                            <th className="border border-gray-300 px-4 py-2 text-sm sm:text-base">Price</th>
                            <th className="border border-gray-300 px-4 py-2 text-sm sm:text-base">Status</th>
                            <th className="border border-gray-300 px-4 py-2 text-sm sm:text-base">Action</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {bookedServices.map(service => (
                            <tr key={service._id}>
                                <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">{service.serviceName}</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base hidden sm:table-cell">{service.buyer}</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">{new Date(service.serviceTakingDate).toLocaleDateString()}</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">৳ {service.price}</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">{service.serviceStatus}</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base relative">
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