import React, { useState, Suspense, memo, useEffect } from "react";
import { useLoaderData, defer, Await, Link, NavLink, useSearchParams } from "react-router-dom";
import { FeauteredProducts } from "../api";

function Products() {
    const loadedDataPromise = useLoaderData();
    const [searchparam, setSearchparam] = useSearchParams();
    const PriceFilterArr = searchparam.get('price') ? searchparam.get('price').split(',') : [];
    const BrandFilterArr = searchparam.get('brand') ? searchparam.get('brand').split(',') : [];

    console.log("checking search param", searchparam.toString());


    const [isActive, setIsActive] = useState(true);
    const [isSecActive, setIsSecActive] = useState(false);


    function toggleFirst() {
        if (isActive) {
            if (!isSecActive) {
            }
            else {
                setIsActive(false);
            }
        }
        if (!isActive) {
            setIsActive(true);
            setIsSecActive(false);
        }
    }

    function toggleSec() {
        if (isSecActive) {
            if (!isActive) {
            }
            else {
                setIsSecActive(false);
            }

        }
        if (!isSecActive) {
            setIsSecActive(true);
            setIsActive(false);
        }
    }

    return (
        <section className="flex m-3">
            <MobileSideMenu paramfunction={setSearchparam} param={searchparam} />
            <main className="flex flex-col gap-3 p-5 w-full">
                <div className="shadow-sm p-4">
                    <div className="flex items-center justify-between w-full">
                        <h1 className="text-3xl font-semibold xs:text-lg">Product List</h1>
                        <h1 className="font-semibold">Showing 1-12 of 1090</h1>
                    </div>
                    <div className="flex items-center justify-between xs:hidden">
                        <div className="flex items-center gap-2">
                            <div onClick={toggleFirst} className={`${isActive ? "bg-gray-300 rounded-lg" : ""} p-2`} >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.66669 2.50008C1.66669 2.03984 2.03978 1.66675 2.50002 1.66675H5.00002C5.46026 1.66675 5.83335 2.03984 5.83335 2.50008V5.00008C5.83335 5.46032 5.46026 5.83341 5.00002 5.83341H2.50002C2.03978 5.83341 1.66669 5.46032 1.66669 5.00008V2.50008ZM1.66669 8.75008C1.66669 8.28984 2.03978 7.91675 2.50002 7.91675H5.00002C5.46026 7.91675 5.83335 8.28984 5.83335 8.75008V11.2501C5.83335 11.7103 5.46026 12.0834 5.00002 12.0834H2.50002C2.03978 12.0834 1.66669 11.7103 1.66669 11.2501V8.75008ZM2.50002 14.1667C2.03978 14.1667 1.66669 14.5398 1.66669 15.0001V17.5001C1.66669 17.9603 2.03978 18.3334 2.50002 18.3334H5.00002C5.46026 18.3334 5.83335 17.9603 5.83335 17.5001V15.0001C5.83335 14.5398 5.46026 14.1667 5.00002 14.1667H2.50002ZM14.1667 2.50008C14.1667 2.03984 14.5398 1.66675 15 1.66675H17.5C17.9603 1.66675 18.3334 2.03984 18.3334 2.50008V5.00008C18.3334 5.46032 17.9603 5.83341 17.5 5.83341H15C14.5398 5.83341 14.1667 5.46032 14.1667 5.00008V2.50008ZM15 7.91675C14.5398 7.91675 14.1667 8.28984 14.1667 8.75008V11.2501C14.1667 11.7103 14.5398 12.0834 15 12.0834H17.5C17.9603 12.0834 18.3334 11.7103 18.3334 11.2501V8.75008C18.3334 8.28984 17.9603 7.91675 17.5 7.91675H15ZM14.1667 15.0001C14.1667 14.5398 14.5398 14.1667 15 14.1667H17.5C17.9603 14.1667 18.3334 14.5398 18.3334 15.0001V17.5001C18.3334 17.9603 17.9603 18.3334 17.5 18.3334H15C14.5398 18.3334 14.1667 17.9603 14.1667 17.5001V15.0001ZM8.75002 1.66675C8.28978 1.66675 7.91669 2.03984 7.91669 2.50008V5.00008C7.91669 5.46032 8.28978 5.83341 8.75002 5.83341H11.25C11.7103 5.83341 12.0834 5.46032 12.0834 5.00008V2.50008C12.0834 2.03984 11.7103 1.66675 11.25 1.66675H8.75002ZM7.91669 8.75008C7.91669 8.28984 8.28978 7.91675 8.75002 7.91675H11.25C11.7103 7.91675 12.0834 8.28984 12.0834 8.75008V11.2501C12.0834 11.7103 11.7103 12.0834 11.25 12.0834H8.75002C8.28978 12.0834 7.91669 11.7103 7.91669 11.2501V8.75008ZM8.75002 14.1667C8.28978 14.1667 7.91669 14.5398 7.91669 15.0001V17.5001C7.91669 17.9603 8.28978 18.3334 8.75002 18.3334H11.25C11.7103 18.3334 12.0834 17.9603 12.0834 17.5001V15.0001C12.0834 14.5398 11.7103 14.1667 11.25 14.1667H8.75002Z" fill="#3B4758" />
                                </svg>
                            </div>
                            <div onClick={toggleSec} className={`${isSecActive ? "bg-gray-300 rounded-lg" : ""} p-2`}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.50002 1.66675C2.03978 1.66675 1.66669 2.03984 1.66669 2.50008V5.00008C1.66669 5.46032 2.03978 5.83341 2.50002 5.83341H5.00002C5.46026 5.83341 5.83335 5.46032 5.83335 5.00008V2.50008C5.83335 2.03984 5.46026 1.66675 5.00002 1.66675H2.50002ZM2.50002 7.91675C2.03978 7.91675 1.66669 8.28984 1.66669 8.75008V11.2501C1.66669 11.7103 2.03978 12.0834 2.50002 12.0834H5.00002C5.46026 12.0834 5.83335 11.7103 5.83335 11.2501V8.75008C5.83335 8.28984 5.46026 7.91675 5.00002 7.91675H2.50002ZM1.66669 15.0001C1.66669 14.5398 2.03978 14.1667 2.50002 14.1667H5.00002C5.46026 14.1667 5.83335 14.5398 5.83335 15.0001V17.5001C5.83335 17.9603 5.46026 18.3334 5.00002 18.3334H2.50002C2.03978 18.3334 1.66669 17.9603 1.66669 17.5001V15.0001ZM8.33335 1.66675C7.87312 1.66675 7.50002 2.03984 7.50002 2.50008V5.00008C7.50002 5.46032 7.87311 5.83341 8.33335 5.83341H17.5C17.9603 5.83341 18.3334 5.46032 18.3334 5.00008V2.50008C18.3334 2.03984 17.9603 1.66675 17.5 1.66675H8.33335ZM7.50002 8.75008C7.50002 8.28984 7.87312 7.91675 8.33335 7.91675H17.5C17.9603 7.91675 18.3334 8.28984 18.3334 8.75008V11.2501C18.3334 11.7103 17.9603 12.0834 17.5 12.0834H8.33335C7.87311 12.0834 7.50002 11.7103 7.50002 11.2501V8.75008ZM8.33335 14.1667C7.87312 14.1667 7.50002 14.5398 7.50002 15.0001V17.5001C7.50002 17.9603 7.87311 18.3334 8.33335 18.3334H17.5C17.9603 18.3334 18.3334 17.9603 18.3334 17.5001V15.0001C18.3334 14.5398 17.9603 14.1667 17.5 14.1667H8.33335Z" fill="#586A84" />
                                </svg>

                            </div>
                        </div>
                        <div className="flex gap-2 xs:hidden">
                            <form className="rounded-lg border-gray border-2 w-fit p-2">
                                <select id="fruits" name="fruits">
                                    <option value="apple">Default sorting</option>
                                    <option value="banana">1</option>
                                    <option value="cherry">2</option>
                                    <option value="date">3</option>
                                </select>
                            </form>
                            <form className="rounded-lg border-gray border-2 w-fit p-2">
                                <select id="fruits" name="fruits">
                                    <option value="apple">12 products/page</option>
                                    <option value="banana">1</option>
                                    <option value="cherry">2</option>
                                    <option value="date">3</option>
                                </select>
                            </form>
                        </div>
                    </div>
                </div>

                <Suspense fallback={<div className="text-center m-auto xs:m-0 text-5xl xs:h-full">Loading...</div>}>
                    <Await resolve={loadedDataPromise.data}>
                        {(RealData) => {
                            {/* console.log("RealData", RealData); */ }
                            return (
                                <div className={`grid ${isActive ? "lg:grid-cols-3 xs:grid-cols-2" : "grid-cols-1"}  gap-2 xs:h-full`}>
                                    {RealData.filter(item => { let minPrice = 0; let maxPrice = Number.MAX_SAFE_INTEGER; if (PriceFilterArr.length === 1) { maxPrice = parseInt(PriceFilterArr[PriceFilterArr.length - 1]) } else if (PriceFilterArr.length > 1) { minPrice = parseInt(PriceFilterArr[0]); maxPrice = parseInt(PriceFilterArr[PriceFilterArr.length - 1]) } return item.ProductPrice >= minPrice && item.ProductPrice <= maxPrice && (BrandFilterArr.length > 0 ? BrandFilterArr.includes(item.ProductCompany.toLowerCase()) : true) }).map((item) => {
                                        return (
                                            <div className={`p-4 xs:p-2 border-2 h-full border-gray rounded-lg justify-center ${isActive ? "flex-col" : "flex"}`} key={item.id}>
                                                {
                                                    isActive ? (<Link to={item.id} state={{ queryParam: `?${searchparam.toString()}` }}>
                                                        <h1 className="text-blue-400 text-lg h-20 xs:h-30 xs:font-bold xs:text-sm">{item.ProductName}</h1>
                                                        <img src={item.ProductImageUrl} alt={item.ProductName} />
                                                        <div className="flex xs:flex-col items-center justify-between lg:mt-2 xs:mt-0 xs:items-start xs:gap-2">
                                                            <p className="font-bold text-lg">${item.ProductPrice}</p>
                                                            <div className="flex gap-2">
                                                                <button className="xs:bg-blue-500 xs:flex xs:items-center xs:rounded-2xl xs:p-1 xs:justify-evenly xs:gap-1">
                                                                    <svg width="26" height="26" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <rect width="36" height="36" rx="18" fill="#319DFF" />
                                                                        <path fillRule="evenodd" clipRule="evenodd" d="M14.2583 14.1667V14.1667H12.762C12.3293 14.1667 11.9686 14.4978 11.9317 14.9289L11.0031 25.7622C10.9614 26.2488 11.3451 26.6667 11.8334 26.6667H25.0178C25.5061 26.6667 25.8897 26.2488 25.848 25.7622L24.9195 14.9289C24.8825 14.4978 24.5218 14.1667 24.0892 14.1667H22.5916V14.1667C22.5916 11.8655 20.7261 10 18.4249 10C16.1237 10 14.2583 11.8655 14.2583 14.1667ZM15.9249 14.1667V14.1667H20.9249V14.1667C20.9249 12.786 19.8056 11.6667 18.4249 11.6667C17.0442 11.6667 15.9249 12.786 15.9249 14.1667ZM18.4236 20.8333C20.7073 20.8333 22.5619 18.9961 22.59 16.719C22.5911 16.7017 22.5916 16.6843 22.5916 16.6667C22.5916 16.2064 22.2185 15.8333 21.7583 15.8333C21.298 15.8333 20.9249 16.2064 20.9249 16.6667V16.6667H20.9236C20.9236 18.0474 19.8043 19.1667 18.4236 19.1667C17.0565 19.1667 15.9457 18.0693 15.924 16.7073C15.9246 16.6938 15.9249 16.6803 15.9249 16.6667C15.9249 16.2064 15.5518 15.8333 15.0916 15.8333C14.6314 15.8333 14.2583 16.2064 14.2583 16.6667V16.6667H14.2576V16.5924C14.2572 16.6171 14.257 16.6419 14.257 16.6667C14.257 18.9679 16.1224 20.8333 18.4236 20.8333Z" fill="white" />
                                                                    </svg>
                                                                    <p className="xs:text-white xs:text-[0.7rem] lg:hidden">Add to cart</p>
                                                                </button>
                                                                <button >
                                                                    <svg width="26" height="26" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <rect width="36" height="36" rx="18" fill="#F5F5F5" />
                                                                        <path d="M18 27.0016L11.3406 20.3422C9.77537 18.777 9.77537 16.2392 11.3406 14.6739C12.9059 13.1087 15.4437 13.1087 17.0089 14.6739L17.6465 15.3115L18 15.665L18.3536 15.3115L18.9911 14.6739C20.5564 13.1087 23.0942 13.1087 24.6594 14.6739C26.2247 16.2392 26.2247 18.777 24.6594 20.3422L18 27.0016Z" stroke="#7D8FA9" />
                                                                    </svg>

                                                                </button>

                                                            </div>
                                                        </div>
                                                    </Link>) : (
                                                        <NavLink to={item.id} className="flex w-full gap-5">
                                                            <img src={item.ProductImageUrl} alt={item.ProductName} />
                                                            <div className="flex flex-col w-full gap-5">
                                                                <h1 className="text-blue-400 text-2xl font-bold">{item.ProductName}</h1>
                                                                <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.</p>
                                                                <div className="flex flex-col items-start justify-between mt-2 gap-3">
                                                                    <p className="font-bold text-3xl">${item.ProductPrice}</p>
                                                                    <div className="flex gap-2 w-3/5">
                                                                        <button className="rounded-full p-2 bg-blue-500 w-full flex justify-evenly items-center">
                                                                            <p className="text-white">Add to cart</p>
                                                                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <rect width="36" height="36" rx="18" fill="#319DFF" />
                                                                                <path fillRule="evenodd" clipRule="evenodd" d="M14.2583 14.1667V14.1667H12.762C12.3293 14.1667 11.9686 14.4978 11.9317 14.9289L11.0031 25.7622C10.9614 26.2488 11.3451 26.6667 11.8334 26.6667H25.0178C25.5061 26.6667 25.8897 26.2488 25.848 25.7622L24.9195 14.9289C24.8825 14.4978 24.5218 14.1667 24.0892 14.1667H22.5916V14.1667C22.5916 11.8655 20.7261 10 18.4249 10C16.1237 10 14.2583 11.8655 14.2583 14.1667ZM15.9249 14.1667V14.1667H20.9249V14.1667C20.9249 12.786 19.8056 11.6667 18.4249 11.6667C17.0442 11.6667 15.9249 12.786 15.9249 14.1667ZM18.4236 20.8333C20.7073 20.8333 22.5619 18.9961 22.59 16.719C22.5911 16.7017 22.5916 16.6843 22.5916 16.6667C22.5916 16.2064 22.2185 15.8333 21.7583 15.8333C21.298 15.8333 20.9249 16.2064 20.9249 16.6667V16.6667H20.9236C20.9236 18.0474 19.8043 19.1667 18.4236 19.1667C17.0565 19.1667 15.9457 18.0693 15.924 16.7073C15.9246 16.6938 15.9249 16.6803 15.9249 16.6667C15.9249 16.2064 15.5518 15.8333 15.0916 15.8333C14.6314 15.8333 14.2583 16.2064 14.2583 16.6667V16.6667H14.2576V16.5924C14.2572 16.6171 14.257 16.6419 14.257 16.6667C14.257 18.9679 16.1224 20.8333 18.4236 20.8333Z" fill="white" />
                                                                            </svg>
                                                                        </button>
                                                                        <button className="rounded-full border-2 border-black  p-2 bg-white w-full flex justify-evenly items-center">
                                                                            <p className="text-black">Add to favorites</p>
                                                                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <rect width="36" height="36" rx="18" fill="#F5F5F5" />
                                                                                <path d="M18 27.0016L11.3406 20.3422C9.77537 18.777 9.77537 16.2392 11.3406 14.6739C12.9059 13.1087 15.4437 13.1087 17.0089 14.6739L17.6465 15.3115L18 15.665L18.3536 15.3115L18.9911 14.6739C20.5564 13.1087 23.0942 13.1087 24.6594 14.6739C26.2247 16.2392 26.2247 18.777 24.6594 20.3422L18 27.0016Z" stroke="#7D8FA9" />
                                                                            </svg>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </NavLink>
                                                    )
                                                }
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        }}
                    </Await>
                </Suspense>
                <div className="w-full flex justify-between items-center p-4 rounded-lg border-2 border-gray-100 xs:hidden">
                    <div>
                        Showing 1-12 of 1090
                    </div>
                    <div>
                        <Pagination />
                    </div>
                </div>
            </main>
        </section >
    )
}


function Pagination() {
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
// export async function loader() {
//     const DataPromise = FeauteredProducts();
//     return defer({ data: DataPromise })
// }


export async function loader() {
    const cachedData = localStorage.getItem('featuredProducts');
    const dataAge = localStorage.getItem('featuredProductsTimestamp');
    const cacheDuration = 24 * 60 * 60 * 1000;
    if (cachedData && (Date.now() - dataAge) < cacheDuration) {
        return defer({
            data: Promise.resolve(JSON.parse(cachedData))
        });
    } else {
        const DataPromise = FeauteredProducts().then(data => {
            localStorage.setItem('featuredProducts', JSON.stringify(data));
            localStorage.setItem('featuredProductsTimestamp', Date.now().toString());
            return data;
        });
        return defer({ data: DataPromise });
    }
}


function MobileSideMenu({ paramfunction, param }) {
    const [openMenu, setOpenMenu] = useState(false);
    const [secMenu, setSecMenu] = useState(false);
    const [thirdMenu, setThirdMenu] = useState(false);
    const [filter, setFilter] = useState({ price: param.get('price') ? param.get('price').split(",") : [], brand: param.get('brand') ? param.get('brand').split(",") : [] });

    function toggle() {
        setOpenMenu(!openMenu);
    }

    function toggle2() {
        setSecMenu(!secMenu)
    }

    function toggle3() {
        setThirdMenu(!thirdMenu)
    }

    useEffect(() => {
        const sp = new URLSearchParams(param);

        if (filter.price.length > 0) {
            sp.set('price', filter.price.join(','));
        } else {
            sp.delete('price');
        }
        if (filter.brand.length > 0) {
            sp.set('brand', filter.brand.join(','));
        } else {
            sp.delete('brand');
        }
        paramfunction(sp);
    }, [filter]);



    function handleFilter(firtKey, secValue) {
        const newFilter = { ...filter };
        const pricearr = secValue.split(",");
        let flag = false;
        pricearr.forEach(price => {
            if (newFilter.price.includes(price)) {
                newFilter.price = newFilter.price.filter(value => value !== price);
                flag = true;
            }
        });
        if (!flag) {
            newFilter.price = [...newFilter.price, ...pricearr];
        }
        setFilter(newFilter);
    }


    function handleBrandFilter(brandName) {
        const newFilter = { ...filter };
        if (newFilter.brand.includes(brandName)) {
            newFilter.brand = newFilter.brand.filter(value => value !== brandName);
        } else {
            newFilter.brand = [...newFilter.brand, brandName];
        }
        setFilter(newFilter);
    }




    return (
        <div className={`bg-gray-300 rounded-xl xs:hidden`}>
            <div className="p-6 flex flex-col justify-center gap-5">
                <div className="flex flex-col bg-gray-200 p-3 gap-5 rounded-xl">
                    <h1 className="font-bold">Categories</h1>
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <p className="font-bold">All (1929)</p>
                            <svg onClick={toggle} className={`duration-400 ${openMenu ? "rotate-0" : "rotate-180"}`} width="22" height="9" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.1852 6.49501C11.4455 6.23468 11.4457 5.81276 11.1852 5.5522L6.47113 0.838157C6.21057 0.577596 5.78865 0.577826 5.52832 0.838157L0.814275 5.5522C0.645151 5.72133 0.586111 5.95898 0.637383 6.17656C0.664314 6.29326 0.723124 6.40386 0.814275 6.49501C1.07484 6.75557 1.49675 6.75534 1.75708 6.49501L5.99972 2.25237L10.2424 6.49501C10.5029 6.75557 10.9248 6.75534 11.1852 6.49501Z" fill="#1D232C" />
                            </svg>
                        </div>
                        <div className={`grid transition-all duration-500 ease-out ${!openMenu ? "grid-rows-[0fr]" : "grid-rows-[1fr]"} `}>
                            <ul className="overflow-hidden">
                                <li>iMac & MacBook (81)</li>
                                <li>Gaming Computers (1126)</li>
                                <li>Laptops & PCs (2390)</li>
                                <li>Gadgets (511)</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col bg-gray-100 p-3 gap-5 rounded-xl">
                    <h1 className="font-bold">brands</h1>
                    <div className="flex flex-col">
                        <ul className="overflow-hidden">
                            <li className="flex items-center gap-2">
                                <button onClick={() => handleBrandFilter("apple")}>
                                    <input className="h-5 w-5" type="checkbox" checked={filter.brand.includes("apple")} />
                                </button>
                                <p>Apple (32)</p>
                            </li>
                            <li className="flex items-center gap-2">
                                <button onClick={() => handleBrandFilter("hp")}>
                                    <input className="h-5 w-5" type="checkbox" checked={filter.brand.includes("hp")} />
                                </button>
                                <p>HP (64)</p>
                            </li>
                            <li className="flex items-center gap-2">
                                <button onClick={() => handleBrandFilter("dell")}>
                                    <input className="h-5 w-5" type="checkbox" checked={filter.brand.includes("dell")} />
                                </button>
                                <p>DELL (21)</p>
                            </li>
                        </ul>
                        <div className={`grid transition-all duration-500 ease-out ${!secMenu ? "grid-rows-[0fr]" : "grid-rows-[1fr]"} `}>
                            <ul className="inner overflow-hidden">
                                <li className="flex items-center gap-2">
                                    <button onClick={() => handleBrandFilter("sony")}>
                                        <input className="h-5 w-5" type="checkbox" checked={filter.brand.includes("sony")} />
                                    </button>
                                    <p>Sony (32)</p>
                                </li>
                                <li className="flex items-center gap-2">
                                    <button onClick={() => handleBrandFilter("lenovo")}>
                                        <input className="h-5 w-5" type="checkbox" checked={filter.brand.includes("lenovo")} />
                                    </button>
                                    <p>Lenovo (64)</p>
                                </li>
                                <li className="flex items-center gap-2">
                                    <button onClick={() => handleBrandFilter("toshiba")}>
                                        <input className="h-5 w-5" type="checkbox" checked={filter.brand.includes("toshiba")} />
                                    </button>
                                    <p>Toshiba (21)</p>
                                </li>

                            </ul>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="font-bold">{!secMenu ? "Show more" : "Show less"}</p>
                            <svg onClick={toggle2} className={`duration - 400 ${secMenu ? "rotate-0" : "rotate-180"} `} width="22" height="9" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.1852 6.49501C11.4455 6.23468 11.4457 5.81276 11.1852 5.5522L6.47113 0.838157C6.21057 0.577596 5.78865 0.577826 5.52832 0.838157L0.814275 5.5522C0.645151 5.72133 0.586111 5.95898 0.637383 6.17656C0.664314 6.29326 0.723124 6.40386 0.814275 6.49501C1.07484 6.75557 1.49675 6.75534 1.75708 6.49501L5.99972 2.25237L10.2424 6.49501C10.5029 6.75557 10.9248 6.75534 11.1852 6.49501Z" fill="#1D232C" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col bg-gray-100 p-3 gap-5 rounded-xl">
                    <h1 className="font-bold">Price</h1>
                    <div className="flex flex-col">
                        <ul className="overflow-hidden">
                            <li className="flex items-center gap-2">
                                <button onClick={() => handleFilter("price", "50")}>
                                    <input className="h-5 w-5" type="checkbox" checked={filter.price.includes("50")} />
                                </button>
                                <p>&gt;50 (32)</p>
                            </li>
                            <li className="flex items-center gap-2">
                                <button onClick={() => handleFilter("price", "100,200")}>
                                    <input className="h-5 w-5" type="checkbox" checked={filter.price.includes("100")} />
                                </button>
                                <p>100-200 (64)</p>
                            </li>
                            <li className="flex items-center gap-2">
                                <button onClick={() => handleFilter("price", "201,300")}>
                                    <input className="h-5 w-5" type="checkbox" checked={filter.price.includes("201")} />
                                </button>
                                <p>200-300 (21)</p>
                            </li>
                        </ul>
                        <div className={`grid transition-all duration-500 ease-out ${!thirdMenu ? "grid-rows-[0fr]" : "grid-rows-[1fr]"} `}>
                            <ul className="inner overflow-hidden">
                                <li className="flex items-center gap-2">
                                    <button onClick={() => handleFilter("price", "400,500")}>
                                        <input className="h-5 w-5" type="checkbox" checked={filter.price.includes("400")} />
                                    </button>
                                    <p>400-500 (32)</p>
                                </li>
                                <li className="flex items-center gap-2">
                                    <button onClick={() => handleFilter("price", "500,1000")}>
                                        <input className="h-5 w-5" type="checkbox" checked={filter.price.includes("1000")} />
                                    </button>
                                    <p>500-1000 (64)</p>
                                </li>
                            </ul>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="font-bold">{!thirdMenu ? "Show more" : "Show less"}</p>
                            <svg onClick={toggle3} className={`duration - 400 ${thirdMenu ? "rotate-0" : "rotate-180"} `} width="22" height="9" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.1852 6.49501C11.4455 6.23468 11.4457 5.81276 11.1852 5.5522L6.47113 0.838157C6.21057 0.577596 5.78865 0.577826 5.52832 0.838157L0.814275 5.5522C0.645151 5.72133 0.586111 5.95898 0.637383 6.17656C0.664314 6.29326 0.723124 6.40386 0.814275 6.49501C1.07484 6.75557 1.49675 6.75534 1.75708 6.49501L5.99972 2.25237L10.2424 6.49501C10.5029 6.75557 10.9248 6.75534 11.1852 6.49501Z" fill="#1D232C" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default memo(Products);