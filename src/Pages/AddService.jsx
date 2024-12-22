import React from 'react';

const AddService = () => {

    const handleAddAService = e => {
        e.preventDefault()
        const form = e.target 

    }

    return (
        <div className='w-11/12 lg:w-6/12 mx-auto py-3'>
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
                    <input type="email" name='email' placeholder="Service email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Price</span>
                    </label>
                    <input type="text" name='price' placeholder="price" className="input input-bordered" required />
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
                    <input type="text" name='description' placeholder="Description" className="input input-bordered" required />
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Add services</button>
                </div>
            </form>
        </div>
    );
};

export default AddService;