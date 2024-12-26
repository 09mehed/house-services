import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import useAuth from '../Components/Hook/useAuth';
import Swal from 'sweetalert2';
import axios from 'axios';

const UpdateService = () => {
    const service = useLoaderData()
    const { user } = useAuth()
    const navigate = useNavigate()
    console.log(service);
    const { _id, photoUrl, name, price, location, currency, description } = service

    const handleUpdateService = async (e) => {
        e.preventDefault()
        const form = e.target
        const photoUrl = form.photoUrl.value
        const name = form.name.value
        const email = form.email.value
        const providerName = form.providerName.value
        const providerImage = form.providerImage.value
        const price = form.price.value
        const currency = form.currency.value
        const location = form.location.value
        const description = form.description.value
        const updateData = { photoUrl, name, email, providerName, providerImage, price, location, currency, description }

        const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/all-service/${_id}`, updateData)
        if (data.modifiedCount > 0) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Updated Successfully",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/manageServices')
        }
        form.reset()
    }

    return (
        <div className='w-11/12 lg:w-6/12 mx-auto '>
            <h2 className='text-center text-2xl font-bold'>Update Service</h2>
            <form onSubmit={handleUpdateService} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">PhotoURL</span>
                    </label>
                    <input type="url" name='photoUrl' defaultValue={photoUrl} placeholder="PhotoURL" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Service Name</span>
                    </label>
                    <input type="text" name='name' defaultValue={name} placeholder="Service Name" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Service Email</span>
                    </label>
                    <input disabled defaultValue={user?.email} type="email" name='email' placeholder="Service email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Service Provider name</span>
                    </label>
                    <input disabled type="text" defaultValue={user?.displayName} name='providerName' placeholder="Service Provider name" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Service Provider Image</span>
                    </label>
                    <input disabled type="url" defaultValue={user?.photoURL} name='providerImage' placeholder="Service Provider Image" className="input input-bordered" required />
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input type="text" name='price' defaultValue={price} placeholder="price" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Currency</span>
                        </label>
                        <select name='currency' defaultValue={currency} className="select select-ghost w-full max-w-xs">
                            <option disabled>Currency</option>
                            <option>bdt</option>
                            <option>USD</option>
                        </select>
                    </div>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Location</span>
                    </label>
                    <input type="text" name='location' defaultValue={location} placeholder="Location" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <textarea type="text" name='description' defaultValue={description} className="textarea textarea-ghost" placeholder="Description" required></textarea>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Update services</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateService;