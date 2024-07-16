// PrivateRoute.jsx
import React from 'react';
import { Navigate, useLoaderData } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebaseConfig";

export function loader({ request }) {
    const pathname = new URL(request.url).pathname;
    return pathname;
}

const PrivateRoute = ({ children }) => {
    const [user, loading] = useAuthState(auth);
    const pathname = useLoaderData();

    // Handle loading state
    if (loading) {
        return <div className='text-center text-4xl font-bold m-10'>Loading...</div>;
    }

    return user ? children : <Navigate to={`/login?message=You must log in first&&redirectTo=${pathname}`} />;
};

export default PrivateRoute;
