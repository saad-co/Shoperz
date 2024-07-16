import React from "react";
import { Form, redirect, useActionData } from "react-router-dom";
import { getAuth, sendPasswordResetEmail, fetchSignInMethodsForEmail } from "firebase/auth";
import { app } from "../firebaseConfig"; // Ensure this import is correct

export async function action({ request }) {
    const formData = await request.formData();
    const email = formData.get("email");
    const auth = getAuth(app);

    if (!email) {
        return {
            status: 400,
            headers: {
                "Content-Type": "application/json",
            },
            error: "Email is required",
        };
    }

    try {
        const signInMethods = await fetchSignInMethodsForEmail(auth, email);

        await sendPasswordResetEmail(auth, email);
        return redirect("/login");
    } catch (error) {
        console.error("Error during password reset:", error);
        let errorMessage = error.message;
        if (error.code === 'auth/invalid-email') {
            errorMessage = "Invalid email format";
        } else if (error.code === 'auth/user-not-found') {
            errorMessage = "Email not registered";
        } else {
            errorMessage = "An error occurred while processing your request";
        }

        return {
            status: 400,
            headers: {
                "Content-Type": "application/json",
            },
            error: errorMessage,
        };
    }
}

export default function ResetPassword() {
    const actionData = useActionData();
    return (
        <div className="bg-blue-200 flex justify-center items-center">
            <div className="bg-white shadow-2xl p-5 flex flex-col justify-between items-center gap-5 w-5/12 my-24 rounded-xl">
                <h1 className="font-bold text-4xl mb-10">Reset Password</h1>
                <div className="w-full">
                    <Form replace className="flex flex-col justify-center items-center gap-4 w-full" method="post">
                        <input className="p-3 w-full rounded-lg border border-black" type="email" name="email" placeholder="Email" />
                        {actionData && actionData.error && <div style={{ color: 'red' }}>{actionData.error}</div>}
                        <button type="submit" className="p-2 w-full bg-blue-500 rounded-lg text-white">Send Link</button>
                    </Form>
                </div>
            </div>
        </div>
    );
}
