import React, { useState } from "react";
export default function Pagination() {
    const [currentPage, setCurrentPage] = useState(1);
    const TotalPages = 4;
    function nextPage() {
        setCurrentPage(prev => (prev === TotalPages ? prev : prev + 1));
    }
    function prevPage() {
        setCurrentPage(prev => (prev === 1 ? prev : prev - 1));
    }
    const Arr = [1, 2, 3, 4];
    return (
        <div className="flex items-center gap-2">
            <button onClick={prevPage}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.7426 4.2222C15.3521 3.8317 14.7193 3.83136 14.3284 4.2222L7.25736 11.2933C6.86652 11.6841 6.86686 12.317 7.25736 12.7075L14.3284 19.7786C14.5821 20.0322 14.9386 20.1208 15.265 20.0439C15.44 20.0035 15.6059 19.9153 15.7426 19.7786C16.1335 19.3877 16.1331 18.7548 15.7426 18.3643L9.37868 12.0004L15.7426 5.63642C16.1335 5.24557 16.1331 4.6127 15.7426 4.2222Z" fill="#586A84" />
                </svg>
            </button>
            {
                Arr.map((item) => {
                    return (
                        <button onClick={() => (setCurrentPage(item))} key={item} className={`rounded-full cursor-pointer px-4 py-2  ${item === currentPage ? "bg-blue-600 text-white" : "text-black bg-gray-100"}`}>
                            {item}
                        </button>
                    )
                })
            }
            <button onClick={nextPage}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.25736 19.7777C8.64785 20.1682 9.28073 20.1685 9.67157 19.7777L16.7426 12.7066C17.1335 12.3158 17.1331 11.6829 16.7426 11.2924L9.67157 4.22135C9.41789 3.96767 9.0614 3.8791 8.73503 3.95601C8.55998 3.99641 8.39408 4.08463 8.25736 4.22135C7.86652 4.61219 7.86686 5.24507 8.25736 5.63556L14.6213 11.9995L8.25736 18.3635C7.86652 18.7543 7.86686 19.3872 8.25736 19.7777Z" fill="#586A84" />
                </svg>
            </button>
        </div>
    )
}