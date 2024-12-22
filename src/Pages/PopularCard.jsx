import React from 'react';

const PopularCard = ({ services }) => {
    const { photoUrl, name, price, currency, description } = services
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
                    <p><span className="text-lg font-semibold text-green-500">Price: {currency} {price}</span></p>
                    <button className="mt-auto bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    )
};

export default PopularCard;