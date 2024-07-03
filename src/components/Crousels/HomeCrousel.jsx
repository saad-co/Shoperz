import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function SimpleSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 3000,
    };
    return (
        <Slider className="overflow-hidden" {...settings}>
            <div className="bg-blue-950 flex items-center h-96 overflow-hidden">
                <div className="flex flex-col gap-10 justify-center h-full p-5 text-white">
                    <p>Best Deal Online on Computers</p>
                    <p className="font-bold text-4xl">Save Big <br />with Exclusive Deals!</p>
                    <p className="bg-yellow-500 w-fit p-1 text-black">Upto 40% OFF</p>
                </div>
            </div>
            <div className="bg-blue-950 flex items-center h-96 overflow-hidden xs:flex xs:flex-col">
                <div className="flex flex-col gap-10 justify-center h-full p-5 text-white">
                    <p>Best Deal Online on Computers</p>
                    <p className="font-bold text-4xl">Save Big <br />with Exclusive Deals!</p>
                    <p className="bg-yellow-500 w-fit p-1 text-black">Upto 40% OFF</p>
                </div>
            </div>

        </Slider>
    );
}