import React from "react";
import { ImFacebook2 } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import { Form, Link, redirect, useActionData, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebaseConfig";
const provider = new GoogleAuthProvider();
const signupWithGoogle = async (navigate) => {
    try {
        await signInWithPopup(getAuth(app), provider);
        // return redirect("/login");
        navigate("/");
    }
    catch (error) {
        return {
            status: 400,
            headers: {
                "Content-Type": "application/json",
            },
            error: error.message
        };
    }
}
export async function action({ request }) {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm-password");
    if (password !== confirmPassword) {
        return {
            status: 400,
            headers: {
                "Content-Type": "application/json",
            },
            error: "Password and Confirm Password do not match"
        };
    }
    else {
        try {
            const auth = getAuth(app);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            return redirect("/login");
        }
        catch (error) {
            return {
                status: 400,
                headers: {
                    "Content-Type": "application/json",
                },
                error: error.message
            };
        }
    }
}
export default function SignUp() {
    const actionData = useActionData();
    const [error, setError] = React.useState(null);
    const navigate = useNavigate();
    async function handleSubmit() {
        try {
            await signupWithGoogle(navigate);
        }
        catch (e) {
            setError(e.error);
        }
    }
    return (
        <div className="bg-blue-200 flex justify-center items-center">
            <div className="bg-white p-5 flex flex-col justify-between items-center gap-5 w-5/12 my-24 rounded-xl">
                <h1 className="font-bold text-4xl mb-10">SignUp</h1>
                <div className="w-full">
                    <Form className="flex flex-col justify-center items-center gap-4 w-full" method="post">
                        <input className="p-3 w-full rounded-lg border border-black" type="email" name="email" placeholder="Email" />
                        <input className="p-3 w-full rounded-lg border border-black" type="password" name="password" placeholder="Password" />
                        <input className="p-3 w-full rounded-lg border border-black" type="password" name="confirm-password" placeholder="Confirm Password" />
                        {actionData && actionData.error && <div style={{ color: 'red' }}>{actionData.error}</div>}
                        {error && <div style={{ color: 'red' }}>{error}</div>}
                        <button className="p-2 w-full bg-blue-500 rounded-lg text-white">Signup</button>
                        <p>Already have an account?<Link className="text-blue-600" to={"/login"}>Login</Link></p>
                    </Form>
                </div>
                <div className="w-full flex flex-col gap-4">
                    <button onClick={handleSubmit} className="p-2 w-full bg-white-500 rounded-lg border border-black text-white flex gap-x-28 items-center pl-10"> <FcGoogle className="text-2xl" /> <p className="text-black">Signup with Google</p></button>
                    <button className="p-2 w-full bg-blue-500 rounded-lg text-white flex gap-x-28 items-center pl-10"><ImFacebook2 className="text-2xl" /> <p>Signup with Facebook</p></button>
                </div>
            </div>
        </div>
    );
}