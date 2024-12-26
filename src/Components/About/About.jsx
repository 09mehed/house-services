import Lottie from 'lottie-react';
import React from 'react';
import about from '../../assets/animatin/about.json'

const About = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <h2 className='text-2xl text-center font-bold'>About Us</h2>
            <div className='flex lg:flex-row flex-col-reverse justify-between items-center gap-3'>
                <div className='w-full lg:w-1/2'>
                    <div className="collapse collapse-arrow bg-base-200 my-3">
                        <input type="radio" name="my-accordion-2" defaultChecked />
                        <div className="collapse-title text-xl font-medium">Water Service</div>
                        <div className="collapse-content">
                            <p>Water supply system, infrastructure for the collection, transmission, treatment, storage, and distribution of water for homes, commercial establishments, industry, and irrigation, as well as for such public needs as firefighting and street flushing.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow bg-base-200 my-3">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl font-medium">Furniture Service</div>
                        <div className="collapse-content">
                            <p>Furniture, household equipment, usually made of wood, metal, plastics, marble, glass, fabrics, or related materials and having a variety of different purposes. Furniture ranges widely from the simple pine chest or stick-back country chair to the most elaborate marquetry work cabinet or gilded console table.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow bg-base-200 my-3">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl font-medium">House change service</div>
                        <div className="collapse-content">
                            <p>The act of relocating all or part of your possessions from one place of living to another is referred to as the house shifting process, sometimes known as household moving or relocation. This might take place across town, to another city, or even to a different country.</p>
                        </div>
                    </div>
                </div>
                <div className="text-center lg:text-left w-full lg:w-1/2">
                    <Lottie animationData={about}></Lottie>
                </div>
            </div>
        </div>
    );
};

export default About;