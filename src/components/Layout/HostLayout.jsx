import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { auth } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';

export default function HostLayout() {
    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
    return (
        <div className="min-h-screen bg-gray-800 flex flex-col justify-start gap-5">
            <div className="w-full bg-white text-black p-10 text-center text-3xl">
                Admin Dashboard
            </div>
            <div className="flex justify-center items-center gap-5">
                <NavLink
                    to="create-product"  // Updated to be relative to /admin
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Create a new Product
                </NavLink>
                <NavLink
                    to="view-products"  // Updated to be relative to /admin
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                    View All Products
                </NavLink>
                <NavLink
                    to="current-orders"  // Updated to be relative to /admin
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                >
                    Current Orders
                </NavLink>
                <NavLink
                    to="items-in-stock"  // Updated to be relative to /admin
                    className="bg-purple-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                    Items In Stock
                </NavLink>
                <button onClick={() => handleLogout()} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Logout
                </button>
            </div>
            <Outlet /> {/* This renders the nested routes */}
        </div>
    );
}
