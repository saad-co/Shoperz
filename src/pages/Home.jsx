import React from "react";
import { useLoaderData } from "react-router-dom";
import HomeCrousel from "../components/Crousels/HomeCrousel";
import Benefits from "../components/Benefits/Benefit";
import FeauteredProductsCrousel from "../components/Crousels/FeauteredProductsCrousel";
import BigDeals from "../components/Crousels/BigDealsCrousel";

export default function Home() {
    const products = useLoaderData();
    return (
        <div>
            <HomeCrousel />
            <Benefits />
            <FeauteredProductsCrousel data={products} />
            <BigDeals data={products} />
        </div>
    );
}