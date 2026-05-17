"use client";

import dynamic from "next/dynamic";

const ItineraryMap = dynamic(() => import("./ItineraryMap"), { ssr: false });

export default ItineraryMap;
