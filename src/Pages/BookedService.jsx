import React, { useEffect, useState } from 'react';
import useAuth from '../Components/Hook/useAuth';
import { Helmet } from 'react-helmet';
import useAxiosSecure from '../Components/Hook/useAxiosSecure';
import axios from 'axios';


const BookedService = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [bookedServices, setBookServices] = useState([])
    console.log(bookedServices);
    const fetchBookedService = async (user) => {
        try {
            // const { data } = await axiosSecure.get(`/book-service/${user?.email}`)
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/book-service/?email=${user?.email}`, { withCredentials: true })
            setBookServices(data)
            console.log(data);
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {  
        fetchBookedService(user)
    }, [user])



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
                        {bookedServices?.map((service, index) => (
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



// import { useEffect, useState } from "react";
// import useAuth from "../hooks/useAuth";
// import { Link } from "react-router-dom";
// import useAxiosSecure from "../hooks/useAxiosSecure";
// import toast from "react-hot-toast";



// const Wishlist = () => {
//     const { user } = useAuth();
//     const [blogs, setBlogs] = useState([]);
//     const axiosSecure = useAxiosSecure();
  
//     const fetchAllBlogs = async (user) => {
//         const { data } = await axiosSecure.get(/wishlist?email=${user?.email});
//         setBlogs(data)
//     }
//     useEffect(() => {
//         fetchAllBlogs(user)
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [user])
    
    
//     const handleRemove = async (id) => {
//         try {
//             const { data } = await axiosSecure.delete(/wishlist/${id});
//             console.log(data)
//             toast.success('Remove wishlist Successfully')
//             fetchAllBlogs(user)
//             // setBlogs(data)
//         }
//         catch (err) {
//             toast.error(err.message)
//         }

//     }
//     return (
//         <div className="overflow-x-auto md:px-28">
//             <h2 className="text-2xl md:text-4xl text-center font-bold py-8">Featured Blogs</h2>
//             <table className="table">
//                 {/* head */}
//                 <thead className="bg-blue-100 ">
//                     <tr>
//                         <th></th>
//                         <th>Blog Photo</th>
//                         <th>Blog title</th>
//                         <th>Category</th>
//                         <th>Short Description</th>
//                         <th>Long Description</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody className="bg-gray-100 text-base font-semibold">
//                     {/* row 1 */}
//                     {
//                         blogs?.map((blog, index) => <tr key={blog._id}>
//                             <th>{index + 1}</th>
//                             <td><img className="w-20 h-10 rounded-xl" src={blog.photo} alt="" /></td>
//                             <td>{blog.title}</td>
//                             <td>{blog.category}</td>
//                             <td>{blog.shortDescript?.substring(0, 20)}...</td>
//                             <td>{blog.longDescript?.substring(0, 20)}...</td>
//                             <td className="flex gap-3">
//                                 <button className="btn btn-warning"><Link to={`/details/${blog.blog_id}`}>Details</Link></button>
//                                 <button onClick={() => handleRemove(blog._id)} className="btn btn-error">Remove</button>
//                             </td>
//                         </tr>)
//                     }

//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default Wishlist;