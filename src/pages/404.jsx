import React from "react";
export default function NotFound() {
    return (
        <div style={{height:'100vh'}} className="flex items-center justify-center gap-5 p-5 bg-black text-white h-full">
            <h1 className="font-semibold text-xl">404</h1>
            <h1 className="text-4xl border border-white h-16"></h1>
            <h1>This page could not be found</h1>
        </div>
    );
}