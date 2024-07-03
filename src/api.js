// This is the file for fetching all kinds of data from Firebase Firestore
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export async function FeauteredProducts() {
    try {
        const productCollection = collection(db, "1");
        const snapshot = await getDocs(productCollection);
        const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return products;
    } catch (error) {
        console.error("Error fetching data from Firestore:", error);
        throw new Error("Failed to fetch featured products");
    }
}

export async function GetProductById(id) {
    try {
        const productRef = doc(db, "1", id);
        const docSnapshot = await getDoc(productRef);

        if (docSnapshot.exists()) {
            // console.log("Document data:", docSnapshot.data());
            return docSnapshot.data();
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (e) {
        console.error("Error fetching product:", e);
        throw new Error("Failed to fetch product");
    }
}