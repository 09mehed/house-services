import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../Components/Hook/useAuth';
import axios from 'axios';
import Swal from 'sweetalert2';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from 'react-helmet';

const BookDetails = () => {
    const { id } = useParams()
    const { user } = useAuth()
    const [service, setService] = useState(null)
    const [startDate, setStartDate] = useState(new Date())
    // const [formData, setFormData] = useState({ serviceTakingDate: '', specialInstruction: '' })
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(null)

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const bookingData = {
            serviceId: id,
            serviceName: service?.name,
            serviceImage: service?.photoUrl,
            email: user?.email,
            providerName: service?.providerName,
            buyer: service?.email,
            userName: user?.displayName,
            serviceTakingDate: startDate,
            price: service?.price,
            serviceStatus: 'pending',
        }; 

        if (user?.buyer === service?.email) {
            Swal.fire({
                icon: 'error',
                title: 'Not Allowed',
                text: 'You cannot book your own service!',
            });
            return;
        }

        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/book-service`, bookingData)
            if (data.insertedId) {
                Swal.fire({
                    title: "Success!",
                    text: "Service booked successfully!",
                    icon: "success",
                });
                setIsModalOpen(false);
                navigate('/booked-service');
            }
        } catch (err) {
            console.log(err.message);
            Swal.fire({
                title: "error",
                text: "You have already booked!",
                icon: "error",
            });
        }
    }

    if (!service) {
        return <p>Loading...</p>;
    }

    const handleBookNow = () => {
        setIsModalOpen(true);
    };


    return (
        <div className="w-11/12 mx-auto py-6">
            <Helmet>
                <title>Service Sharing | BookDetails</title>
            </Helmet>
            <div className='text-center'>
                <h2 className="text-2xl font-bold mb-4">{service.name}</h2>
                <div className='flex justify-center'>
                    <img src={service.photoUrl} alt={service.photoUrl} className="rounded-lg mb-4 w-full h-96" />
                </div>
                <p>{service.description}</p>
                <button
                    onClick={handleBookNow}
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
                >
                    Book Now
                </button>
            </div>

            {/* modal */}

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h3 className="text-lg font-bold mb-4">Book Service</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label>Service Name</label>
                                <input
                                    type="text"
                                    value={service.name}
                                    disabled
                                    className="block w-full border rounded px-3 py-2"
                                />
                            </div>
                            <div>
                                <label>Price</label>
                                <input
                                    type="text"
                                    value={service.price}
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                            <div>
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={service.email}
                                    defaultValue={user?.email}
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                            <div>
                                <label>Service Taking Date</label>
                                <DatePicker
                                    selected={startDate}
                                    onChange={date => setStartDate(date)}
                                    className="block w-full border rounded px-3 py-2" required>
                                </DatePicker>
                            </div>
                            <div>
                                <label>Special Instructions</label>
                                <textarea
                                    // value={formData.specialInstruction}
                                    // onChange={(e) => setFormData({ ...formData, specialInstruction: e.target.value })}
                                    className="block w-full border rounded px-3 py-2"
                                ></textarea>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                >
                                    Purchase
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookDetails;