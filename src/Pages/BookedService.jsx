import React, { useEffect, useState } from 'react';
import useAuth from '../Components/Hook/useAuth';
import { Helmet } from 'react-helmet';
import useAxiosSecure from '../Components/Hook/useAxiosSecure';


const BookedService = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [bookedServices, setBookServices] = useState([])
    useEffect(() => {
        fetchBookedService()
    }, [user])
    const fetchBookedService = async () => {
        try {
            const { data } = await axiosSecure.get(`/book-service/${user?.email}`)
            setBookServices(data)
        } catch (err) {
            console.log(err.message);
        }
    }
    return (
        <div className='w-11/12 mx-auto py-3'>
            <Helmet>
            <title>Service Sharing | BookedService</title>
            </Helmet>
            <h2 className='text-center text-2xl font-bold pb-5'>Booked Service</h2>
            <h1>Booked Service: {bookedServices.length}</h1>
            {bookedServices.length === 0 ? (
                <p className="text-center text-gray-500">No booked services found.</p>
            ) : (
                <table className="table-auto w-full border-collapse border border-gray-400 mt-4">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">#</th>
                            <th className="border px-4 py-2">Service Name</th>
                            <th className="border px-4 py-2">Date</th>
                            <th className="border px-4 py-2">Price</th>
                            <th className="border border-gray-300 px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookedServices.map((service, index) => (
                            <tr key={service._id} className="text-center">
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td className="border px-4 py-2">{service.serviceName}</td>
                                <td className="border px-4 py-2">
                                    {service.serviceTakingDate
                                        ? new Date(service.serviceTakingDate).toLocaleDateString()
                                        : 'No Date Provided'}
                                </td>
                                <td className="border px-4 py-2">{service.price}</td>
                                <td className="border border-gray-300 px-4 py-2">{service.serviceStatus}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default BookedService;