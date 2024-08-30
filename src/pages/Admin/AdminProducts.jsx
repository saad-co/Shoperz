import React, { Suspense, useState, useEffect } from "react";
import { defer, Await, NavLink, useLoaderData } from "react-router-dom";
import { IoChevronBackCircle } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ProductsToDisplay } from "../../api";
import { auth, db } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';
import { collection, doc, deleteDoc } from 'firebase/firestore';
import ConfirmDialog from "../../components/Reuseables/ConfirmDialog";

export function loader() {
    return null;
}

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const productData = await ProductsToDisplay();
                setProducts(productData);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        fetchProducts();
    }, []);


    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }

    const handleDeleteClick = (productID) => {
        setProductToDelete(productID);
        setShowDialog(true);
    };

    const handleConfirmDelete = async () => {
        try {
            const productRef = doc(collection(db, 'products'), productToDelete);
            await deleteDoc(productRef);
            // Update local state to remove the deleted product
            setProducts((prevProducts) => prevProducts.filter(product => product.id !== productToDelete));
            setShowDialog(false);
            setProductToDelete(null);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleCancelDelete = () => {
        setShowDialog(false);
        setProductToDelete(null);
    };

    return (
        <div className={`w-full h-screen ${showDialog ? 'overflow-hidden' : ''}`}>
            <nav className="p-8 w-full text-end">
                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Logout
                </button>
            </nav>
            <div className="w-full p-5 flex justify-between items-center">
                <NavLink className="text-4xl" to=".." relative="path">
                    <IoChevronBackCircle />
                </NavLink>
                <h1 className="text-center text-2xl font-bold">PRODUCTS</h1>
                <NavLink to={"/admin/createProduct"}>
                    <button className="bg-black text-white px-4 py-2 rounded">Create New+</button>
                </NavLink>
            </div>
            <div className="max-h-96 overflow-y-auto">
                <table className="max-w-8xl p-4 border border-black rounded-sm m-5">
                    <thead className="whitespace-nowrap border-b border-black">
                        <tr>
                            <th className="w-2/12 py-3 px-5 border-r border-black">NAME</th>
                            <th className="w-2/3 py-3 px-5 border-r border-black">DESCRIPTION</th>
                            <th className="w-1/12 py-3 px-5 border-r border-black">DATE CREATED</th>
                            <th className="w-1/12 py-3 px-5 border-r border-black">Price</th>
                            <th className="w-1/12 py-3 px-5 border-r border-black">Stock</th>
                            <th className="w-1/12 py-3 px-5">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((productData, index) => {
                            const createdAtDate = new Date(productData.createdAt?.seconds * 1000);
                            return (
                                <tr key={index} className="border-b border-black">
                                    <td className="text-center py-3 px-5 border-r border-b border-black">{productData.name}</td>
                                    <td className="text-center py-3 px-5 border-r border-b border-black">{
                                        productData.description.length > 100 ? (
                                            <div className="relative">
                                                <p className="truncate overflow-hidden whitespace-nowrap" title={productData.description}>
                                                    {productData.description.substring(0, 70)}{productData.description.length > 100 ? '...' : ''}
                                                </p>
                                            </div>
                                        ) : (
                                            productData.description
                                        )
                                    }</td>
                                    <td className="text-center py-3 px-5 border-r border-b border-black">
                                        {createdAtDate.toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: '2-digit',
                                            year: 'numeric',
                                        })}
                                    </td>
                                    <td className="text-center py-3 px-5 border-r border-b border-black">£{productData.price}</td>
                                    <td className="text-center py-3 px-5 border-r border-b border-black">{productData.stock}</td>
                                    <td className="text-center flex items-center justify-center gap-3 py-3 px-5">
                                        <NavLink to={`/admin/editProduct/${productData.id}`}>
                                            <FaEdit />
                                        </NavLink>
                                        <button onClick={() => handleDeleteClick(productData.id)}>
                                            <MdDelete />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {showDialog && (
                <ConfirmDialog
                    message="Are you sure you want to delete this product?"
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}
        </div>
    );
}