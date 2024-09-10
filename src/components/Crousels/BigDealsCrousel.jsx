import { FeauteredProducts } from "../../api";
import React, { useRef, Suspense } from "react";
import { defer, Await, NavLink } from "react-router-dom";
import Slider from "react-slick";
import Spinner from "../Reuseables/Spinner";

export function loader() {
    const productsPromise = FeauteredProducts();
    return defer({ products: productsPromise })
}

export default function BigDeals({ data }) {
    const sliderRef = useRef(null);

    const goToNext = () => {
        sliderRef.current.slickNext();
    };

    const goToPrev = () => {
        sliderRef.current.slickPrev();
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 700,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 480, // screens less than 768px
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <div className="m-5 mt-20">
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-2xl border-b-2 border-blue-500 w-fit">Big Deals</h1>
                <div className="flex items-center gap-2">
                    <span className="cursor-pointer" onClick={goToPrev}>
                        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.7426 4.2222C15.3521 3.8317 14.7193 3.83136 14.3284 4.2222L7.25736 11.2933C6.86652 11.6841 6.86686 12.317 7.25736 12.7075L14.3284 19.7786C14.5821 20.0322 14.9386 20.1208 15.265 20.0439C15.44 20.0035 15.6059 19.9153 15.7426 19.7786C16.1335 19.3877 16.1331 18.7548 15.7426 18.3643L9.37868 12.0004L15.7426 5.63642C16.1335 5.24557 16.1331 4.6127 15.7426 4.2222Z" fill="#586A84" />
                        </svg>
                    </span>
                    <span className="cursor-pointer" onClick={goToNext}>
                        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.25736 19.7777C8.64785 20.1682 9.28073 20.1685 9.67157 19.7777L16.7426 12.7066C17.1335 12.3158 17.1331 11.6829 16.7426 11.2924L9.67157 4.22135C9.41789 3.96767 9.0614 3.8791 8.73503 3.95601C8.55998 3.99641 8.39408 4.08463 8.25736 4.22135C7.86652 4.61219 7.86686 5.24507 8.25736 5.63556L14.6213 11.9995L8.25736 18.3635C7.86652 18.7543 7.86686 19.3872 8.25736 19.7777Z" fill="#586A84" />
                        </svg>
                    </span>
                </div>
            </div>
            <div className="slider-container mt-5 overflow-hidden">
                {
                    <Suspense fallback={<Spinner />}>
                        <Await resolve={data.products}>
                            {
                                (Resolveddata) => {
                                    return <Slider ref={sliderRef} {...settings}>
                                        {
                                            Resolveddata.map((product, index) => {
                                                return (
                                                    <NavLink key={index} to={`products/${product.id}`}>
                                                        <div className="items-center justify-center border-2 border-text-black-50 h-full p-5 mr-4">
                                                            <h2 className="text-sm">{product.type}</h2>
                                                            <p className="text-lg h-20 text-blue-800 font-bold">{product.name}</p>
                                                            <img src={product.imageUrl} alt="" srcSet="" height="10rem" />
                                                            <div className="flex justify-between items-center">
                                                                <div>
                                                                    <p className="font-bold text-lg text-red-500">${product.price}</p>
                                                                    <p className="text-sm line-through">$920.00</p>
                                                                </div>
                                                                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <rect width="36" height="36" rx="18" fill="#DDE1E8" />
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M14.6653 14.6667V14.6667H13.4691C13.123 14.6667 12.8345 14.9316 12.8049 15.2765L12.0621 23.9431C12.0287 24.3324 12.3356 24.6667 12.7263 24.6667H23.2738C23.6644 24.6667 23.9714 24.3324 23.938 23.9431L23.1952 15.2765C23.1656 14.9316 22.877 14.6667 22.5309 14.6667H21.3319V14.6667C21.3319 12.8258 19.8395 11.3334 17.9986 11.3334C16.1576 11.3334 14.6653 12.8258 14.6653 14.6667ZM17.9981 12.6668C16.8935 12.6668 15.9981 13.5622 15.9981 14.6667H19.9981C19.9981 13.5622 19.1026 12.6668 17.9981 12.6668ZM17.9969 19.9999C19.8193 19.9999 21.3001 18.5375 21.3298 16.7222C21.3313 16.7039 21.332 16.6854 21.332 16.6667C21.332 16.2985 21.0335 16.0001 20.6654 16.0001C20.2972 16.0001 19.9987 16.2985 19.9987 16.6667H19.9964C19.9963 17.7713 19.1009 18.6667 17.9964 18.6667C16.9098 18.6667 16.0256 17.8002 15.9971 16.7206C15.9985 16.7028 15.9992 16.6848 15.9992 16.6667C15.9992 16.2985 15.7007 16 15.3326 16C14.9644 16 14.6659 16.2985 14.6659 16.6667V16.6667H14.6639V16.6151C14.6637 16.6322 14.6635 16.6494 14.6635 16.6666C14.6635 18.5076 16.1559 19.9999 17.9969 19.9999Z" fill="white" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </NavLink>
                                                )
                                            })
                                        }
                                    </Slider>
                                }
                            }
                        </Await>
                    </Suspense>
                }
            </div>
        </div>
    );
}








