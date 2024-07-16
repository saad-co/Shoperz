import React from "react";
import { ImFacebook2 } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import { Form, Link, redirect, useActionData, NavLink, useNavigate, useLoaderData } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebaseConfig";



const provider = new GoogleAuthProvider();
const signupWithGoogle = async (navigate, directTo) => {
    try {
        await signInWithPopup(getAuth(app), provider);
        if (directTo) {
            navigate(directTo, { replace: true });
        }
        else {
            navigate("/", { replace: true });
        }
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

export function loader({ request }) {
    const obj1 = new URL(request.url).searchParams.get("message");
    const obj2 = new URL(request.url).searchParams.get("redirectTo");
    return [obj1, obj2];
}

export async function action({ request }) {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    const pathname = new URL(request.url).searchParams.get("redirectTo");
    try {
        const auth = getAuth(app);
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        if (pathname) {
            return redirect(pathname);
        }
        else{
            return redirect("/");
        }
    }
    catch (e) {
        return {
            status: 400,
            headers: {
                "Content-Type": "application/json",
            },
            error: e.message
        };
    }
}


export default function Login() {
    const actionData = useActionData();
    const navigate = useNavigate();
    const message = useLoaderData();
    async function handleSubmit() {
        try {
            await signupWithGoogle(navigate, message[1]);
        }
        catch (e) {
            setError(e.error);
        }
    }
    return (
        <div className="bg-blue-200 flex justify-center items-center">
            <div className="bg-white p-5 flex flex-col justify-between items-center gap-5 w-5/12 my-24 rounded-xl">
                <h1 className="font-bold text-4xl mb-10">Login</h1>
                {message[0] && <div className="text-xl text-red-600 font-bold">{message[0]}</div>}
                <div className="w-full">
                    <Form replace className="flex flex-col justify-center items-center gap-4 w-full" method="post">
                        <input className="p-3 w-full rounded-lg border border-black" type="email" name="email" placeholder="Email" />
                        <input className="p-3 w-full rounded-lg border border-black" type="password" name="password" placeholder="Password" />
                        <NavLink className="text-blue-600" to={"/forgetpassword"}>Forgot Password?</NavLink>
                        {actionData && actionData.error && <div style={{ color: 'red' }}>{actionData.error}</div>}
                        <button type="submit" className="p-2 w-full bg-blue-500 rounded-lg text-white">Login</button>
                        <p>Don't have an account?<Link className="text-blue-600" to={"/signup"}>SignUp</Link></p>
                    </Form>
                </div>
                <div className="w-full flex flex-col gap-4">
                    <button onClick={handleSubmit} className="p-2 w-full bg-white-500 rounded-lg border border-black text-white flex gap-x-28 items-center pl-10"> <FcGoogle className="text-2xl" /> <p className="text-black">Login with Google</p></button>
                    <button className="p-2 w-full bg-blue-500 rounded-lg text-white flex gap-x-28 items-center pl-10"><ImFacebook2 className="text-2xl" /> <p>Login with Facebook</p></button>
                </div>
            </div>
        </div>
    );
}