import axios from 'axios';
import React from 'react';
import useAuth from '../Components/Hook/useAuth';
import { Helmet } from 'react-helmet';

const AddService = () => {
    const { user } = useAuth()
    

    const handleAddAService = async (e) => {
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
        const newData = { photoUrl, name, email, providerName,providerImage, price, location, currency, description }

        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/add-service`, newData)
        form.reset()
    }

    return (
        <div className='w-11/12 lg:w-6/12 mx-auto py-3'>
            <Helmet>
                <title>Service Sharing | AddService</title>
            </Helmet>
            <h2 className='text-center font-bold text-2xl'>Add a services</h2>
            <form onSubmit={handleAddAService} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">PhotoURL</span>
                    </label>
                    <input type="url" name='photoUrl' placeholder="PhotoURL" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Service Name</span>
                    </label>
                    <input type="text" name='name' placeholder="Service Name" className="input input-bordered" required />
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
                        <input type="text" name='price' placeholder="price" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Currency</span>
                        </label>
                        <select name='currency' className="select select-ghost w-full max-w-xs">
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
                    <input type="text" name='location' placeholder="Location" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    {/* <input type="text" name='description' placeholder="Description" className="input input-bordered" required /> */}
                    <textarea type="text" name='description' className="textarea textarea-ghost" placeholder="Description" required></textarea>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Add services</button>
                </div>
            </form>
        </div>
    );
};

export default AddService;