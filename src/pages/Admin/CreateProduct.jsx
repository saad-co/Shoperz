import React from "react";
import { Form, redirect } from "react-router-dom";
import { db } from "../../firebaseConfig"; // Adjust the path to your firebaseConfig file
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

// Action function to handle form submission
export const action = async ({ request }) => {
    const formData = await request.formData();

    const name = formData.get("name");
    const description = formData.get("description");
    const price = parseFloat(formData.get("price"));
    const stock = parseInt(formData.get("stock"), 10);
    const file = formData.get("images"); // Note: Handling file input requires FormData

    if (file) {
        const storage = getStorage();
        const storageRef = ref(storage, `products/${uuidv4()}`);
        await uploadBytes(storageRef, file);
        const imageUrl = await getDownloadURL(storageRef);

        try {
            await addDoc(collection(db, "products"), {
                name,
                description,
                price,
                imageUrl,
                stock
            });
            return redirect("/admin/view"); // Redirect after successful submission
        } catch (error) {
            console.error("Error adding product: ", error);
        }
    }
};

export default function CreateProduct() {
    return (

        <Form method="post" encType="multipart/form-data" className="bg-gray-300 p-10 rounded-lg shadow-md w-full max-w-4xl mx-auto">
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
    );
}
