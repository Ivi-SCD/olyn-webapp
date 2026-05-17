"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { ItineraryItem } from "@/lib/types";

interface ItineraryMapProps {
  items: ItineraryItem[];
}

export default function ItineraryMap({ items }: ItineraryMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const points = items.filter((item) => item.latitude && item.longitude);
    if (points.length === 0) return;

    const center: [number, number] = [points[0].latitude!, points[0].longitude!];
    const map = L.map(mapRef.current, {
      center,
      zoom: 15,
      zoomControl: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap",
    }).addTo(map);

    const latlngs: [number, number][] = [];

    points.forEach((item, i) => {
      const pos: [number, number] = [item.latitude!, item.longitude!];
      latlngs.push(pos);

      const icon = L.divIcon({
        html: `<div style="width:28px;height:28px;background:#7B3FE4;border-radius:50%;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;color:white;font-size:11px;font-weight:bold;">${i + 1}</div>`,
        className: "",
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      L.marker(pos, { icon })
        .addTo(map)
        .bindPopup(
          `<b>${i + 1}. ${item.place_name}</b><br/>${item.start_time} — ${item.end_time}${item.travel_time_minutes ? `<br/>🚶 ${item.travel_time_minutes} min até próximo` : ""}`
        );
    });

    if (latlngs.length > 1) {
      L.polyline(latlngs, {
        color: "#7B3FE4",
        weight: 3,
        opacity: 0.7,
        dashArray: "8, 8",
      }).addTo(map);
    }

    const bounds = L.latLngBounds(latlngs);
    map.fitBounds(bounds, { padding: [30, 30] });

    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, [items]);

  return <div ref={mapRef} className="w-full h-full rounded-xl" />;
}
