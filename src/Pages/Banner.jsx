import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import 'animate.css';
import { useState } from "react";

import img1 from '../assets/banner/banner1.avif'
import img2 from '../assets/banner/banner2.avif'
import img3 from '../assets/banner/banner3avif.avif'
import img4 from '../assets/banner/banner4.avif'
import img5 from '../assets/banner/banner5.avif'

const Banner = () => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const images = [
        { src: img1, alt: 'Image 1', },
        { src: img2, alt: 'Image 2', },
        { src: img3, alt: 'Image 3', },
        { src: img4, alt: 'Image 4', },
        { src: img5, alt: 'Image 5', },
    ];

    return (
        <div className="lg:px-16">
            <Swiper
                spaceBetween={50}
                slidesPerView={1}
                loop={true}
                pagination={{ clickable: true }}
                navigation
                modules={[Navigation, Pagination]}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 1 },
                    1024: { slidesPerView: 1 },
                }}
                onSlideChange={(swiper) => setCurrentSlideIndex(swiper.activeIndex)}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-[450px] bg-gray-100 rounded-lg overflow-hidden">
                            <img
                                src={image.src}
                                alt={image.alt}
                                className={`w-full h-full object-cover rounded-lg ${currentSlideIndex === index
                                        ? "animate__animated animate__fadeIn"
                                        : ""
                                    }`}
                            />
                            <div className={`absolute inset-0 flex justify-center items-center bg-black bg-opacity-40 text-white text-center rounded-lg p-4 ${currentSlideIndex === index
                                    ? "animate__animated animate__zoomIn"
                                    : ""
                                }`}>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Banner;