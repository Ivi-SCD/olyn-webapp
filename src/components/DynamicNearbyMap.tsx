"use client";

import dynamic from "next/dynamic";

const NearbyMap = dynamic(() => import("./NearbyMap"), { ssr: false });

export default NearbyMap;
