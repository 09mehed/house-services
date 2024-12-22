import React from 'react';
import { Link } from 'react-router-dom';

const PopularCard = ({ services }) => {
    const { _id, photoUrl, name, price, currency, description, providerName, providerImage, } = services
    return (
        <div className='pt-5'>
            <div className="bg-white border border-gray-300 rounded-lg shadow-md flex flex-col h-full">
                <img src={photoUrl} alt={name} className="w-full h-48 object-cover rounded-t-lg" />
                <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-2">{name}</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        {description.length > 100
                            ? `${description.substring(0, 100)}...`
                            : description}
                    </p>
                    <div className="flex items-center space-x-3 mb-4">
                        <img
                            src={providerImage}
                            alt={providerImage}
                            className="w-10 h-10 rounded-full object-cover border border-gray-300"
                        />
                        <span className="text-sm font-semibold">{providerName}</span>
                    </div>
                    <p><span className="text-lg font-semibold text-green-500">Price: {currency} {price}</span></p>
                    <Link to={`/serviceDetails/${_id}`}>
                        <button className="mt-auto bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                            View Details
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
};

export default PopularCard;