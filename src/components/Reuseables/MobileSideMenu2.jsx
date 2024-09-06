import React, { useState, useEffect } from "react";

export default function MobileSideMenu({ paramfunction, param }) {
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
        <div className={`bg-gray-50 rounded-xl xs:hidden`}>
            <div className="p-6 flex flex-col justify-center gap-5">
                <div className="flex flex-col w-60 bg-gray-300 p-3 gap-5 rounded-xl">
                    <h1 className="font-bold">brands</h1>
                    <div className="flex flex-col">
                        <ul className="overflow-hidden">
                            <li className="flex items-center gap-2">
                                <button >
                                    <input className="h-5 w-5" type="checkbox" checked={filter.brand.includes("apple")} onChange={() => handleBrandFilter("apple")} />
                                </button>
                                <p>Apple (32)</p>
                            </li>
                            <li className="flex items-center gap-2">
                                <button >
                                    <input className="h-5 w-5" type="checkbox" checked={filter.brand.includes("hp")} onChange={() => handleBrandFilter("hp")} />
                                </button>
                                <p>HP (64)</p>
                            </li>
                            <li className="flex items-center gap-2">
                                <button >
                                    <input className="h-5 w-5" type="checkbox" checked={filter.brand.includes("dell")} onChange={() => handleBrandFilter("dell")} />
                                </button>
                                <p>DELL (21)</p>
                            </li>
                        </ul>
                        <div className={`grid transition-all duration-500 ease-out ${!secMenu ? "grid-rows-[0fr]" : "grid-rows-[1fr]"} `}>
                            <ul className="inner overflow-hidden">
                                <li className="flex items-center gap-2">
                                    <button >
                                        <input className="h-5 w-5" type="checkbox" checked={filter.brand.includes("sony")} onChange={() => handleBrandFilter("sony")} />
                                    </button>
                                    <p>Sony (32)</p>
                                </li>
                                <li className="flex items-center gap-2">
                                    <button >
                                        <input className="h-5 w-5" type="checkbox" checked={filter.brand.includes("lenovo")} onChange={() => handleBrandFilter("lenovo")} />
                                    </button>
                                    <p>Lenovo (64)</p>
                                </li>
                                <li className="flex items-center gap-2">
                                    <button >
                                        <input className="h-5 w-5" type="checkbox" checked={filter.brand.includes("toshiba")} onChange={() => handleBrandFilter("toshiba")} />
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
                <div className="flex flex-col bg-gray-300 p-3 gap-5 rounded-xl">
                    <h1 className="font-bold">Price</h1>
                    <div className="flex flex-col">
                        <ul className="overflow-hidden">
                            <li className="flex items-center gap-2">
                                <input className="h-5 w-5" type="checkbox" checked={filter.price.includes("50")} onChange={() => handleFilter("price", "50")} />
                                <p>&gt;50 (32)</p>
                            </li>
                            <li className="flex items-center gap-2">
                                <button >
                                    <input className="h-5 w-5" type="checkbox" checked={filter.price.includes("100")} onChange={() => handleFilter("price", "100,200")} />
                                </button>
                                <p>100-200 (64)</p>
                            </li>
                            <li className="flex items-center gap-2">
                                <button >
                                    <input className="h-5 w-5" type="checkbox" checked={filter.price.includes("201")} onChange={() => handleFilter("price", "201,300")} />
                                </button>
                                <p>200-300 (21)</p>
                            </li>
                        </ul>
                        <div className={`grid transition-all duration-500 ease-out ${!thirdMenu ? "grid-rows-[0fr]" : "grid-rows-[1fr]"} `}>
                            <ul className="inner overflow-hidden">
                                <li className="flex items-center gap-2">
                                    <button >
                                        <input className="h-5 w-5" type="checkbox" checked={filter.price.includes("400")} onChange={() => handleFilter("price", "400,500")} />
                                    </button>
                                    <p>400-500 (32)</p>
                                </li>
                                <li className="flex items-center gap-2">
                                    <button >
                                        <input className="h-5 w-5" type="checkbox" checked={filter.price.includes("1000")} onChange={() => handleFilter("price", "500,1000")} />
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