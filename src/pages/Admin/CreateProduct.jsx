import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { db } from "../../firebaseConfig"; // Adjust the path to your firebaseConfig file
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import Spinner from "../../components/Reuseables/Spinner";

export default function CreateProduct() {
    const [Loading, setLoading] = useState(false); // Manages loading state
    const navigate = useNavigate(); // For manual navigation after successful submission

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true); // Show spinner

        const formData = new FormData(event.target);
        const name = formData.get("name");
        const description = formData.get("description");
        const type = formData.get("type");
        const price = parseFloat(formData.get("price"));
        const stock = parseInt(formData.get("stock"), 10);
        const file = formData.get("images");

        if (file) {
            try {
                const storage = getStorage();
                const storageRef = ref(storage, `products/${uuidv4()}`);
                await uploadBytes(storageRef, file);
                const imageUrl = await getDownloadURL(storageRef);

                // Add product to the Firestore database
                await addDoc(collection(db, "products"), {
                    name,
                    description,
                    type,
                    price,
                    imageUrl,
                    createdAt: serverTimestamp(),
                    stock,
                });

                setLoading(false); // Hide spinner
                navigate("/admin/adminproducts"); // Redirect after successful submission
            } catch (error) {
                console.error("Error adding product: ", error);
                setLoading(false); // Hide spinner in case of error
            }
        }
    };

    return (
        <div className="relative">
            {Loading ? (
                <div className="flex justify-center items-center fixed inset-0 bg-gray-600 bg-opacity-50 z-50">
                    <Spinner />
                </div>
            ) : (
                <Form
                    method="post"
                    encType="multipart/form-data"
                    className="bg-gray-300 p-10 rounded-lg shadow-md w-full max-w-4xl mx-auto"
                    onSubmit={handleSubmit} // Attach form submission handler
                >
                    <h2 className="text-2xl font-bold mb-5 text-center">Add New Product</h2>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                            Type
                        </label>
                        <select
                            id="type"
                            name="type"
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
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40 resize-none"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                            Price
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="images">
                            Images
                        </label>
                        <input
                            type="file"
                            id="images"
                            name="images"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
                            Stock
                        </label>
                        <input
                            type="number"
                            id="stock"
                            name="stock"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Add Product
                        </button>
                    </div>
                </Form>
            )}
        </div>
    );
}
