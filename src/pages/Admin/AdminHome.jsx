import React from "react";
import { NavLink} from "react-router-dom";
import { auth } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';

export default function AdminHome() {
    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }
    return (
        <div className="w-full h-screen">
            <nav className="p-8 w-full text-end">
                <button onClick={() => handleLogout()} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Logout
                </button>
            </nav>
            <h1 className="w-full text-center text-3xl font-bold">Wellcome back to Admin Dashboard</h1>
            <div className=" w-full h-auto relative p-10 flex items-center justify-center">
                <div className="flex flex-col gap-3 border-2 border-dashed border-gray p-6">
                    <div className="bg-white absolute top-5 left-auto p-2 w-fit rounded-lg">Screens</div>
                    <NavLink
                        to="adminproducts"  // Updated to be relative to /admin
                        className="bg-black text-center text-white font-bold py-2 px-4 rounded"
                    >
                        PRODUCTS
                    </NavLink>
                    <NavLink
                        to="orders"  // Updated to be relative to /admin
                        className="bg-black text-center text-white font-bold py-2 px-4 rounded"
                    >
                        PENDING ORDERS
                    </NavLink>
                    <NavLink
                        to="users"  // Updated to be relative to /admin
                        className="bg-black text-center text-white font-bold py-2 px-4 rounded"
                    >
                        USERS
                    </NavLink>
                    <NavLink
                        to="Stock"  // Updated to be relative to /admin
                        className="bg-black text-center text-white font-bold py-2 px-4 rounded"
                    >
                        STOCK
                    </NavLink>
                </div>
            </div>
        </div>


    )
}