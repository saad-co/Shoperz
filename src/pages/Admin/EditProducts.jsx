import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from '../../firebaseConfig';

export default function EditProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [type, setType] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProduct() {
            try {
                const docRef = doc(db, 'products', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setProduct(data);
                    setName(data.name);
                    setDescription(data.description);
                    setPrice(data.price);
                    setStock(data.stock);
                    setType(data.type); // Assuming type is a separate field in the products collection. Adjust as needed.
                } else {
                    console.error('No such document!');
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        }

        fetchProduct();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const docRef = doc(db, 'products', id);
            await updateDoc(docRef, { name, description, price, stock, type });
            navigate('/admin/adminproducts'); // Redirect to admin page after update
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    if (!product) return <div className="h-96 m-auto text-center text-3xl text-green-500">Loading...</div>;

    return (
        <div className="w-full h-screen flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
                <h1 className="text-2xl font-bold mb-5 text-center">Edit Product</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Type</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        >
                            <option value="">Select Type</option>
                            <option value="2-seater">2-Seater Sofa (Loveseat)</option>
                            <option value="3-seater">3-Seater Sofa</option>
                            <option value="sectional">Sectional Sofa</option>
                            <option value="recliner">Recliner Sofa</option>
                            <option value="sofa-bed">Sofa Bed (Sleeper Sofa)</option>
                            <option value="chaise-lounge">Chaise Lounge</option>
                            <option value="corner">Corner Sofa</option>
                            <option value="chesterfield">Chesterfield Sofa</option>
                            <option value="futon">Futon</option>
                            <option value="convertible">Convertible Sofa</option>
                            <option value="tuxedo">Tuxedo Sofa</option>
                            <option value="bridgewater">Bridgewater Sofa</option>
                            <option value="cabriole">Cabriole Sofa</option>
                            <option value="lawson">Lawson Sofa</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Stock</label>
                        <input
                            type="number"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Update Product
                    </button>
                </form>
            </div>
        </div>
    );
}
